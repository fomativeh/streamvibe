import { useState, useEffect, useRef } from "react";
import { fetchMovieImages } from "@/helpers/fetchMovieImages";
import Image from "next/image";
import "./HeroSection.css";
import MyButton from "../MyButton/MyButton";
import Link from "next/link";

// Individual row component with duplicate images for smooth looping
const ImageRow = ({
  images,
  animationDuration,
}: {
  images: string[];
  animationDuration: string;
}) => {
  return (
    <section
      className="w-fit my-[6px] flex justify-start items-center image-row"
      style={
        { "--row-animation-duration": animationDuration } as React.CSSProperties
      }
    >
      {[...images, ...images].map((eachImage, i) => (
        <figure
          className="w-[120px] relative h-[150px] rounded-[12px] mx-[6px]"
          key={i}
        >
          <Image
            src={eachImage}
            alt={"Movie image"}
            fill
            className="rounded-[inherit]"
          />
        </figure>
      ))}
    </section>
  );
};

// Main HeroSection component
const HeroSection: React.FC = () => {
  const [row1Images, setRow1Images] = useState<string[]>([]);
  const [row2Images, setRow2Images] = useState<string[]>([]);
  const [row3Images, setRow3Images] = useState<string[]>([]);
  const [row4Images, setRow4Images] = useState<string[]>([]);
  const fetchTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial fetch for the first 100 images
    fetchMovieImages(100, (images) => {
      setRow1Images(images.slice(0, 25));
      setRow2Images(images.slice(25, 50));
      setRow3Images(images.slice(50, 75));
      setRow4Images(images.slice(75, 100));
    });

    // Periodically fetch to append new images every 20 seconds
    fetchTimerRef.current = setInterval(() => {
      fetchMovieImages(100, (images) => {
        setRow1Images((prev) => [...prev, ...images.slice(0, 25)]);
        setRow2Images((prev) => [...prev, ...images.slice(25, 50)]);
        setRow3Images((prev) => [...prev, ...images.slice(50, 75)]);
        setRow4Images((prev) => [...prev, ...images.slice(75, 100)]);
      });
    }, 20000);

    return () => {
      if (fetchTimerRef.current) clearInterval(fetchTimerRef.current);
    };
  }, []);

  // Calculate animation duration based on the number of images in each row
  const row1Duration = `${row1Images.length * 10}s`;
  const row2Duration = `${row2Images.length * 10}s`;
  const row3Duration = `${row3Images.length * 10}s`;
  const row4Duration = `${row4Images.length * 10}s`;

  return (
    <section className="font-[Manrope] mb-[100px] h-[130vh] w-full flex flex-col justify-start items-center flex-wrap overflow-x-hidden">
      {row1Images.length > 0 && (
        <section className="h-[65%] relative w-full overflow-hidden flex flex-col items-center pb-[10px]">
          {/* Fade from top to bottom */}
          <div className="absolute bg-gradient-to-b from-black_01  to-transparent w-full h-[70%] top-0 left-0 z-[2]"></div>

          {/* Fade from bottom to top */}
          <div className="absolute bg-gradient-to-t from-black_01 to-transparent w-full h-[70%] bottom-0 left-0 z-[2]"></div>

          <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
            <figure className="relative w-[50vw] h-[50vw] max-w-[300px] max-h-[300px] z-[2] opacity-[70%] max-sm:opacity-[90%]">
              <Image
                src={"/assets/images/play-symbol.svg"}
                alt="Play symbol image"
                fill
              />
            </figure>
          </div>
          <ImageRow images={row1Images} animationDuration={row1Duration} />
          <ImageRow images={row2Images} animationDuration={row2Duration} />
          <ImageRow images={row3Images} animationDuration={row3Duration} />
          <ImageRow images={row4Images} animationDuration={row4Duration} />
        </section>
      )}

      <section className="w-full h-[35%] flex flex-col justify-start items-center relative z-[3]">
        <h1 className="text-white text-center max-sm:text-[7vw] max-sm:mt-[-80px] mt-[-50px] font-bold text-[40px]">
          The Best Streaming Experience
        </h1>
        <p className="text-grey_01 w-[80%] max-sm:w-[92%] max-w-[800px] text-center mt-[10px] max-sm:mt-[14px] mb-[30px]">
          StreamVibe is the best streaming experience for watching your favorite
          movies and shows on demand, anytime, anywhere.{" "}
          <span className="max-sm:hidden">
            With StreamVibe, you can enjoy a wide variety of content, including
            the latest blockbusters, classic movies, popular TV shows, and more.
            You can also create your own watchlists, so you can easily find the
            content you want to watch.
          </span>
        </p>

        <Link href={"/MoviesAndShows"}>
          <MyButton
            text="Start Watching Now"
            image="/assets/icons/play-icon.svg"
          />
        </Link>
      </section>
    </section>
  );
};

export default HeroSection;
