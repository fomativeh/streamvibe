import Image from "next/image";
import React from "react";

type props = {
  text: string;
  image?: string;
};

const MyButton = ({ text, image }: props) => {
  return (
    <button className="border-none bg-red_01 px-[20px] py-[15px] flex justify-center items-center rounded-[8px]">
      {image && (
        <figure className="relative w-[25px] h-[25px] mr-[8px]">
          <Image src={image} alt="Button icon" fill />
        </figure>
      )}

      <span className="text-white">{text}</span>
    </button>
  );
};

export default MyButton;
