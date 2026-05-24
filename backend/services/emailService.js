const nodemailer = require('nodemailer');

let transporter;

async function initTransporter() {
    try {
        // Generate test SMTP service account from ethereal.email
        let testAccount = await nodemailer.createTestAccount();

        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
        console.log("Ethereal Email Transporter initialized. Ready to send emails.");
    } catch (err) {
        console.error("Gagal menginisialisasi Ethereal:", err);
    }
}

// Inisialisasi awal (non-blocking)
initTransporter();

const sendVerificationEmail = async (toEmail, token) => {
    if (!transporter) {
        await initTransporter();
    }
    
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Harisenin Movie App 🎬" <no-reply@harisenin.com>',
        to: toEmail,
        subject: "Verifikasi Akun Email Anda",
        text: `Halo, terima kasih telah mendaftar!\n\nKlik link berikut untuk verifikasi email Anda: http://localhost:5000/auth/verify-email?token=${token}\n\nAbaikan email ini jika Anda tidak merasa mendaftar.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h2 style="color: #2b6cb0;">Verifikasi Akun Anda</h2>
                <p>Halo,</p>
                <p>Terima kasih telah bergabung dengan Harisenin Movie App! Untuk melengkapi proses registrasi, mohon verifikasi alamat email Anda dengan menekan tombol di bawah ini:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="http://localhost:5000/auth/verify-email?token=${token}" style="background-color: #2b6cb0; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verifikasi Email Sekarang</a>
                </div>
                <p style="font-size: 12px; color: #718096;">Jika tombol tidak berfungsi, salin dan tempel URL berikut di browser Anda:<br>
                <a href="http://localhost:5000/auth/verify-email?token=${token}">http://localhost:5000/auth/verify-email?token=${token}</a></p>
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 30px;">
                <p style="font-size: 12px; color: #a0aec0;">Abaikan email ini jika Anda tidak melakukan registrasi.</p>
            </div>
        `,
    });

    console.log("-----------------------------------------");
    console.log("Pesan email berhasil dikirim: %s", info.messageId);
    console.log("INFO: Untuk melihat email (Ethereal inbox), buka URL di bawah ini:");
    console.log("👉 URL Preview Email: %s", nodemailer.getTestMessageUrl(info));
    console.log("-----------------------------------------");
    
    return info;
};

module.exports = {
    sendVerificationEmail
};
