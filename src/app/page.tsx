"use client"
import HeroSection from "@/components/HeroSection/HeroSection";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return <main className="min-h-screen w-full relative">
    <Navbar/>
    <HeroSection/>
  </main>;
}
