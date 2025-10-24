import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Loading from "./Loading";
import { AuthContext } from "../context/AuthProvider";

const HomeAnalyticsSection = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://propick-server.vercel.app/all-queries")
      .then(res => {
        setQueries(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;


  const totalQueries = queries.length;
  const totalRecommendations = queries.reduce(
    (sum, q) => sum + (q.recommendationCount || 0),
    0
  );

  const myQueries = currentUser ? queries.filter(q => q.userEmail === currentUser.email) : [];
  const recommendationsForMe = myQueries.reduce(
    (sum, q) => sum + (q.recommendationCount || 0),
    0
  );

  
const chartData = queries
  .map(q => ({
    name: q.productName.length > 20 ? q.productName.slice(0, 20) + "..." : q.productName,
    recommendations: q.recommendationCount
  }))
  .sort((a, b) => b.recommendations - a.recommendations); // descending order


  return (
    <section className="px-5 py-10 bg-base-100">
      <h2 className="text-3xl font-bold text-center text-[#4bbafa] mb-10">
        Analytics Overview
      </h2>

  
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Queries</h3>
          <p className="text-3xl font-bold text-[#4bbafa] mt-2">{totalQueries}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Recommendations</h3>
          <p className="text-3xl font-bold text-[#4bbafa] mt-2">{totalRecommendations}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Recommendations of Login User</h3>
          {currentUser ? (
            <p className="text-3xl font-bold text-[#4bbafa] mt-2">{recommendationsForMe}</p>
          ) : (
            <p className="text-gray-500 mt-2">Login to see your data</p>
          )}
        </div>
      </div>

 
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Recommendations per Product
        </h3>
        {chartData.length === 0 ? (
          <p className="text-center text-gray-500">No recommendations yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="recommendations" fill="#4bbafa" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
};

export default HomeAnalyticsSection;
