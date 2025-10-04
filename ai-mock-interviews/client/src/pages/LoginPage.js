import React, { useState } from 'react';
import api from '../services/api';

export default function LoginPage({ setUser }) {
  const [isReg, setIsReg] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setErr('');
    try {
      if (isReg) {
        await api.post('/auth/register', form);
        setIsReg(false);
      } else {
        const res = await api.post('/auth/login', { email: form.email, password: form.password });
        setUser(res.data);
      }
    } catch (error) {
      setErr(error.response?.data?.error || 'Error');
    }
  };

  return (
    <div>
      <h2>{isReg ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isReg && (
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        )}
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">{isReg ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsReg(!isReg)} style={{marginTop:'10px'}}>
        {isReg ? "Already have an account? Login" : "New user? Register"}
      </button>
      {err && <div style={{color:'red'}}>{err}</div>}
    </div>
  );
}