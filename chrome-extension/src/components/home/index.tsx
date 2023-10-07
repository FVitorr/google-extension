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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3333/scrapper", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productName: "ps4 pro" }),
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
    fetchData();
  }, []);

  useEffect(() => {
    // Verificar o tamanho do array após o atraso de 3 segundos
    if (!isLoading && produtos.length > 0) {
      console.log("Exibindo dados na tela...");
    }
  }, [isLoading, produtos]);

  console.log(produtos[1]);
  return (
    <div className="p-2">
      <form action="">
        <input type="text" value={(e) => setSearch(e.target.value)} />
      </form>
      <h2>Produtos</h2>
      {isLoading ? (
        <p>Carregando lista de produtos</p>
      ) : produtos.length > 0 ? (
        <ul>
          {produtos.map((item, index) => (
            <div key={index} className="p-4 flex flex-col items-start">
              <p className="text-lg">{item.title}</p>
              {/* OLHAR COMO LIMIAR O TAMANHO DA DESCRIPTION E COLOCAR UM BOTAO PARA EXIBIR MAIS */}
              <p>
                {item.rating} {item.reviewCount}
              </p>
              <p>{item.price}</p>
            </div>
          ))}
        </ul>
      ) : (
        <p>Nenhum produto disponível</p>
      )}
    </div>
  );
}
