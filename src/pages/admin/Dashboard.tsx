import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMovieStore } from "../../store/useMovieStore";
import { Button } from "../../components/atoms/Button";
import { genreList } from "../../const/genre";
import { ServerError } from "../ServerError";
import { IoAdd } from "react-icons/io5";
import { TableSkeleton } from "../../components/templates/TableSkeleton";

export const Dashboard = () => {
    const { movies, fetchMovies, deleteMovie, isLoading, error } = useMovieStore();

    const [filterType, setFilterType] = useState("");
    const [filterYear, setFilterYear] = useState("");
    const [filterGenre, setFilterGenre] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        if (movies.length === 0) {
            fetchMovies();
        }
    }, [fetchMovies, movies.length]);

    const filteredMovies = useMemo(() => {
        return movies
            .filter((movie) => {
                const matchesType = filterType ? movie.type === filterType : true;
                const matchesYear = filterYear ? movie.year.toString() === filterYear : true;
                const matchesGenre = filterGenre ? movie.genres?.includes(filterGenre) : true;
                return matchesType && matchesYear && matchesGenre;
            })
            .sort((a, b) => Number(a.id) - Number(b.id));
    }, [movies, filterType, filterYear, filterGenre]);

    if (isLoading && movies.length === 0) {
        return <TableSkeleton />;
    }

    if (error && movies.length === 0) {
        return <ServerError message={error} onRetry={fetchMovies} />;
    }

    // Logika Pagination
    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);
    const uniqueYears = Array.from(new Set(movies.map((m) => m.year))).sort((a, b) => b - a);


    const handleDelete = async (id: string) => {
        if (window.confirm("Apakah kamu yakin ingin menghapus konten ini?")) {
            await deleteMovie(id);
        }
    };

    return (
        <div className="p-4 md:p-10 lg:px-20 bg-other-page-header min-h-screen text-white font-lato">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">Manajemen Konten</h1>
                    <p className="text-secondary text-sm mt-1">
                        Menampilkan <span className="text-white font-bold">{paginatedMovies.length}</span> dari {filteredMovies.length} konten
                    </p>
                </div>

                <Button
                    to="/admin/create"
                    variant="primary"
                    className="w-full md:w-auto md:px-6 py-2.5 flex items-center justify-center gap-2"
                >
                    <IoAdd size={20} />
                    Tambah Film / Series
                </Button>
            </div>

            {/* Filter Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                <select
                    className="bg-[#222426] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterType}
                    onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
                >
                    <option value="">Semua Tipe</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                </select>

                <select
                    className="bg-[#222426] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterYear}
                    onChange={(e) => { setFilterYear(e.target.value); setCurrentPage(1); }}
                >
                    <option value="">Semua Tahun</option>
                    {uniqueYears.map(year => <option key={year} value={year}>{year}</option>)}
                </select>

                <select
                    className="bg-[#222426] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2 md:col-span-1"
                    value={filterGenre}
                    onChange={(e) => { setFilterGenre(e.target.value); setCurrentPage(1); }}
                >
                    <option value="">Semua Genre</option>
                    {genreList.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>

            <div className="overflow-hidden bg-[#222426] rounded-xl border border-white/5 shadow-2xl">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5 text-secondary text-xs uppercase tracking-wider">
                                <th className="p-5 font-bold w-[45%]">Konten</th>
                                <th className="p-5 font-bold text-center w-[15%]">Tipe</th>
                                <th className="p-5 font-bold text-center w-[10%]">Tahun</th>
                                <th className="p-5 font-bold text-center w-[15%]">Genre</th>
                                <th className="p-5 font-bold text-center w-[15%]">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {paginatedMovies.map((movie) => (
                                <tr key={movie.id} className="hover:bg-white/5 transition-all duration-200">
                                    <td className="p-5 flex items-center gap-4">
                                        <img src={movie.thumbnail} className="w-12 h-16 object-cover rounded-md shadow-md shrink-0" alt={movie.title} />
                                        <div className="min-w-0">
                                            <div className="font-bold text-base truncate">{movie.title}</div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-black tracking-widest ${movie.type === 'series' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                                            {movie.type}
                                        </span>
                                    </td>
                                    <td className="p-5 text-center text-sm text-secondary font-medium">{movie.year}</td>
                                    <td className="p-5">
                                        <div className="flex flex-wrap justify-center gap-1">
                                            {movie.genres?.slice(0, 2).map(genre => (
                                                <span key={genre} className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-secondary whitespace-nowrap">{genre}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-5 text-center">
                                        <div className="flex justify-center gap-3">
                                            <Link to={`/admin/edit/${movie.id}`} className="text-secondary hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path></svg>
                                            </Link>
                                            <button onClick={() => handleDelete(movie.id)} className="text-red-500/70 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-lg">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-white/5">
                    {paginatedMovies.map((movie) => (
                        <div key={movie.id} className="p-4 flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                                <img src={movie.thumbnail} className="w-16 h-24 object-cover rounded-lg shadow-lg shrink-0" alt={movie.title} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-bold text-base leading-tight">{movie.title}</h3>
                                        <span className={`shrink-0 px-2 py-0.5 rounded-full text-[9px] uppercase font-black tracking-widest ${movie.type === 'series' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                                            {movie.type}
                                        </span>
                                    </div>
                                    <div className="text-xs text-secondary mt-1">{movie.year}</div>
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {movie.genres?.map(genre => (
                                            <span key={genre} className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-secondary border border-white/5">{genre}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Link to={`/admin/edit/${movie.id}`} className="flex-1 bg-white/5 hover:bg-white/10 transition-colors py-2 rounded-lg flex justify-center items-center gap-2 text-xs font-bold border border-white/5">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path></svg>
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(movie.id)} className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors py-2 rounded-lg flex justify-center items-center gap-2 text-xs font-bold border border-red-500/20">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="p-5 border-t border-white/10 flex justify-center items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="p-2 rounded-md hover:bg-white/5 disabled:opacity-30 transition-all"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>

                        <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-50 sm:max-w-none">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`shrink-0 w-8 h-8 rounded-md text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-secondary'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="p-2 rounded-md hover:bg-white/5 disabled:opacity-30 transition-all"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;