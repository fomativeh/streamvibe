import axios from "axios";
import { Dispatch, SetStateAction } from "react";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';

// Define the genre IDs you want to filter out.
// Adjust these based on TMDB documentation for genre IDs.
const EXCLUDED_GENRE_IDS = [10749, 27, 28]; // Example IDs (Romance, Horror, Action). Adjust accordingly.

interface Movie {
  poster_path: string | null;
  title: string;
  release_date: string;
  id: number;
  overview: string;
  genre_ids: number[]; // Include genre_ids in the Movie interface
}

// Fetch random movie images from TMDB API
export const fetchMovieImages = async (
  count: number,
  setImages: (images: string[]) => void
): Promise<void> => {
  const imagesPerPage = 20;
  const totalImagesNeeded = count;
  let allImages: string[] = [];
  
  try {
    // Keep fetching until we have the required number of images
    let currentPage = 1;

    while (allImages.length < totalImagesNeeded) {
      const response = await axios.get<{ results: Movie[] }>(
        `https://api.themoviedb.org/3/movie/popular`,
        {
          params: {
            api_key: TMDB_API_KEY,
            language: "en-US",
            page: currentPage,
          },
        }
      );

      const newImages = response.data.results
        .filter((movie: Movie) => 
          !movie.genre_ids.some(genreId => EXCLUDED_GENRE_IDS.includes(genreId)) // Exclude unwanted genres
        )
        .map((movie: Movie) =>
          movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
        )
        .filter((image): image is string => image !== null);

      // Add the new images to the collection
      allImages = [...allImages, ...newImages];

      // If we have collected enough images, break the loop
      if (allImages.length >= totalImagesNeeded) break;

      // Increment the page number to fetch the next set of movies
      currentPage++;

      // Check if we've reached a reasonable page limit to avoid endless loops
      if (currentPage > 500) break; // TMDB API has 500 pages available
    }

    // Set the images ensuring only the required count
    setImages(allImages.slice(0, totalImagesNeeded));
  } catch (error) {
    console.error("Error fetching movie images:", error);
  }
};
