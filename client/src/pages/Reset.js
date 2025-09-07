import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function Reset() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post(`/auth/reset/${token}`, { password });
      setMsg(res.data.message);
      navigate("/login");
    } catch {
      setMsg("Reset failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="mb-3 text-center">Reset Password</h2>
        {msg && <div className="alert alert-info">{msg}</div>}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <div className="text-center">
            <button className="btn btn-primary px-5">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}
