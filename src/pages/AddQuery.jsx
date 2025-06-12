import { useState } from "react";
 // import firebase auth
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from "../firebase/firebase.init";

const AddQuery = () => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    productName: "",
    productBrand: "",
    productImage: "",
    queryTitle: "",
    reasonDetails: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const queryPayload = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
    };

    const res = await fetch("https://your-server-url/add-query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryPayload),
    });

    const data = await res.json();
    if (data.success) {
      alert("Query Added Successfully!");
      // Reset form or redirect
    } else {
      alert("Failed to add query.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <input
        type="text"
        name="productBrand"
        placeholder="Product Brand"
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <input
        type="text"
        name="productImage"
        placeholder="Product Image URL"
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <input
        type="text"
        name="queryTitle"
        placeholder="Query Title"
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <textarea
        name="reasonDetails"
        placeholder="Boycotting Reason Details"
        onChange={handleChange}
        required
        className="textarea textarea-bordered w-full"
      ></textarea>
      <button type="submit" className="btn btn-primary w-full">
        Add Query
      </button>
    </form>
  );
};

export default AddQuery;
