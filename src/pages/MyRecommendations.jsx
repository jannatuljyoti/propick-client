import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/firebase.init";
import useDynamicTitle from '../hooks/dynamicTitle';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const MyRecommendations = () => {
  useDynamicTitle("My Recommendations");

  const [user] = useAuthState(auth);
  const [recommendations, setRecommendations] = useState([]);
  const [badge, setBadge] = useState('Newbie');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user?.email) return;

    console.log("Fetching for:", user.email);

    axios
      .get(`https://propick-server.vercel.app/my-recommendations/${user.email}`)
      .then((res) => {
        const data = res.data;

        // If backend sends proper object
        if (data?.success && Array.isArray(data.recommendations)) {
          setRecommendations(data.recommendations);
          setBadge(data.badge || "Newbie");
          setCount(data.recommendationCount || 0);
        } 
        // Fallback in case backend returns only array
        else if (Array.isArray(data)) {
          setRecommendations(data);
          setCount(data.length);
          setBadge(
            data.length >= 10 ? "Expert" : data.length >= 5 ? "Contributor" : "Newbie"
          );
        } 
        else {
          console.error("Unexpected response structure:", data);
        }
      })
      .catch((err) => {
        console.error("Axios error:", err);
        toast.error("Failed to fetch recommendations");
      });
  }, [user]);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;

    axios
      .delete(`https://propick-server.vercel.app/recommendations/${id}`)
      .then(() => {
        toast.success('Deleted successfully');
        setRecommendations((prev) => prev.filter((r) => r._id !== id));
        setCount((prev) => prev - 1);

        // Update badge dynamically after deletion
        const newCount = count - 1;
        setBadge(
          newCount >= 10 ? "Expert" : newCount >= 5 ? "Contributor" : "Newbie"
        );
      })
      .catch((err) => {
        console.error(err);
        toast.error('Delete Failed');
      });
  };

  return (
    <div className="p-7 bg-blue-50 min-h-screen">
      <h2 className="bg-base-100 mt-10 p-3 rounded text-2xl text-center text-[#4bbafa] font-bold mb-2">
        My Recommendations
      </h2>

      {/* Badge + Count */}
      <p className="text-center text-gray-600 mb-2">
        You have made{" "}
        <span className="text-blue-500 font-semibold">{count}</span>{" "}
        recommendations
      </p>
      <div className="flex justify-center mb-5">
        <span className="px-4 py-1 rounded-full bg-gray-300 text-gray-800 font-medium">
          {badge || "Newbie"}
        </span>
      </div>

      {/* Recommendations Table */}
      <div className="overflow-x-auto bg-base-100 shadow-md">
        <table className="table-fixed w-full border border-collapse border-sky-400">
          <thead className="bg-base-100">
            <tr>
              <th className="w-1/4 p-3 border border-sky-400 text-[#4bbafa] text-left">Title</th>
              <th className="w-1/4 p-3 border border-sky-400 text-[#4bbafa] text-left">Product Name</th>
              <th className="w-1/4 p-3 border border-sky-400 text-[#4bbafa] text-left">Reason</th>
              <th className="w-1/4 p-3 border border-sky-400 text-[#4bbafa] text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {recommendations.length > 0 ? (
              recommendations.map((re) => (
                <tr key={re._id}>
                  <td className="w-1/4 p-3 border border-sky-400 align-top">{re.queryTitle}</td>
                  <td className="w-1/4 p-3 border border-sky-400 align-top">{re.productName}</td>
                  <td className="w-1/4 p-3 border border-sky-400 align-top break-words">{re.reason}</td>
                  <td className="w-1/4 p-3 border border-sky-400 align-top">
                    <button
                      onClick={() => handleDelete(re._id)}
                      className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-5 text-gray-500">
                  No recommendation found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </div>
  );
};

export default MyRecommendations;
