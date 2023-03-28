import React, { useState, useEffect } from "react";

const ProductEdit = ({ product: editingProduct, updateProduct }) => {
  const [product, setProduct] = useState(editingProduct);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setProduct(editingProduct);
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setProduct({ ...product, [name]: value });
    } else if (name === "developers") {
      setProduct({ ...product, [name]: value.split(", ") });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(product);
    if (Object.keys(validationErrors).length === 0) {
      updateProduct(product);
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = (product) => {
    const errors = {};
    if (!product.productName) {
      errors.productName = "Product name is required";
    }
    if (!product.startDate) {
      errors.startDate = "Start date is required";
    }
    // Add other validation rules as needed
    return errors;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render form fields for editing product properties */}
      <div>
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={product.productName}
          onChange={handleChange}
        />
        {errors.productName && <span>{errors.productName}</span>}
      </div>
      {/* Add other form fields as needed, following the same pattern */}
      <div>
        <label htmlFor="scrumMasterName">Scrum Master Name</label>
        <input
          type="text"
          id="scrumMasterName"
          name="scrumMasterName"
          value={product.scrumMasterName}
          onChange={handleChange}
        />
        {errors.scrumMasterName && <span>{errors.scrumMasterName}</span>}
      </div>
      <div>
        <label htmlFor="productOwnerName">Product Owner Name</label>
        <input
          type="text"
          id="productOwnerName"
          name="productOwnerName"
          value={product.productOwnerName}
          onChange={handleChange}
        />
        {errors.productOwnerName && <span>{errors.productOwnerName}</span>}
      </div>
      <div>
        <label htmlFor="developers">Developers</label>
        <input
          type="text"
          id="developers"
          name="developers"
          value={product.developers.join(", ")}
          onChange={(e) =>
            handleChange({
              target: { name: "developers", value: e.target.value.split(", ") },
            })
          }
        />
        {errors.developers && <span>{errors.developers}</span>}
      </div>
      <div>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={product.startDate ? formatDate(product.startDate) : ""}
          onChange={handleChange}
        />
        {errors.startDate && <span>{errors.startDate}</span>}
      </div>
      <div>
        <label htmlFor="methodology">Methodology</label>
        <select
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="methodology"
          name="methodology"
          value={product.methodology}
          onChange={handleChange}
        >
          <option value="">Select Methodology</option>
          <option value="Agile">Agile</option>
          <option value="Waterfall">Waterfall</option>
        </select>
        {errors.methodology && <span>{errors.methodology}</span>}
      </div>

      {/* Add a submit button */}
      <button type="submit">Save</button>
    </form>
  );
};

export default ProductEdit;
