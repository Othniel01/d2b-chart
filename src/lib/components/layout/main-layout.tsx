"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

interface MainLayoutProps {
  children?: React.ReactNode;
}

// bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-white/60

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="w-full relative pb-[8rem] h-fit">
      <div className="w-full h-[70px]"></div>
      <div className="w-full z-20 fixed top-0 left-0 flex pr-20 pl-20 items-center justify-between bg-white shadow-[-8px_10px_41px_-25px_rgba(0,0,0,0.75)] h-[70px]">
        <object
          className="w-[124px]"
          type="image/svg+xml"
          data={"/svg/data2bot-logo.svg"}
        ></object>

        <div className="flex text-sm gap-3 items-center">
          <p> Created with</p>
          <object
            className="w-[20px]"
            type="image/svg+xml"
            data={"/svg/heart.svg"}
          ></object>
          <p>by</p>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/othniel-abalaka-885b50243/"
            className="underline"
          >
            {" "}
            Othniel Abalaka
          </Link>
        </div>
      </div>

      <div className="w-full flex justify-center mt-20">
        <Image
          src={"/image/who.png"}
          alt="Cover Image"
          className="filter grayscale  object-cover shrink-0 w-[70px] h-[70px]"
          width={6740}
          height={6740}
          quality={100}
        />
      </div>

      {children}

      <p className="absolute right-[80px] bottom-[30px]">Built with d3.js</p>
    </div>
  );
}

export default MainLayout;
