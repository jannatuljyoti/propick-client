import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router";
import useDynamicTitle from "../hooks/dynamicTitle";
import { Share2 } from "lucide-react"; 
import toast from "react-hot-toast"; 

const Queries = () => {
  useDynamicTitle("Queries");

  const [queries, setQueries] = useState([]);
  const [filterQueries, setFilterQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [gridCol, setGridCol] = useState(3);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    axios
      .get("https://propick-server.vercel.app/all-queries")
      .then((res) => {
        setQueries(res.data);
        setFilterQueries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading:", err);
        setLoading(false);
      });
  }, []);

  // Search Function
  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearch(text);
    const matched = queries.filter((query) =>
      query.productName.toLowerCase().includes(text)
    );
    setFilterQueries(matched);
  };

  //Sort Function
  const handleSortByRecommendation = (order) => {
    const sorted = [...filterQueries].sort((a, b) => {
      if (order === "asc") {
        return a.recommendationCount - b.recommendationCount;
      } else {
        return b.recommendationCount - a.recommendationCount;
      }
    });
    setSortOrder(order);
    setFilterQueries(sorted);
  };

  // Share Function
  const handleShare = async (queryId) => {
    const queryUrl = `${window.location.origin}/query/${queryId}`;
    try {
      await navigator.clipboard.writeText(queryUrl);
      toast.success("✅ Query link copied to clipboard!");
    } catch (error) {
      console.error("Copy failed:", error);
      toast.error("❌ Failed to copy link!");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="px-5 py-11 bg-base-100 min-h-screen">
      <h1 className="text-3xl font-bold mt-10 mb-5 text-center text-[#4bbafa]">
        All Queries
      </h1>

     
      <div className="max-w-md mx-auto mb-5">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by Product Name..."
          className="input input-bordered w-full"
        />
      </div>

    
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        <button
          onClick={() => setGridCol(1)}
          className={`btn bg-base-100 shadow btn-sm ${
            gridCol == 1 ? "bg-blue-500 text-white" : ""
          }`}
        >
          1 Col
        </button>

        <button
          onClick={() => setGridCol(2)}
          className={`btn bg-base-100 shadow btn-sm ${
            gridCol == 2 ? "bg-blue-500 text-white" : ""
          }`}
        >
          2 Col
        </button>

        <button
          onClick={() => setGridCol(3)}
          className={`btn bg-base-100 shadow btn-sm ${
            gridCol == 3 ? "bg-blue-500 text-white" : ""
          }`}
        >
          3 Col
        </button>

      
        <select
          className="select select-bordered select-sm"
          value={sortOrder}
          onChange={(e) => handleSortByRecommendation(e.target.value)}
        >
          <option value="desc">Sort: Highest Recommendations</option>
          <option value="asc">Sort: Lowest Recommendations</option>
        </select>
      </div>

      
      {filterQueries.length === 0 ? (
        <div className="text-center text-lg">No Queries found</div>
      ) : (
        <div
          className={`grid gap-5 ${
            gridCol === 1
              ? "grid-cols-1"
              : gridCol === 2
              ? "sm:grid-cols-2"
              : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filterQueries.map((query) => (
            <div
              key={query._id}
              className="bg-white rounded-xl shadow flex flex-col h-[520px] p-6"
            >
              <div className="flex-1">
                <img
                  src={query.productImage}
                  alt={query.productName}
                  className="w-full h-52 object-cover rounded mb-5"
                />

                <h2 className="text-xl text-gray-700 font-semibold mb-2">
                  {query.queryTitle}
                </h2>

                <p className="text-sm text-gray-600 mb-2">
                  <strong>Brand:</strong> {query.productBrand}
                </p>

                <p className="text-sm text-gray-600 mb-3">
                  <strong>Reason:</strong>{" "}
                  {query.reasonDetails.slice(0, 100)}...
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  <strong>Recommendations:</strong>{" "}
                  {query.recommendationCount}
                </p>
              </div>

              
              <div className="flex justify-between items-center gap-2 mt-3">
                <Link to={`/query/${query._id}`} className="flex-1">
                  <button className="w-full bg-[#4bbafa] text-white py-2 rounded hover:bg-blue-700">
                    Recommend
                  </button>
                </Link>

                
                <button
                  onClick={() => handleShare(query._id)}
                  className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                  title="Share Query"
                >
                  <Share2 className="text-[#4bbafa]" size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Queries;
