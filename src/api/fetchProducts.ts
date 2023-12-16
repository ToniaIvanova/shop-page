import axios from "axios";
import { Category, Product } from "./types";

const url = "https://fakestoreapi.com/products";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const getCategories = async () => {
  try {
    const { data }: { data: Category[] } = await axios.get(
      `${url}/categories`,
      {
        headers,
      }
    );
    return data;
  } catch (err) {
    throw err;
  }
};

export const getAllProducts = async () => {
  try {
    const { data }: { data: Product[] } = await axios.get(`${url}?limit=12`, {
      headers,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    const { data }: { data: Product[] } = await axios.get(
      `${url}/category/${category}`,
      {
        headers,
      }
    );
    return data;
  } catch (err) {
    throw err;
  }
};

export const getProductById = async (id: number) => {
  try {
    const { data }: { data: Product } = await axios.get(`${url}/${id}`, {
      headers,
    });
    return data;
  } catch (err) {
    throw err;
  }
};
