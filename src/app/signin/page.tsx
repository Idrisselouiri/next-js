"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Signin = () => {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonIsDisable, setButtonIsDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
      }
      if (res.ok) {
        setError(null);
        setLoading(false);
        Router.push("/login");
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      formData.username.length > 0 &&
      formData.email.length > 0 &&
      formData.password.length > 0
    ) {
      setButtonIsDisable(false);
    } else {
      setButtonIsDisable(true);
    }
  }, [formData]);
  return (
    <div>
      <form onSubmit={handleSubmit} className="border p-5 my-10 mx-auto w-fit">
        <div className="flex flex-col">
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
            className="p-2 border outline-none w-fit"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="text"
            placeholder="email"
            onChange={handleChange}
            className="p-2 border outline-none w-fit"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="text"
            placeholder="password"
            onChange={handleChange}
            className="p-2 border outline-none w-fit"
          />
        </div>
        <button
          className="w-full p-2 bg-slate-500 text-white m-2"
          type="submit"
          disabled={buttonIsDisable || loading}
        >
          {loading ? "Loading" : "Sign In"}
        </button>
        {error && <p className="text-red-500 my-2">{error}</p>}
      </form>
    </div>
  );
};

export default Signin;
