import { FcGoogle } from "react-icons/fc";
import { Button } from "../components/atoms/Button";
import { InputField } from "../components/atoms/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import bgRegisterUrl from "../assets/bg-register.png";
import logoUrl from "../assets/logo.png";

export const Register = () => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const register = useAuthStore((state) => state.register);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // 1. Validasi Kosong
        if (!fullname || !username || !email || !password || !confirmPassword) {
            setError("Semua field wajib diisi");
            return;
        }

        // 2. Validasi Format Email Sederhana
        if (!email.includes("@")) {
            setError("Format email tidak valid");
            return;
        }

        // 3. Validasi Panjang Password
        if (password.length < 8) {
            setError("Kata sandi minimal 8 karakter");
            return;
        }

        // 4. Validasi Kecocokan Password
        if (password !== confirmPassword) {
            setError("Konfirmasi kata sandi tidak cocok!");
            return;
        }

        const result = await register({
            fullname,
            username,
            email,
            password,
            role: 'user',
            isPremium: false,
            myList: []
        });

        if (result.success) {
            alert("Berhasil mendaftar! Silakan masuk.");
            navigate("/login");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgRegisterUrl})` }}>
            <main className="w-full max-w-76.5 lg:max-w-132.25 bg-[#181A1C]/80 rounded-lg lg:rounded-2xl p-6 lg:p-10 flex flex-col items-center">

                <img src={logoUrl} alt="Chill Logo" className="w-20 lg:w-40.75 mb-5 lg:mb-9.25" />

                <div className="text-center mb-5 lg:mb-9.25">
                    <h1 className="text-white text-lg lg:text-[32px] font-bold mb-1 lg:mb-2">Daftar</h1>
                    <p className="text-white text-[10px] lg:text-lg opacity-80">Selamat datang!</p>
                </div>

                <form className="w-full" onSubmit={handleRegister}>
                    {error && (
                        <p className="text-red-500 text-[10px] lg:text-sm mb-4 text-center bg-red-500/10 py-2 rounded-lg border border-red-500/50">
                            {error}
                        </p>
                    )}

                    <InputField
                        id="fullname"
                        label="Nama Lengkap"
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />

                    <InputField
                        id="username"
                        label="Username"
                        type="text"
                        placeholder="Masukkan username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Masukkan email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputField
                        id="password"
                        label="Kata Sandi"
                        type="password"
                        placeholder="Masukkan kata sandi"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputField
                        id="confirmPassword"
                        label="Konfirmasi Kata Sandi"
                        type="password"
                        placeholder="Masukkan konfirmasi kata sandi"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mb-1.5 lg:mb-3"
                    />

                    <div className="flex justify-start items-center mb-5 lg:mb-9.25 text-[10px] lg:text-base">
                        <p className="text-text-light-secondary">
                            Sudah punya akun? <Link to="/login" className="text-white font-bold hover:underline">Masuk</Link>
                        </p>
                    </div>

                    <Button type="submit" variant="primary" className="w-full py-2! lg:py-3.5! rounded-2xl! lg:rounded-3xl!">
                        Daftar
                    </Button>

                    <div className="flex items-center gap-1 lg:gap-2 my-1 lg:my-2">
                        <div className="flex-1 h-px bg-[#E7E3FC] opacity-20"></div>
                        <span className="text-[#9D9EA1] text-[10px] lg:text-sm font-medium">Atau</span>
                        <div className="flex-1 h-px bg-[#E7E3FC] opacity-20"></div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-3 lg:gap-5 border border-[#E7E3FC] rounded-2xl lg:rounded-3xl py-2 lg:py-3.5 text-white text-[10px] lg:text-base font-semibold hover:bg-white/5 transition-all">
                        <FcGoogle className="w-4 h-4 lg:w-6 lg:h-6" />
                        <span>Daftar dengan Google</span>
                    </button>
                </form>
            </main>
        </div>
    );
};