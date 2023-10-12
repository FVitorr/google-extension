import { useState, useEffect } from "react";

type ProductsProps = {
  link: string;
  price: number;
  rating: string;
  reviewCount: string;
  title: string;
};

export default function Home() {
  const [produtos, setProdutos] = useState<ProductsProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function fetchData() {
    if (search.trim() === "") {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3333/scrapper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName: search }),
      });
      const data = await response.json();
      await setProdutos(data);
      console.log(data); // Manter o log no console
    } catch (error) {
      console.error(error);
    } finally {
      // Após 3 segundos, definir isLoading como false
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }

  useEffect(() => {
    // Remova a chamada fetchData do useEffect anterior
  }, [search]);

  useEffect(() => {
    // Verificar o tamanho do array após o atraso de 3 segundos
    if (!isLoading && produtos.length > 0) {
      console.log("Exibindo dados na tela...");
    }
  }, [isLoading, produtos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const handleChange = (e: any) => {
    setSearch(e.target.value);
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
          <h2>Produtos encontrados</h2>
          <ul className="flex flex-col gap-2 pt-2">
            {produtos.map((item, index) => (
              <div
                key={index}
                className="p-4 flex flex-col items-start bg-gray-800 rounded-md gap-2 mb-2"
              >
                <p className="text-lg font-bold">{item.title}</p>
                <div className="flex gap-4 font-semibold">
                  <p className="text-green-600 font-bold">
                    {item.price.toString().startsWith("Valor:")
                      ? item.price
                      : `R$${item.price}`}
                  </p>

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
          </ul>
        </div>
      ) : (
        <p>Nenhum produto disponível</p>
      )}
    </div>
  );
}
