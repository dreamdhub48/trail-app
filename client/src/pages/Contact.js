import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editId, setEditId] = useState(null);

  // Fetch contacts
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    api.get("/contacts").then(res => setContacts(res.data));
  };

  // ✅ Handle form submit (Create / Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      api.put(`/contacts/${editId}`, form).then(() => {
        fetchContacts();
        setForm({ name: "", email: "", phone: "" });
        setEditId(null);
      });
    } else {
      api.post("/contacts", form).then(() => {
        fetchContacts();
        setForm({ name: "", email: "", phone: "" });
      });
    }
  };

  // ✅ Handle delete
  const handleDelete = (id) => {
    api.delete(`/contacts/${id}`).then(() => fetchContacts());
  };

  // ✅ Handle edit
  const handleEdit = (contact) => {
    setForm(contact);
    setEditId(contact._id);
  };

  return (
    <div className="container mt-5">
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-primary">
          {editId ? "Update" : "Save"}
        </button>
      </form>

      <h3>Saved Contacts</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Delete</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c._id}>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c._id)}>X</button>
              </td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(c)}>✏️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
