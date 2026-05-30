const nodemailer = require('nodemailer');

let transporter;

function initTransporter() {
    try {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        console.log("Gmail SMTP Transporter initialized.");
    } catch (err) {
        console.error("Gagal menginisialisasi SMTP Gmail:", err);
    }
}

// Inisialisasi awal
initTransporter();

const sendVerificationEmail = async (toEmail, token) => {
    if (!transporter) {
        initTransporter();
    }
    
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const verifyLink = `${baseUrl}/auth/verify-email?token=${token}`;

    try {
        let info = await transporter.sendMail({
            from: '"Harisenin Movie App 🎬" <no-reply@harisenin.com>',
            to: toEmail,
            subject: "Verifikasi Akun Email Anda",
            text: `Halo, terima kasih telah mendaftar!\n\nKlik link berikut untuk verifikasi email Anda: ${verifyLink}\n\nAbaikan email ini jika Anda tidak merasa mendaftar.`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #e50914;">Verifikasi Akun Anda</h2>
                    <p>Halo,</p>
                    <p>Terima kasih telah bergabung dengan Chillix (Harisenin Movie App)! Untuk melengkapi proses registrasi, mohon verifikasi alamat email Anda dengan menekan tombol di bawah ini:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verifyLink}" style="background-color: #e50914; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verifikasi Email Sekarang</a>
                    </div>
                    <p style="font-size: 12px; color: #718096;">Jika tombol tidak berfungsi, salin dan tempel URL berikut di browser Anda:<br>
                    <a href="${verifyLink}">${verifyLink}</a></p>
                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 30px;">
                    <p style="font-size: 12px; color: #a0aec0;">Abaikan email ini jika Anda tidak melakukan registrasi.</p>
                </div>
            `,
        });

        console.log("-----------------------------------------");
        console.log("Pesan email berhasil dikirim: %s", info.messageId);
        console.log("-----------------------------------------");
        
        return info;
    } catch (error) {
        console.error("Gagal mengirim email verifikasi:", error);
        throw error;
    }
};

module.exports = {
    sendVerificationEmail
};
