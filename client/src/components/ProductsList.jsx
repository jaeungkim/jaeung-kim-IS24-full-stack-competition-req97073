import React, { useState, useEffect } from "react";
import axios from "axios";
import EditProduct from "./ProductEdit";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});

  const handleEditClick = (product) => {
    setShowModal(true);
    setProductToEdit(product);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setProductToEdit({});
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
            <th className="px-4 py-2">Actions</th>
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
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <EditProduct product={productToEdit} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default ProductList;
