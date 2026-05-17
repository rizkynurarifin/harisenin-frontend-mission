const db = require('../db');

const getAllPlans = async () => {
    // Ambil semua plans
    const [plans] = await db.query('SELECT * FROM plans');
    
    // Ambil semua relasi plan_features
    const [features] = await db.query(`
        SELECT pf.plan_id, f.name 
        FROM plan_features pf 
        JOIN features f ON pf.feature_id = f.id
    `);

    // Gabungkan fitur ke dalam setiap paket
    const plansWithFeatures = plans.map(plan => {
        const planFeatures = features
            .filter(f => f.plan_id === plan.id)
            .map(f => f.name);
            
        return {
            id: plan.id,
            title: plan.name,
            rawPrice: Number(plan.price),
            price: `Rp${Number(plan.price).toLocaleString('id-ID')}/bulan`,
            accounts: plan.account_count > 1 ? `${plan.id === 3 ? '5-7' : plan.account_count} Akun` : '1 Akun',
            features: planFeatures
        };
    });

    return plansWithFeatures;
};

const subscribeUser = async (userId, planId) => {
    // Pastikan user ada
    const [users] = await db.query('SELECT id FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
        throw new Error('User tidak ditemukan');
    }

    // Pastikan plan ada
    const [plans] = await db.query('SELECT id FROM plans WHERE id = ?', [planId]);
    if (plans.length === 0) {
        throw new Error('Paket tidak ditemukan');
    }

    // Ubah status is_premium menjadi TRUE (1)
    await db.query('UPDATE users SET is_premium = ? WHERE id = ?', [true, userId]);

    return { success: true, message: 'Berlangganan berhasil! Akun Anda sekarang Premium.' };
};

const createOrder = async (userId, planId, paymentMethod, voucherCode) => {
    // Ambil harga dari tabel plans
    const [plans] = await db.query('SELECT price FROM plans WHERE id = ?', [planId]);
    if (plans.length === 0) throw new Error('Paket tidak ditemukan');
    
    const subtotal = Number(plans[0].price);
    const adminFee = 3000;
    const totalAmount = subtotal + adminFee;

    // Create Order
    const [orderResult] = await db.query(
        `INSERT INTO orders (user_id, plan_id, voucher_code, subtotal, admin_fee, total_amount, status) 
         VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
        [userId, planId, voucherCode || null, subtotal, adminFee, totalAmount]
    );
    const orderId = orderResult.insertId;

    // Generate Payment Code (e.g. random alphanumeric)
    const paymentCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Create Payment
    await db.query(
        `INSERT INTO payments (order_id, payment_method, payment_code) 
         VALUES (?, ?, ?)`,
        [orderId, paymentMethod, paymentCode]
    );

    return { orderId, paymentCode, totalAmount };
};

const getOrderById = async (orderId, userId) => {
    const [orders] = await db.query(`
        SELECT o.id, o.plan_id, o.status, o.total_amount, o.created_at, p.payment_method, p.payment_code, pl.name as plan_name, pl.price, pl.account_count 
        FROM orders o 
        JOIN payments p ON o.id = p.order_id 
        JOIN plans pl ON o.plan_id = pl.id 
        WHERE o.id = ? AND o.user_id = ?
    `, [orderId, userId]);

    if (orders.length === 0) throw new Error('Order tidak ditemukan');
    
    const order = orders[0];

    // Fetch features untuk plan tersebut
    const [features] = await db.query(`
        SELECT f.name 
        FROM plan_features pf 
        JOIN features f ON pf.feature_id = f.id
        WHERE pf.plan_id = ?
    `, [order.plan_id]);

    order.plan_features = features.map(f => f.name);
    return order;
};

const payOrder = async (orderId, userId) => {
    const [orders] = await db.query('SELECT plan_id, status FROM orders WHERE id = ? AND user_id = ?', [orderId, userId]);
    if (orders.length === 0) throw new Error('Order tidak ditemukan');
    if (orders[0].status === 'success') throw new Error('Order sudah dibayar');

    const planId = orders[0].plan_id;

    // Update orders & payments
    await db.query(`UPDATE orders SET status = 'success' WHERE id = ?`, [orderId]);
    await db.query(`UPDATE payments SET paid_at = NOW() WHERE order_id = ?`, [orderId]);

    // Update user is_premium (re-use subscribeUser function)
    return await subscribeUser(userId, planId);
};

module.exports = {
    getAllPlans,
    subscribeUser,
    createOrder,
    getOrderById,
    payOrder
};
