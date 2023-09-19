import React from "react";

export function Logo() {
  return (
    <div className="p-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
      <h1>PRICE CALCULATOR</h1>
    </div>
  );
}

interface TextProps {
  children: React.ReactNode;
}

export function TextMD({ children }: TextProps) {
  return <span className="text-white font-medium flex items-start justify-start text-start">{children}</span>;
}
