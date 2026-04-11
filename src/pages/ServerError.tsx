interface ServerErrorProps {
    message?: string;
    onRetry?: () => void;
}

export const ServerError = ({ message, onRetry }: ServerErrorProps) => {
    return (
        <div className="min-h-screen bg-other-page-header flex flex-col items-center justify-center text-white p-5 text-center">
            <h1 className="text-9xl font-bold text-red-500">500</h1>
            <h2 className="text-2xl md:text-4xl font-semibold mt-4 mb-2">Terjadi Kesalahan</h2>
            <p className="text-text-light-secondary mb-8 max-w-md">
                {message || "Maaf, terjadi masalah saat mengambil data dari server."}
            </p>
            {onRetry ? (
                <button
                    onClick={onRetry}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-all"
                >
                    Coba Lagi
                </button>
            ) : (
                <button
                    onClick={() => (window.location.href = "/")}
                    className="bg-primary-300 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all"
                >
                    Kembali ke Beranda
                </button>
            )}
        </div>
    );
};