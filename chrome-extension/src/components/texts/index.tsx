import React from "react";

export function Logo() {
  return (
    <div className="p-4 text-4xl font-bold md:text-2xl flex justify-center md:flex md:justify-normal  text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
      <h1>PRICE CALCULATOR</h1>
    </div>
  );
}

interface TextProps {
  children: React.ReactNode;
}

export function TextMD({ children }: TextProps) {
  return <span>{children}</span>;
}
