import { useState, useEffect } from "react";
import { ProductsProps } from "../utils/types";
import { FetchScrapperData } from "../utils/fetchData";

export default function Home() {
  const [produtos, setProdutos] = useState<ProductsProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 15;
  const indexOfLastPage = currentPage * productsPerPage;
  const indexOfFirsProduct = indexOfLastPage - productsPerPage;
  const currentProducts = produtos.slice(indexOfFirsProduct, indexOfLastPage);

  useEffect(() => {
    if (!isLoading && produtos.length > 0) {
      console.log("Exibindo dados na tela...");
    }
  }, [isLoading, produtos, search]);

  const handleChange = (e: any) => {
    setSearch(e.target.value);
    if (search.trim() === "") {
      return;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    FetchScrapperData({
      address: "http://localhost:3333/scrapper",
      search,
      updateFN: setProdutos,
      timeoutFN: setIsLoading,
    });
  };

  return (
    <div className="p-6 w-full h-auto bg-black">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 items-center justify-start"
      >
        <input
          type="text"
          className="text-black rounded-sm outline"
          value={search}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-700 text-sm rounded w-20 p-[2px]"
        >
          Pesquisar
        </button>
      </form>

      {search.trim() === "" ? (
        <p>Nenhum termo de busca inserido</p>
      ) : isLoading ? (
        <p>Carregando lista de produtos</p>
      ) : produtos.length > 0 ? (
        <div className="pt-4">
          <div className="flex gap-6">
            <span>Resultados: {produtos.length}</span>
            <span>Menor preço: </span>
            <span>Media de preço: </span>
          </div>
          <ul className="flex flex-col gap-2 pt-2">
            {currentProducts.map((item, index) => (
              <div
                key={index}
                className="p-4 flex flex-col items-start bg-gray-800 rounded-md gap-2 mb-2"
              >
                <p className="text-lg font-bold">{item.title}</p>
                <div className="flex gap-4 font-semibold">
                  <p className="text-green-600 font-bold">{item.price_calc}</p>

                  <p>{item.rating}</p>
                  <p>Reviews {item.reviewCount}</p>
                </div>
                <a
                  href={item.link}
                  className="p-2 bg-emerald-600 rounded-md hover:bg-emerald-500 transition-all"
                >
                  Visitar produto
                </a>
                
              </div>
            ))}
            <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Pagina Anterior
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={indexOfFirsProduct >= produtos.length}
                >
                  Proxima Pagina
                </button>
          </ul>
        </div>
      ) : (
        <p>Nenhum produto disponível</p>
      )}
    </div>
  );
}
