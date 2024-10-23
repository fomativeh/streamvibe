import axios from "axios"
import { Dispatch, SetStateAction } from "react";
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || ''; // Ensure API key is available

interface Movie {
    poster_path: string | null;
    title: string;
    release_date: string;
    id: number;
    overview: string;
}

// Function to fetch random movie images from TMDB API
export const fetchMovieImages = async (count: number, setMovieImages: Dispatch<SetStateAction<string[]>>): Promise<void> => {
    const imagesPerPage = 20; // TMDB returns a max of 20 movies per page
    const totalPages = Math.ceil(count / imagesPerPage); // Calculate how many pages to fetch

    try {
        let allImages: string[] = [];

        // Fetch multiple pages in a loop
        for (let page = 1; page <= totalPages; page++) {
            const response = await axios.get<{ results: Movie[] }>(
                `https://api.themoviedb.org/3/movie/popular`,
                {
                    params: {
                        api_key: TMDB_API_KEY,
                        language: 'en-US',
                        page: Math.floor(Math.random() * 500) + 1, // Random page number for randomness
                    },
                }
            );

            const newImages = response.data.results
                .map((movie: Movie) =>
                    movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
                )
                .filter((image): image is string => image !== null); // Filter out nulls and ensure `image` is string

            allImages = [...allImages, ...newImages];

            // If we already fetched enough images, stop fetching
            if (allImages.length >= count) {
                break;
            }
        }

        setMovieImages((prevImages) => [...prevImages, ...allImages.slice(0, count)]);
    } catch (error) {
        console.error('Error fetching movie images:', error);
    }
};