import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pages = ["/", "MoviesAndShows", "Support", "Subscriptions"];
  const pathname = usePathname();
  return (
    <nav className="fixed top-[20px] px-[50px] h-[70px] left-0 w-full flex justify-between items-center z-[9]">
      <figure className="relative w-[220px] h-[80%]">
        <Image src={"/assets/images/nav-logo.svg"} alt="Nav logo" fill />
      </figure>

      <ul className="bg-[#0F0F0F] p-[8px] flex justify-center items-center rounded-[15px] h-full border-[#1F1F1F] border-[4px]">
        {pages.map((eachPage, i) => {
          return (
            <li
              key={i}
              className="cursor-pointer h-full"
            
            >
              <Link href={`${eachPage}`}
                className={`h-full px-[40px] flex justify-center items-center rounded-[10px] ${
                  pathname == eachPage
                    ? `bg-black_02 font-medium text-white`
                    : `text-[#E4E4E7]`
                }`}
              >
              
              {eachPage == "MoviesAndShows"
                ? `Movies And Shows`
                : eachPage == "/"
                ? "Home"
                : eachPage}
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="flex items-center justify-start">
        <figure className="relative w-[25px] h-[25px] mr-[20px]">
          <Image src={"/assets/icons/search.svg"} alt="Search icon" fill />
        </figure>

        <figure className="relative w-[25px] h-[25px]">
          <Image src={"/assets/icons/notification.svg"} alt="Bell icon" fill />
        </figure>
      </section>
    </nav>
  );
};

export default Navbar;
