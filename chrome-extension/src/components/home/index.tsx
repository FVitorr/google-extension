// import { useState, useEffect } from "react";

// export default function Home() {
//   const [produtos, setProdutos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("http://localhost:3333/scrapper", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ productName: "ps4 pro" }),
//         });
//         const data = await response.json();
//         setProdutos(data);
//         setIsLoading(false);
//         console.log(data); // Manter o log no console
//       } catch (error) {
//         console.error(error);
//         setIsLoading(false);
//       }
//     }
//     fetchData();
//   },[]);

//   return (
//     <div className="p-2">
//       <h2>Produtos</h2>
//       {
//         <ul>
//           {produtos.map((item: any) => (
//             <div>{item.title}</div>
//           ))}
//         </ul>
//       }
//     </div>
//   );
// }

import { useState, useEffect } from "react";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  console.log(produtos[1])
  return (
    <div className="p-2">
      <h2>Produtos</h2>
      {isLoading ? (
        <p>Carregando...</p>
      ) : produtos.length > 0 ? (
        <ul>
          {produtos.map((item, index) => (
            <div key={index}>{item.title}</div>
          ))}
        </ul>
      ) : (
        <p>Nenhum produto disponível</p>
      )}
    </div>
  );
}
