import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", password:"", age:"", designation:"" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setErr(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="mb-3 text-center">Register</h2>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={submit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input name="firstName" className="form-control" onChange={change} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input name="lastName" className="form-control" onChange={change} required />
          </div>
          <div className="col-md-12">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" onChange={change} required />
          </div>
          <div className="col-md-12">
            <label className="form-label">Password</label>
            <input name="password" type="password" className="form-control" onChange={change} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Age</label>
            <input name="age" type="number" className="form-control" onChange={change} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Designation</label>
            <input name="designation" className="form-control" onChange={change} />
          </div>
          <div className="col-12 text-center">
            <button className="btn btn-primary px-5">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
