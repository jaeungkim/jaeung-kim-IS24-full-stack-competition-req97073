import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductEdit from "./ProductEdit";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [scrumMasterSearchText, setScrumMasterSearchText] = useState("");
  const [developerSearchText, setDeveloperSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/products/${updatedProduct.productId}`,
        updatedProduct
      );

      // Update the products state with the updated product
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === updatedProduct.productId
            ? updatedProduct
            : product
        )
      );

      // Hide the edit form
      setEditingProduct(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleScrumMasterSearchTextChange = (e) => {
    setScrumMasterSearchText(e.target.value);
  };

  const handleDeveloperSearchTextChange = (e) => {
    setDeveloperSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (scrumMasterSearchText !== "") {
      filtered = filtered.filter((product) =>
        product.scrumMasterName
          .toLowerCase()
          .includes(scrumMasterSearchText.toLowerCase())
      );
    }
    if (developerSearchText !== "") {
      filtered = filtered.filter((product) =>
        product.developers.some((dev) =>
          dev.toLowerCase().includes(developerSearchText.toLowerCase())
        )
      );
    }
    setFilteredProducts(filtered);
  }, [scrumMasterSearchText, developerSearchText, products]);

  return (
    <div className="container mx-auto mt-4">
      {editingProduct && (
        <ProductEdit
          product={editingProduct}
          updateProduct={updateProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Product List</h2>
        <div>
          <input
            type="text"
            placeholder="Search by Scrum Master"
            value={scrumMasterSearchText}
            onChange={handleScrumMasterSearchTextChange}
            className="border px-2 py-1 rounded-lg mr-2"
          />
          <input
            type="text"
            placeholder="Search by Developer"
            value={developerSearchText}
            onChange={handleDeveloperSearchTextChange}
            className="border px-2 py-1 rounded-lg"
          />
        </div>
      </div>
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
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
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
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
