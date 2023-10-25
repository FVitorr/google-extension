import React, { useState } from "react";
import { ProductsProps } from "../utils/types";
import { FetchScrapperData } from "../utils/fetchData";
import { motion } from "framer-motion";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export default function Home() {
  const [produtos, setProdutos] = useState<ProductsProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchError, setSearchError] = useState("");

  const productsPerPage = 15;
  const indexOfLastPage = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastPage - productsPerPage;
  const currentProducts = produtos.slice(indexOfFirstProduct, indexOfLastPage);

  const handleChange = (e: any) => {
    setSearch(e.target.value);
    setSearchError(""); // Limpa a mensagem de erro ao digitar.
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() === "") {
      setSearchError("Por favor, insira um termo de busca.");
      return;
    }
    setIsLoading(true);
    FetchScrapperData({
      address: "http://localhost:3333/scrapper=amazon",
      search,
      updateFN: setProdutos,
      timeoutFN: setIsLoading,
    });
  };

  return (
    <div className="p-6 w-full h-auto bg-zinc-950">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 items-center justify-start"
      >
        <input
          type="text"
          placeholder="Fone de ouvido"
          className="text-black rounded-lg text-center outline"
          value={search}
          onChange={handleChange}
        />
        <select className="text-black rounded-lg text-center outline">
          <option defaultValue={"Undefined"}>Selecione uma plataforma</option>
          <option value="amazon">Amazon</option>
          <option value="aliexpress">AliExpress</option>
          <option value="amazon">Alibaba</option>
          <option value="aliexpress">Mercado Livre</option>
        </select>
        <button
          type="submit"
          className="bg-blue-700 text-sm rounded w-20 p-[2px]"
        >
          Pesquisar
        </button>
      </form>

      {searchError && <p className="text-red-600">{searchError}</p>}

      {search.trim() === "" ? (
        <p>Nenhum termo de busca inserido</p>
      ) : isLoading ? (
        <p>Carregando lista de produtos</p>
      ) : produtos.length > 0 ? (
        <motion.div
          className="pt-4"
          initial={{
            x: -1000,
          }}
          animate={{
            x: 0,
          }}
          transition={{
            ease: "linear",
            duration: 0.2,
          }}
        >
          <div className="flex gap-6">
            <span>Resultados: {produtos.length}</span>
            <span>Menor preço: </span>
            <span>Media de preço: </span>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            {/* CRIAR COMPONENTE PRA ISSO AQUI */}
            {currentProducts.map((item, index) => (
              <div
                key={index}
                className="p-4 flex flex-col items-start  bg-zinc-900 rounded-md gap-2 mb-2"
              >
                <p className="text-sm font-bold">{item.title}</p>
                <div className="flex gap-4 font-semibold text-xs">
                  <p className="text-green-600 font-bold text-xs">{item.price_calc}</p>
                  <p>{item.rating}</p>
                  <p>Reviews {item.reviewCount}</p>
                </div>
                <a
                  href={item.link}
                  className="bg-blue-600 text-center p-[2px] w-auto rounded-sm hover:bg-emerald-500 transition-all"
                >
                  Visitar produto
                </a>
              </div>
            ))}
            <div className="w-full items-center justify-center flex p-2">
              <button
                className="text-4xl"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <MdArrowBackIos />
              </button>
              <button
                className="text-4xl"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={indexOfFirstProduct >= produtos.length}
              >
                <MdArrowForwardIos />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <p>Nenhum produto disponível</p>
      )}
    </div>
  );
}
