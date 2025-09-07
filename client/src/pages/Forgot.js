import React, { useState } from "react";
import api from "../services/api";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/forgot", { email });
      setMsg(res.data.message);
    } catch {
      setMsg("Error sending reset link");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="mb-3 text-center">Forgot Password</h2>
        {msg && <div className="alert alert-info">{msg}</div>}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="text-center">
            <button className="btn btn-warning px-5">Send Reset Link</button>
          </div>
        </form>
      </div>
    </div>
  );
}
