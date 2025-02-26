// src/pages/Analytics.js
import React from "react";
import { useLocation } from "react-router-dom";
import GraphicalRepresentation from "../components/GraphicalRepresentation";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

const Analytics = () => {
  const location = useLocation();
  const allTransactions = location.state?.projects || [];

  return (
    <>
    <Header />
    <div>
      <h2>Analytics Dashboard</h2>
      <GraphicalRepresentation allTransactions={allTransactions} />
    </div>
    <Footer />
    </>
  );
};

export default Analytics;
