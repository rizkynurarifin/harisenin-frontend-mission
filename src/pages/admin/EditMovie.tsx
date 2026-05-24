import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Button } from "../../components/atoms/Button";
import { genreList } from "../../const/genre";
import type { EpisodeDetail, Movie, MovieType, SeriesType } from "../../const/movies";
import { FormField } from "../../components/molecules/FormField";
import { FormLabel } from "../../components/atoms/FormLabel";
import { FileUpload } from "../../components/molecules/FileUpload";
import { FormSwitch } from "../../components/molecules/FormSwitch";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/redux/store";
import { fetchMovies, updateMovieAction } from "../../store/redux/movieSlice";

export const EditMovie = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { movies } = useSelector((state: RootState) => state.movieData);
    
    // Cari berdasarkan slug, atau mundur ke pencarian ID numerik jika belum ada slug
    const movieToEdit = movies.find((m) => m.slug === slug || String(m.id) === slug);
    const numericId = movieToEdit?.id;

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
            isNewEpisode: (movieToEdit as SeriesType).isNewEpisode || false,
            isPremium: movieToEdit.isPremium || false,
            isTop10: movieToEdit.isTop10 || false,
        };

        if (movieToEdit.type === "movie") {
            const m = movieToEdit as MovieType;
            return {
                ...base,
                duration: m.duration,
                totalEpisodes: 0,
                episodes: [] as EpisodeDetail[]
            };
        } else {
            const s = movieToEdit as SeriesType;
            return {
                ...base,
                totalEpisodes: s.totalEpisodes,
                duration: 0,
                episodes: s.episodes || []
            };
        }
    });

    useEffect(() => {
        if (movies.length === 0) {
            dispatch(fetchMovies());
        }
    }, [dispatch, movies.length]);

    const addEpisode = () => {
        setFormData(prev => {
            if (!prev) return null;

            const newEpisodeNumber = prev.episodes.length + 1;
            const newEpisode: EpisodeDetail = {
                id: Date.now(),
                episodeNumber: newEpisodeNumber,
                title: `Episode ${newEpisodeNumber}`,
                duration: 0,
                description: "",
                thumbnail: "",
                progress: 0,
            };

            return {
                ...prev,
                episodes: [...prev.episodes, newEpisode]
            };
        });
    };

    const removeEpisode = (id: number) => {
        setFormData(prev => {
            if (!prev || prev.episodes.length <= 1) return prev;

            const filtered = prev.episodes.filter(ep => ep.id !== id);
            const reIndexed = filtered.map((ep, idx) => ({
                ...ep,
                episodeNumber: idx + 1
            }));

            return {
                ...prev,
                episodes: reIndexed
            };
        });
    };

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

    // handleArrayInput dihapus karena casts dan creators disimpan sebagai string di state

    const handleNumberInput = (value: string, field: string) => {
        const numValue = value === "" ? 0 : parseFloat(value);
        setFormData((prev) => prev ? { ...prev, [field]: numValue } : null);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "thumbnail" | "thumbnailLandscape") => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const { movieService } = await import("../../services/api/movieService");
                const url = await movieService.uploadFile(file);
                setFormData(prev => {
                    if (!prev) return null;
                    return { ...prev, [field]: url };
                });
            } catch (error) {
                console.error("Upload error", error);
                alert("Gagal mengupload gambar");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const baseData = {
            title: formData.title,
            slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
            year: formData.year,
            thumbnail: formData.thumbnail,
            thumbnailLandscape: formData.thumbnailLandscape,
            rating: formData.rating,
            ageRating: formData.ageRating,
            genres: formData.genres,
            casts: formData.casts.split(",").map((item) => item.trim()).filter(c => c !== ""),
            creators: formData.creators.split(",").map((item) => item.trim()).filter(c => c !== ""),
            description: formData.description,
            trailerUrl: formData.trailerUrl,
            isNewEpisode: formData.isNewEpisode,
            isPremium: formData.isPremium,
            isTop10: formData.isTop10,
            progress: movieToEdit.progress || 0,
        };

        let payload: Movie;

        if (formData.type === "movie") {
            payload = {
                ...baseData,
                id: numericId || 0,
                type: "movie",
                duration: formData.duration,
            } as unknown as Movie;
        } else {
            const optimizedEpisodes = formData.episodes.map((ep, index) => {
                const sequence = (index + 1).toString().padStart(2, '0');
                return {
                    ...ep,
                    id: Number(`${Date.now().toString().slice(-4)}${sequence}`),
                    title: ep.title || `Episode ${index + 1}`,
                    thumbnail: ep.thumbnail || "",
                    description: ep.description || "",
                };
            });

            payload = {
                ...baseData,
                id: numericId || 0,
                type: "series",
                totalEpisodes: formData.totalEpisodes,
                episodes: optimizedEpisodes,
                lastWatchedEpisodeId: (movieToEdit as SeriesType).lastWatchedEpisodeId || optimizedEpisodes[0]?.id || 1,
            } as unknown as Movie;
        }

        try {
            await dispatch(updateMovieAction({ id: String(numericId), data: payload })).unwrap();
            alert("Konten Berhasil Diperbarui!");
            navigate("/admin");
        } catch (error) {
            console.error("Gagal update:", error);
            alert("Terjadi kesalahan saat memperbarui konten.");
        }
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
                    <FormField
                        label="Judul Konten"
                        placeholder="Contoh: All of Us Are Dead"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />

                    <FormField
                        label="Tipe Konten"
                        as="select"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as "movie" | "series" })}
                    >
                        <option value="movie" className="bg-zinc-900 text-white">Movie</option>
                        <option value="series" className="bg-zinc-900 text-white">Series</option>
                    </FormField>
                </div>

                {/* Trailer & Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <FormField
                        label="Trailer URL"
                        value={formData.trailerUrl}
                        onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
                    />

                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                        <FormField
                            label="Tahun"
                            type="number"
                            value={formData.year}
                            onChange={(e) => handleNumberInput(e.target.value, "year")}
                        />
                        <FormField
                            label="Rating"
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={formData.rating || ""}
                            onChange={(e) => handleNumberInput(e.target.value, "rating")}
                        />
                        <FormField
                            label="Usia"
                            as="select"
                            value={formData.ageRating}
                            onChange={(e) => setFormData({ ...formData, ageRating: e.target.value })}
                        >
                            <option value="SU" className="bg-zinc-900 text-white">SU</option>
                            <option value="13+" className="bg-zinc-900 text-white">13+</option>
                            <option value="18+" className="bg-zinc-900 text-white">18+</option>
                        </FormField>
                    </div>
                </div>

                {/* Casts, Creators & Duration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    <FormField
                        label="Pemeran"
                        placeholder="Pisahkan dengan koma (Contoh: Leo, Jennifer)"
                        value={formData.casts}
                        onChange={(e) => setFormData({ ...formData, casts: e.target.value })}
                    />

                    <FormField
                        label="Sutradara"
                        placeholder="Pisahkan dengan koma (Contoh: Leo, Jennifer)"
                        value={formData.creators}
                        onChange={(e) => setFormData({ ...formData, creators: e.target.value })}
                    />

                    <FormField
                        label={formData.type === "movie" ? "Durasi (Menit)" : "Total Episode"}
                        type="number"
                        placeholder="Contoh: 120"
                        value={
                            formData.type === "movie"
                                ? (formData.duration || "")
                                : (formData.totalEpisodes || "")
                        }
                        onChange={(e) =>
                            handleNumberInput(
                                e.target.value,
                                formData.type === "movie" ? "duration" : "totalEpisodes"
                            )
                        }
                    />
                </div>

                {/* Genre Selection */}
                <div className="space-y-3">
                    <FormLabel>Pilih Genre</FormLabel>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
                        {genreList.map((genre) => (
                            <label
                                key={genre}
                                className={`flex items-center justify-center text-center p-2 rounded-lg border transition-all cursor-pointer text-[9px] md:text-[10px] uppercase font-bold tracking-wider ${formData.genres.includes(genre)
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                                    : 'bg-white/5 border-white/10 text-secondary'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={formData.genres.includes(genre)}
                                    onChange={() => handleGenreChange(genre)}
                                />
                                {genre}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Deskripsi */}
                <FormField
                    label="Sinopsis / Deskripsi"
                    as="textarea"
                    rows={4}
                    placeholder="Tulis deskripsi singkat..."
                    className="resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                {/* Episode Detail (Hanya muncul jika tipe Series) */}
                {formData.type === "series" && (
                    <div className="space-y-6 p-6 rounded-xl bg-white/5 border border-blue-500/20 shadow-inner">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400">Daftar Episode</h3>
                            </div>
                            <button
                                type="button"
                                onClick={addEpisode}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-bold uppercase transition-all"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                Tambah Episode
                            </button>
                        </div>

                        <div className="space-y-4 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
                            {formData.episodes.map((episode, index) => (
                                <div key={episode.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-white/5 rounded-lg border border-white/10 relative group mb-4">
                                    <div className="md:col-span-1 flex flex-col items-center justify-start pt-4 font-bold text-secondary">
                                        <span className="text-lg">#{index + 1}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeEpisode(episode.id)}
                                            className={`mt-4 p-2 rounded-lg transition-colors ${formData.episodes.length > 1 ? 'text-red-500 hover:bg-red-500/10' : 'text-gray-600 cursor-not-allowed'}`}
                                            disabled={formData.episodes.length <= 1}
                                            title="Hapus Episode"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        </button>
                                    </div>

                                    <div className="md:col-span-11 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="lg:col-span-2">
                                                <FormField
                                                    label="Judul Episode"
                                                    placeholder="Contoh: Awal Mula"
                                                    value={episode.title}
                                                    onChange={(e) => {
                                                        setFormData(prev => {
                                                            if (!prev) return prev;
                                                            const newEpisodes = [...prev.episodes];
                                                            newEpisodes[index] = { ...newEpisodes[index], title: e.target.value };
                                                            return { ...prev, episodes: newEpisodes };
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <FormField
                                                label="Durasi (Menit)"
                                                type="number"
                                                value={episode.duration || ""}
                                                onChange={(e) => {
                                                    setFormData(prev => {
                                                        if (!prev) return prev;
                                                        const newEpisodes = [...prev.episodes];
                                                        newEpisodes[index] = { ...newEpisodes[index], duration: Number(e.target.value) };
                                                        return { ...prev, episodes: newEpisodes };
                                                    });
                                                }}
                                            />
                                            <FormField
                                                label="Progress (%)"
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={episode.progress || ""}
                                                onChange={(e) => {
                                                    setFormData(prev => {
                                                        if (!prev) return prev;
                                                        const newEpisodes = [...prev.episodes];
                                                        newEpisodes[index] = { ...newEpisodes[index], progress: Number(e.target.value) };
                                                        return { ...prev, episodes: newEpisodes };
                                                    });
                                                }}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                label="Sinopsis Episode"
                                                as="textarea"
                                                rows={3}
                                                placeholder="Deskripsi singkat episode..."
                                                className="resize-none"
                                                value={episode.description}
                                                onChange={(e) => {
                                                    setFormData(prev => {
                                                        if (!prev) return prev;
                                                        const newEpisodes = [...prev.episodes];
                                                        newEpisodes[index] = { ...newEpisodes[index], description: e.target.value };
                                                        return { ...prev, episodes: newEpisodes };
                                                    });
                                                }}
                                            />
                                            <div className="space-y-4">
                                                <FormField
                                                    label="Video URL"
                                                    placeholder="Contoh: /assets/video/ep1.mp4"
                                                    value={episode.videoUrl || ""}
                                                    onChange={(e) => {
                                                        setFormData(prev => {
                                                            if (!prev) return prev;
                                                            const newEpisodes = [...prev.episodes];
                                                            newEpisodes[index] = { ...newEpisodes[index], videoUrl: e.target.value };
                                                            return { ...prev, episodes: newEpisodes };
                                                        });
                                                    }}
                                                />
                                                <FileUpload
                                                    label="Thumbnail Episode"
                                                    value={episode.thumbnail || ""}
                                                    aspectRatio="aspect-video"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            try {
                                                                const { movieService } = await import("../../services/api/movieService");
                                                                const url = await movieService.uploadFile(file);
                                                                setFormData(prev => {
                                                                    if (!prev) return prev;
                                                                    const newEpisodes = [...prev.episodes];
                                                                    newEpisodes[index].thumbnail = url;
                                                                    return { ...prev, episodes: newEpisodes };
                                                                });
                                                            } catch (error) {
                                                                console.error("Upload error", error);
                                                                alert("Gagal mengupload thumbnail episode");
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Thumbnail Uploads */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <FileUpload
                        label="Thumbnail Portrait"
                        value={formData.thumbnail}
                        aspectRatio="aspect-2/3"
                        onChange={(e) => handleFileUpload(e, "thumbnail")}
                    />
                    <FileUpload
                        label="Thumbnail Landscape"
                        value={formData.thumbnailLandscape}
                        aspectRatio="aspect-video"
                        onChange={(e) => handleFileUpload(e, "thumbnailLandscape")}
                    />
                </div>

                {/* Switch Options */}
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 py-6 border-t border-white/10">
                    <FormSwitch
                        label="Konten Premium"
                        checked={formData.isPremium}
                        activeColor="bg-blue-600"
                        onChange={(val) => setFormData({ ...formData, isPremium: val })}
                    />

                    <FormSwitch
                        label="Top 10 Hari Ini"
                        checked={formData.isTop10}
                        activeColor="bg-red-600"
                        onChange={(val) => setFormData({ ...formData, isTop10: val })}
                    />
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
                        className="w-full sm:w-auto px-10 py-3.5 md:py-3 uppercase tracking-widest text-[10px] font-bold"
                    >
                        Update Konten
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditMovie;