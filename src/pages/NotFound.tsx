import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="min-h-screen bg-other-page-header flex flex-col items-center justify-center text-white p-5 text-center">
            <h1 className="text-9xl font-bold text-primary-300">404</h1>
            <h2 className="text-2xl md:text-4xl font-semibold mt-4 mb-2">Halaman Tidak Ditemukan</h2>
            <p className="text-text-light-secondary mb-8 max-w-md">
                Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan ke alamat lain.
            </p>
            <Link
                to="/"
                className="bg-primary-300 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
};