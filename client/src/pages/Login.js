import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email:"", password:"" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      sessionStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setErr(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="mb-3 text-center">Login</h2>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" onChange={change} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input name="password" type="password" className="form-control" onChange={change} required />
          </div>
          <div className="text-center mb-3">
            <button className="btn btn-success px-5">Login</button>
          </div>
          <div className="text-center">
            <Link to="/forgot">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
