import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    api.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUser(res.data))
      .catch(() => navigate("/dashboard"));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 text-center">
        <h2>Welcome, {user.firstName} {user.lastName}!</h2>
        <p className="text-muted">{user.designation || "User"} | Age: {user.age || "N/A"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        <h1>hello</h1>
      </div>
    </div>
  );
}
 