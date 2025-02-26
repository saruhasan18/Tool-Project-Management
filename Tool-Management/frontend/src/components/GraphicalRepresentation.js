// src/components/Analytics/GraphicalRepresentation.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "../index.css";

const GraphicalRepresentation = ({ allTransactions }) => {
  // Sample data processing: Grouping projects by status
  const statusCounts = allTransactions.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(statusCounts).map((status) => ({
    name: status,
    count: statusCounts[status],
  }));

  return (
    <div className="graphical-representation">
      <h3>Graphical Representation</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="no-data">No data available</p>
      )}
    </div>
  );
};

export default GraphicalRepresentation;
