import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const EditProduct = (props) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`/api/products/${props.match.params.id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.match.params.id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/products/${props.match.params.id}`, product)
      .then((res) => {
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="scrumMasterName">Scrum Master Name</label>
          <input
            type="text"
            name="scrumMasterName"
            value={product.scrumMasterName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="productOwnerName">Product Owner Name</label>
          <input
            type="text"
            name="productOwnerName"
            value={product.productOwnerName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="developers">Developers</label>
          <input
            type="text"
            name="developers"
            value={product.developers.join(",")}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={product.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="methodology">Methodology</label>
          <select
            name="methodology"
            value={product.methodology}
            onChange={handleChange}
          >
            <option value="Agile">Agile</option>
            <option value="Waterfall">Waterfall</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProduct;
