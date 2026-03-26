import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Recommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const socket = io("http://localhost:5000");

  const fetchRecommendations = async () => {
    const res = await fetch(`http://localhost:5000/api/products/recommendations/${userId}`);
    const data = await res.json();
    setRecommendations(data);
  };

  useEffect(() => {
    fetchRecommendations();

    // Listen for real-time updates
    socket.on("updateRecommendations", (data) => {
      if (data.userId === userId) fetchRecommendations();
    });

    return () => socket.disconnect();
  }, [userId]);

  return (
    <div>
      <h2>Recommended Products</h2>
      <ul>
        {recommendations.map((p) => (
          <li key={p._id}>
            {p.name} - {p.category} - ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;