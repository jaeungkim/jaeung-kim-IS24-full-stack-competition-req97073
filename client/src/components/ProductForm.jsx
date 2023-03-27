import React, { useState } from "react";

import axios from "axios";

const InputField = ({ label, id, type, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2" htmlFor={id}>
      {label}:
    </label>
    <input
      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={id}
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

const ProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    scrumMasterName: "",
    productOwnerName: "",
    developers: "",
    startDate: "",
    methodology: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [id]: value }));
  };

  const handleDevelopersChange = (e) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, developers: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if required fields are not empty
    if (
      !product.productName ||
      !product.scrumMasterName ||
      !product.productOwnerName
    ) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/products/addProduct",
        product
      );
      setMessage({ type: "success", text: "Product added successfully!" });
      setProduct({
        productName: "",
        scrumMasterName: "",
        productOwnerName: "",
        developers: "",
        startDate: "",
        methodology: "",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to add product" });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      {message.type === "success" && (
        <div className="bg-green-200 text-green-800 py-2 px-4 mb-4">
          {message.text}
        </div>
      )}
      {message.type === "error" && (
        <div className="bg-red-200 text-red-800 py-2 px-4 mb-4">
          {message.text}
        </div>
      )}
      <form className="px-6 py-4" onSubmit={handleSubmit}>
        <InputField
          label="Product Name"
          id="productName"
          type="text"
          value={product.productName}
          onChange={handleChange}
        />
        <InputField
          label="Scrum Master"
          id="scrumMasterName"
          type="text"
          value={product.scrumMasterName}
          onChange={handleChange}
        />
        <InputField
          label="Product Owner"
          id="productOwnerName"
          type="text"
          value={product.productOwnerName}
          onChange={handleChange}
        />
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="developers"
          >
            Developers:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="developers"
            type="text"
            value={product.developers}
            onChange={handleDevelopersChange}
          />
        </div>
        <InputField
          label="Start Date"
          id="startDate"
          type="date"
          value={product.startDate}
          onChange={handleChange}
        />
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="methodology"
          >
            Methodology:
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="methodology"
            value={product.methodology}
            onChange={handleChange}
          >
            <option value="">Select Methodology</option>
            <option value="Agile">Agile</option>
            <option value="Waterfall">Waterfall</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
