// src/pages/Register.tsx
import { FcGoogle } from "react-icons/fc";
import { Button } from "../components/atoms/Button";
import { InputField } from "../components/atoms/InputField";
import { Link } from "react-router-dom";

export const Register = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[url('src/assets/bg-register.png')] bg-cover bg-center">
            <main className="w-full max-w-76.5 lg:max-w-132.25 bg-[#181A1C]/80 rounded-lg lg:rounded-2xl p-6 lg:p-10 flex flex-col items-center">

                <img src="src/assets/logo.png" alt="Chill Logo" className="w-20 lg:w-40.75 mb-5 lg:mb-9.25" />

                <div className="text-center mb-5 lg:mb-9.25">
                    <h1 className="text-white text-lg lg:text-[32px] font-bold mb-1 lg:mb-2">Daftar</h1>
                    <p className="text-white text-[10px] lg:text-lg opacity-80">Selamat datang!</p>
                </div>

                <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                    <InputField
                        id="username"
                        label="Username"
                        type="text"
                        placeholder="Masukkan username"
                    />

                    <InputField
                        id="password"
                        label="Kata Sandi"
                        type="password"
                        placeholder="Masukkan kata sandi"
                    />
                    
                    <InputField
                        id="confirmPassword"
                        label="Konfirmasi Kata Sandi"
                        type="password"
                        placeholder="Masukkan konfirmasi kata sandi"
                        className="mb-1.5 lg:mb-3"
                    />

                    <div className="flex justify-start items-center mb-5 lg:mb-9.25 text-[10px] lg:text-base">
                        <p className="text-text-light-secondary">
                            Sudah punya akun? <Link to="/login" className="text-white font-bold hover:underline">Masuk</Link>
                        </p>
                    </div>

                    <Button variant="primary" className="w-full py-2! lg:py-3.5! rounded-2xl! lg:rounded-3xl!">
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