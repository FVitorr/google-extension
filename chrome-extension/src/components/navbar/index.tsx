import { useState } from "react";

export default function Navbar() {
  // const [price, setPrice] = useState(0);


  return (
    <div className="flex gap-4 w-full p-8">
      <h1>Price cal</h1>
      <button>
        Scrapper
      </button>
      <button>
        Extrair dados
      </button>
    </div>
  );
}