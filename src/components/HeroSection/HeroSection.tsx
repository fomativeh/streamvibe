import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { fetchMovieImages } from "@/helpers/fetchMovieImages";

const HeroSection: React.FC = () => {
  const [movieImages, setMovieImages] = useState<string[]>([]); // Array of image URLs
  const fetchTimerRef = useRef<NodeJS.Timeout | null>(null); // To store the interval ID
  useEffect(() => {
    console.log(movieImages);
  }, [movieImages]);

  useEffect(() => {
    // Fetch the first 100 images when the component mounts
    fetchMovieImages(100, setMovieImages);

    // Set up a 30-second interval to fetch 100 more images
    fetchTimerRef.current = setInterval(() => {
      fetchMovieImages(100, setMovieImages);
    }, 30000);

    // Cleanup
    return () => {
      if (fetchTimerRef.current) {
        clearInterval(fetchTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="h-[100vh] w-full flex justify-center items-center flex-wrap">
      {/* Infinite image slider implementation */}
      {/* {movieImages.map((image, index) => (
          <img key={index} src={image} alt={`Movie Poster ${index}`} className="w-[120px] h-[120px] rounded-[10px] m-[10px]" />
        ))} */}
      {/* Additional hero content can go here */}
    </section>
  );
};

export default HeroSection;
