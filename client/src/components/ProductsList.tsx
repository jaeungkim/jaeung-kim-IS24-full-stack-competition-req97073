import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  productId: number;
  productName: string;
  productOwnerName: string;
  developers: string[];
  scrumMasterName: string;
  startDate: string;
  methodology: "Agile" | "Waterfall";
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:8000/api/products"
        );
        setProducts(response.data);
      } catch (error: any) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-4">
      <table className="table-auto border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Product Number</th>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Scrum Master</th>
            <th className="px-4 py-2">Product Owner</th>
            <th className="px-4 py-2">Developer Names</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">Methodology</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{product.productId}</td>
              <td className="border px-4 py-2">{product.productName}</td>
              <td className="border px-4 py-2">{product.scrumMasterName}</td>
              <td className="border px-4 py-2">{product.productOwnerName}</td>
              <td className="border px-4 py-2">
                {product.developers.join(", ")}
              </td>
              <td className="border px-4 py-2">{product.startDate}</td>
              <td className="border px-4 py-2">{product.methodology}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
