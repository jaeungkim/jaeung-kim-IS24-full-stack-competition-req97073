import React, { useState, useEffect } from "react";

const ProductEdit = ({ product: editingProduct, updateProduct }) => {
  const [product, setProduct] = useState(editingProduct);

  useEffect(() => {
    setProduct(editingProduct);
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render form fields for editing product properties */}
      <input
        type="text"
        name="productName"
        value={product.productName}
        onChange={handleChange}
      />
      {/* Add other form fields as needed, following the same pattern */}
      <input
        type="text"
        name="scrumMasterName"
        value={product.scrumMasterName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="productOwnerName"
        value={product.productOwnerName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="developers"
        value={product.developers.join(", ")}
        onChange={(e) =>
          handleChange({
            target: { name: "developers", value: e.target.value.split(", ") },
          })
        }
      />
      <input
        type="date"
        name="startDate"
        value={product.startDate}
        onChange={handleChange}
      />
      <input
        type="text"
        name="methodology"
        value={product.methodology}
        onChange={handleChange}
      />

      {/* Add a submit button */}
      <button type="submit">Save</button>
    </form>
  );
};

export default ProductEdit;
