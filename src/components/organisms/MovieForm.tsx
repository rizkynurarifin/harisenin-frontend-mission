import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../molecules/FormField';
import { FormLabel } from '../atoms/FormLabel';
import { genreList } from '../../const/genre';
import { FormSwitch } from '../molecules/FormSwitch';
import { Button } from '../atoms/Button';
import { FileUpload } from '../molecules/FileUpload';

// Interface untuk Episode
interface Episode {
    id: number;
    episodeNumber: number;
    title: string;
    duration: number;
}

// Interface untuk State Utama
interface MovieFormData {
    title: string;
    type: "movie" | "series";
    trailerUrl: string;
    year: number;
    rating: number;
    ageRating: string;
    casts: string[];
    creators: string[];
    genres: string[];
    description: string;
    duration?: number;
    totalEpisodes?: number;
    episodes: Episode[];
    thumbnail: string | File | null;
    thumbnailLandscape: string | File | null;
    isPremium: boolean;
    isTop10: boolean;
}

interface MovieFormProps {
    formData: MovieFormData;
    setFormData: React.Dispatch<React.SetStateAction<MovieFormData>>;
    onSubmit: (e: React.FormEvent) => void;
    isEdit?: boolean;
    handleNumberInput: (val: string, field: keyof MovieFormData) => void;
    handleArrayInput: (val: string, field: "casts" | "creators") => void;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, field: "thumbnail" | "thumbnailLandscape") => void;
    handleGenreChange: (genre: string) => void;
    addEpisode?: () => void;
    removeEpisode?: (id: number) => void;
}

export const MovieForm = ({
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
    handleNumberInput,
    handleFileUpload,
    handleGenreChange,
    addEpisode,
    removeEpisode
}: MovieFormProps) => {
    const navigate = useNavigate();

    return (
        <div className="p-4 md:p-10 lg:px-20 bg-other-page-header min-h-screen text-white font-lato">
            <div className="mb-8">
                <button
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-2 text-secondary hover:text-white transition-colors mb-4 text-sm"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Kembali ke Manajemen
                </button>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">
                    {isEdit ? 'Edit Konten' : 'Tambah Konten Baru'}
                </h1>
                <p className="text-secondary text-sm mt-1">
                    {isEdit ? 'Perbarui informasi detail konten Chill kamu.' : 'Lengkapi informasi detail konten Chill kamu.'}
                </p>
            </div>

            <form onSubmit={onSubmit} className="bg-[#222426] rounded-xl border border-white/5 shadow-2xl p-5 md:p-8 lg:p-10 space-y-8">

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
                        placeholder="Leo, Jennifer"
                        value={formData.casts.join(", ")}
                        onChange={(e) => handleArrayInput(e.target.value, "casts")}
                    />
                    <FormField
                        label="Sutradara"
                        placeholder="Leo, Jennifer"
                        value={formData.creators.join(", ")}
                        onChange={(e) => handleArrayInput(e.target.value, "creators")}
                    />
                    <FormField
                        label={formData.type === "movie" ? "Durasi (Menit)" : "Total Episode"}
                        type="number"
                        value={formData.type === "movie" ? (formData.duration || "") : (formData.totalEpisodes || "")}
                        onChange={(e) => handleNumberInput(e.target.value, formData.type === "movie" ? "duration" : "totalEpisodes")}
                    />
                </div>

                {/* Genre Selection */}
                <div className="space-y-3">
                    <FormLabel>Pilih Genre</FormLabel>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                        {genreList.map((genre) => (
                            <label key={genre} className={`flex items-center justify-center p-2 rounded-lg border transition-all cursor-pointer text-[10px] uppercase font-bold ${formData.genres.includes(genre) ? 'bg-blue-600 border-blue-500 shadow-lg' : 'bg-white/5 border-white/10 text-secondary'}`}>
                                <input type="checkbox" className="hidden" checked={formData.genres.includes(genre)} onChange={() => handleGenreChange(genre)} />
                                {genre}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Deskripsi */}
                <FormField
                    label="Sinopsis"
                    as="textarea"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                {/* Episode Section (Series Only) */}
                {formData.type === "series" && addEpisode && removeEpisode && (
                    <div className="space-y-6 p-6 rounded-xl bg-white/5 border border-blue-500/20 shadow-inner">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold uppercase text-blue-400">Daftar Episode</h3>
                            <button type="button" onClick={addEpisode} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-[10px] font-bold uppercase">Tambah Episode</button>
                        </div>
                        <div className="space-y-4 max-h-100 overflow-y-auto custom-scrollbar">
                            {formData.episodes.map((episode, index) => (
                                <div key={episode.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div className="md:col-span-1 flex items-center justify-center font-bold text-secondary">#{episode.episodeNumber}</div>
                                    <div className="md:col-span-6">
                                        <FormField label="Judul" value={episode.title} onChange={(e) => {
                                            const newEpisodes = [...formData.episodes];
                                            newEpisodes[index].title = e.target.value;
                                            setFormData({ ...formData, episodes: newEpisodes });
                                        }} />
                                    </div>
                                    <div className="md:col-span-4">
                                        <FormField label="Durasi" type="number" value={episode.duration || ""} onChange={(e) => {
                                            const newEpisodes = [...formData.episodes];
                                            newEpisodes[index].duration = Number(e.target.value);
                                            setFormData({ ...formData, episodes: newEpisodes });
                                        }} />
                                    </div>
                                    <div className="md:col-span-1 flex items-end pb-2">
                                        <button type="button" onClick={() => removeEpisode(episode.id)} className="text-red-500 disabled:text-gray-600" disabled={formData.episodes.length <= 1}>
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Thumbnail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <FileUpload label="Thumbnail Portrait" value={formData.thumbnail} onChange={(e) => handleFileUpload(e, "thumbnail")} />
                    <FileUpload label="Thumbnail Landscape" value={formData.thumbnailLandscape} onChange={(e) => handleFileUpload(e, "thumbnailLandscape")} />
                </div>

                {/* Switches */}
                <div className="flex gap-10 py-6 border-t border-white/10">
                    <FormSwitch label="Konten Premium" checked={formData.isPremium} onChange={(val) => setFormData({ ...formData, isPremium: val })} />
                    <FormSwitch label="Top 10 Hari Ini" checked={formData.isTop10} onChange={(val) => setFormData({ ...formData, isTop10: val })} />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4">
                    <Button variant="secondary" type="button" onClick={() => navigate("/admin")}>Batal</Button>
                    <Button variant="primary" type="submit">{isEdit ? 'Perbarui Konten' : 'Simpan Konten'}</Button>
                </div>
            </form>
        </div>
    );
};