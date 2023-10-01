import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3333/scrapper", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify("GTX 1650"),
        });
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          console.log("Voce nao consegui seu otario");
        }
      } catch (error) {
        return error;
      }
    }
    fetchData();
  }, []);

  return <div className="p-2"></div>;
}
