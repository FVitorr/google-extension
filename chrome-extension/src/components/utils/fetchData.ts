import React from "react";
import { ProductsProps } from "./types";

interface FetchScrapperDataInterface {
  address: string;
  search: string;
  updateFN: React.Dispatch<React.SetStateAction<ProductsProps[]>>;
  timeoutFN: React.Dispatch<React.SetStateAction<boolean>>;
}

export async function FetchScrapperData({
  address,
  search,
  updateFN,
  timeoutFN,
}: FetchScrapperDataInterface) {
  try {
    const response = await fetch(address, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: search,
      }),
    });
    const data = await response.json();
    console.log(data);
    updateFN(data);
  } catch (err) {
    return err;
  } finally {
   setTimeout(() => {
      timeoutFN(false)
   }, 2000)
  }
}
