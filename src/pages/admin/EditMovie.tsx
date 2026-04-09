import React, { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useMovieStore } from "../../store/useMovieStore";
import { Button } from "../../components/atoms/Button";
import { genreList } from "../../const/genre";
import type { Movie, MovieType, SeriesType } from "../../const/movies";

export const EditMovie = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const movies = useMovieStore((state) => state.movies);
    const updateMovie = useMovieStore((state) => state.updateMovie);

    const movieToEdit = movies.find((m) => m.id === Number(id));

    const [formData, setFormData] = useState(() => {
        if (!movieToEdit) return null;

        const base = {
            title: movieToEdit.title,
            type: movieToEdit.type,
            year: movieToEdit.year,
            thumbnail: movieToEdit.thumbnail,
            thumbnailLandscape: movieToEdit.thumbnailLandscape,
            rating: movieToEdit.rating,
            ageRating: movieToEdit.ageRating,
            genres: movieToEdit.genres || [],
            casts: movieToEdit.casts?.join(", ") || "",
            creators: movieToEdit.creators?.join(", ") || "",
            description: movieToEdit.description || "",
            trailerUrl: movieToEdit.trailerUrl || "",
            isPremium: movieToEdit.isPremium || false,
            isTop10: movieToEdit.isTop10 || false,
        };

        if (movieToEdit.type === "movie") {
            const m = movieToEdit as MovieType;
            return { ...base, duration: m.duration, totalEpisodes: 0 };
        } else {
            const s = movieToEdit as SeriesType;
            return { ...base, totalEpisodes: s.totalEpisodes, duration: "" };
        }
    });

    if (!movieToEdit || !formData) {
        return <Navigate to="/admin" replace />;
    }

    const handleGenreChange = (genre: string) => {
        setFormData(prev => {
            if (!prev) return null;
            const currentGenres = prev.genres.includes(genre)
                ? prev.genres.filter(g => g !== genre)
                : [...prev.genres, genre];
            return { ...prev, genres: currentGenres };
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "thumbnail" | "thumbnailLandscape") => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => prev ? { ...prev, [field]: reader.result as string } : null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const commonData = {
            id: Number(id),
            title: formData.title,
            year: formData.year,
            thumbnail: formData.thumbnail,
            thumbnailLandscape: formData.thumbnailLandscape,
            rating: formData.rating,
            ageRating: formData.ageRating,
            genres: formData.genres,
            casts: formData.casts.split(",").map(c => c.trim()).filter(c => c !== ""),
            creators: formData.creators.split(",").map(c => c.trim()).filter(c => c !== ""),
            description: formData.description,
            trailerUrl: formData.trailerUrl,
            isPremium: formData.isPremium,
            isTop10: formData.isTop10,
        };

        let updatedMovie: Movie;
        if (formData.type === "movie") {
            updatedMovie = {
                ...commonData,
                type: "movie",
                duration: formData.duration
            } as MovieType;
        } else {
            updatedMovie = {
                ...commonData,
                type: "series",
                totalEpisodes: formData.totalEpisodes,
                episodes: (movieToEdit as SeriesType).episodes || []
            } as SeriesType;
        }

        updateMovie(updatedMovie);
        alert("Konten berhasil diperbarui!");
        navigate("/admin");
    };

    return (
        <div className="p-4 md:p-10 lg:px-20 bg-other-page-header min-h-screen text-white font-lato">
            <div className="mb-8">
                <button
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-2 text-secondary hover:text-white transition-colors mb-4 text-sm"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Kembali ke Manajemen
                </button>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">Edit Konten</h1>
                <p className="text-secondary text-sm mt-1">Perbarui informasi detail konten Chill kamu.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#222426] rounded-xl border border-white/5 shadow-2xl p-5 md:p-8 lg:p-10 space-y-8">

                {/* Judul & Tipe */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-2">
                        <label className="text-xs md:text-sm font-bold text-secondary uppercase tracking-wider">Judul Konten</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                            placeholder="Contoh: All of Us Are Dead"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs md:text-sm font-bold text-secondary uppercase tracking-wider">Tipe Konten</label>
                        <select
                            className="w-full bg-[#2d2f31] border border-white/10 rounded-lg p-3 outline-none cursor-pointer text-sm"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as "movie" | "series" })}
                        >
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                        </select>
                    </div>
                </div>

                {/* Trailer & Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-2">
                        <label className="text-xs md:text-sm font-bold text-secondary uppercase tracking-wider">Trailer URL (YouTube)</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="https://youtube.com/watch?v=..."
                            value={formData.trailerUrl}
                            onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] md:text-xs font-bold text-secondary uppercase tracking-wider">Tahun</label>
                            <input
                                type="number"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none text-sm"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] md:text-xs font-bold text-secondary uppercase tracking-wider">Rating</label>
                            <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none text-sm"
                                placeholder="4.5"
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] md:text-xs font-bold text-secondary uppercase tracking-wider">Usia</label>
                            <select
                                className="w-full bg-[#2d2f31] border border-white/10 rounded-lg p-3 outline-none cursor-pointer text-sm"
                                value={formData.ageRating}
                                onChange={(e) => setFormData({ ...formData, ageRating: e.target.value })}
                            >
                                <option value="SU">SU</option>
                                <option value="13+">13+</option>
                                <option value="18+">18+</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Casts, Creators & Duration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    <div className="space-y-2">
                        <label className="text-xs md:text-sm font-bold text-secondary uppercase tracking-wider">
                            Pemeran
                        </label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Pisahkan dengan koma..."
                            value={formData.casts}
                            onChange={(e) => setFormData({ ...formData, casts: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs md:text-sm font-bold text-secondary uppercase tracking-wider">
                            Sutradara
                        </label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Pisahkan dengan koma..."
                            value={formData.creators}
                            onChange={(e) => setFormData({ ...formData, creators: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs md:text-sm font-bold text-secondary uppercase tracking-wider">
                            {formData.type === "movie" ? "Durasi Film" : "Total Episode"}
                        </label>
                        <input
                            type={formData.type === "movie" ? "text" : "number"}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder={formData.type === "movie" ? "1j 30m" : "12"}
                            value={formData.type === "movie" ? formData.duration : formData.totalEpisodes}
                            onChange={(e) => setFormData({
                                ...formData,
                                [formData.type === "movie" ? "duration" : "totalEpisodes"]: e.target.value
                            })}
                        />
                    </div>
                </div>

                {/* Genre Selection */}
                <div className="space-y-3">
                    <label className="text-xs md:text-sm font-bold text-secondary uppercase tracking-wider">Pilih Genre</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
                        {genreList.map((genre) => (
                            <label key={genre} className={`flex items-center justify-center text-center p-2 rounded-lg border transition-all cursor-pointer text-[9px] md:text-[10px] uppercase font-bold tracking-wider ${formData.genres.includes(genre) ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 border-white/10 text-secondary'}`}>
                                <input type="checkbox" className="hidden" checked={formData.genres.includes(genre)} onChange={() => handleGenreChange(genre)} />
                                {genre}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Deskripsi */}
                <div className="space-y-2">
                    <label className="text-xs md:text-sm font-bold text-secondary uppercase tracking-wider">Sinopsis / Deskripsi</label>
                    <textarea
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none resize-none text-sm"
                        placeholder="Tulis deskripsi singkat..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                {/* Thumbnail Uploads */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-3">
                        <label className="text-xs md:text-sm font-bold text-secondary uppercase tracking-wider">Thumbnail Portrait (2:3)</label>
                        <div className="relative group aspect-2/3 sm:h-64 w-full bg-white/5 border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-blue-500 transition-all">
                            {formData.thumbnail ? (
                                <img src={formData.thumbnail} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                                <div className="text-center p-4">
                                    <svg className="mx-auto h-8 w-8 text-secondary/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                    <span className="text-[9px] text-secondary uppercase font-black">Upload Portrait</span>
                                </div>
                            )}
                            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, "thumbnail")} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs md:text-sm font-bold text-secondary uppercase tracking-wider">Thumbnail Landscape (16:9)</label>
                        <div className="relative group aspect-video sm:h-64 w-full bg-white/5 border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-blue-500 transition-all">
                            {formData.thumbnailLandscape ? (
                                <img src={formData.thumbnailLandscape} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                                <div className="text-center p-4">
                                    <svg className="mx-auto h-8 w-8 text-secondary/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    <span className="text-[9px] text-secondary uppercase font-black">Upload Landscape</span>
                                </div>
                            )}
                            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, "thumbnailLandscape")} />
                        </div>
                    </div>
                </div>

                {/* Switch Options */}
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 py-6 border-t border-white/10">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input type="checkbox" className="sr-only" checked={formData.isPremium} onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })} />
                            <div className={`w-10 h-5 rounded-full transition-colors ${formData.isPremium ? 'bg-blue-600' : 'bg-white/10'}`}></div>
                            <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${formData.isPremium ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                        <span className="text-xs font-bold text-secondary uppercase tracking-widest">Konten Premium</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input type="checkbox" className="sr-only" checked={formData.isTop10} onChange={(e) => setFormData({ ...formData, isTop10: e.target.checked })} />
                            <div className={`w-10 h-5 rounded-full transition-colors ${formData.isTop10 ? 'bg-red-600' : 'bg-white/10'}`}></div>
                            <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${formData.isTop10 ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                        <span className="text-xs font-bold text-secondary uppercase tracking-widest">Top 10 Hari Ini</span>
                    </label>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 md:gap-4 pt-4">
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => navigate("/admin")}
                        className="w-full sm:w-auto px-10 py-3.5 md:py-3 uppercase tracking-widest text-[10px] font-bold"
                    >
                        Batal
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-full sm:w-auto px-10 py-3.5 md:py-3 uppercase tracking-widest text-[10px] font-bold shadow-lg shadow-blue-600/20"
                    >
                        Update Konten
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditMovie;