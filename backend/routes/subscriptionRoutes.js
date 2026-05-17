const express = require('express');
const router = express.Router();
const subscriptionService = require('../services/subscriptionService');

// Endpoint untuk mengambil daftar semua plan beserta fiturnya
router.get('/', async (req, res) => {
    try {
        const plans = await subscriptionService.getAllPlans();
        res.status(200).json(plans);
    } catch (error) {
        console.error('Error in GET /plans:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

// Endpoint untuk berlangganan
router.post('/subscribe', async (req, res) => {
    try {
        const { userId, planId } = req.body;
        
        if (!userId || !planId) {
            return res.status(400).json({ message: 'User ID dan Plan ID wajib diisi.' });
        }

        const result = await subscriptionService.subscribeUser(userId, planId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in POST /plans/subscribe:', error);
        res.status(400).json({ message: error.message });
    }
});

// Endpoint untuk membuat order baru
router.post('/order', async (req, res) => {
    try {
        const { userId, planId, paymentMethod, voucherCode } = req.body;
        if (!userId || !planId || !paymentMethod) {
            return res.status(400).json({ message: 'User ID, Plan ID, dan Payment Method wajib diisi.' });
        }

        const result = await subscriptionService.createOrder(userId, planId, paymentMethod, voucherCode);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in POST /plans/order:', error);
        res.status(400).json({ message: error.message });
    }
});

// Endpoint untuk mengambil data order (di halaman payment-detail)
router.get('/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query; // Karena tidak ada token JWT, ambil dari query param / state
        if (!userId) return res.status(400).json({ message: 'User ID wajib dikirim.' });

        const order = await subscriptionService.getOrderById(id, userId);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error in GET /plans/order/:id:', error);
        res.status(404).json({ message: error.message });
    }
});

// Endpoint untuk konfirmasi bayar
router.post('/order/:id/pay', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: 'User ID wajib dikirim.' });

        const result = await subscriptionService.payOrder(id, userId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in POST /plans/order/:id/pay:', error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
