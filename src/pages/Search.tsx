import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { movieService } from "../services/api/movieService";
import type { Movie } from "../const/movies";
import { PageSkeleton } from "../components/templates/PageSkeleton";
import { MovieSection } from "../components/templates/MovieSection";
import { ServerError } from "./ServerError";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const query = searchParams.get("q") || "";
    const filter = searchParams.get("filter") || "";
    const sort = searchParams.get("sort") || "";

    useEffect(() => {
        const fetchSearchResults = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Gunakan mapping query params yang sesuai dengan backend
                const data = await movieService.getData({
                    search: query,
                    filter: filter,
                    sort: sort,
                });
                setMovies(data);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || "Gagal mengambil data pencarian");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchResults();
    }, [query, filter, sort]);

    const handleFilterChange = (newFilter: string) => {
        const params = new URLSearchParams(searchParams);
        if (newFilter) params.set("filter", newFilter);
        else params.delete("filter");
        setSearchParams(params);
    };

    const handleSortChange = (newSort: string) => {
        const params = new URLSearchParams(searchParams);
        if (newSort) params.set("sort", newSort);
        else params.delete("sort");
        setSearchParams(params);
    };

    if (isLoading) {
        return <PageSkeleton isGrid={true} title={`Hasil Pencarian: ${query}`} />;
    }

    const Filters = (
        <div className="flex flex-wrap gap-2 md:gap-4">
            <select
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="bg-black/50 border border-white/20 text-white text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 md:p-2.5 outline-none"
            >
                <option value="">Semua Kategori</option>
                <option value="movie">Film</option>
                <option value="series">Series</option>
            </select>

            <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-black/50 border border-white/20 text-white text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 md:p-2.5 outline-none"
            >
                <option value="">Urutkan (Default)</option>
                <option value="year:desc">Tahun Baru - Lama</option>
                <option value="year:asc">Tahun Lama - Baru</option>
                <option value="rating:desc">Rating Tertinggi</option>
                <option value="title:asc">A-Z</option>
            </select>
        </div>
    );

    if (error && movies.length === 0) {
        return (
            <ServerError
                message={error}
            />
        );
    }

    return (
        <>
            <MovieSection
                title={`Hasil Pencarian: ${query ? `"${query}"` : "Semua"}`}
                movies={movies}
                variant="portrait"
                isGrid={true}
                rightNode={Filters}
            />
        </>
    );
};

export default Search;
