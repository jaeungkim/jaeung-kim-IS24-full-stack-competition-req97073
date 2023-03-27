import React from "react";
import Layout from "../components/Layout";
import ProductList from "../components/ProductsList";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto mt-4">
        <h1 className="text-3xl font-bold mb-4">Product List</h1>
        <ProductList />
      </div>
    </Layout>
  );
};

export default Home;
