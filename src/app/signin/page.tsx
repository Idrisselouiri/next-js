"use client";

import Link from "next/link";
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
      <form
        onSubmit={handleSubmit}
        className="border flex flex-col p-10 my-10 mx-auto bg-slate-100 w-fit border-2 border-slate-300"
      >
        <h1 className="text-center text-[20px] font-medium p-2">
          Sign In as User{" "}
        </h1>
        <div className="flex flex-col text-[18px]  my-2">
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
            className="p-2 border-2 border-slate-300 focus:border-blue-600 outline-none w-[300px]"
          />
        </div>
        <div className="flex flex-col text-[18px]  my-2">
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="text"
            placeholder="example@gmail.com"
            onChange={handleChange}
            className="p-2  border-2 border-slate-300 focus:border-blue-600 outline-none w-[300px]"
          />
        </div>
        <div className="flex flex-col text-[18px]  my-2">
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="text"
            placeholder="password"
            onChange={handleChange}
            className="p-2  border-2 border-slate-300 focus:border-blue-600 outline-none w-[300px]"
          />
        </div>
        <button
          className=" bg-blue-600 text-white py-2 my-2 text-[18px] w-[300px]"
          type="submit"
          disabled={buttonIsDisable || loading}
        >
          {loading ? "Loading" : "Sign In"}
        </button>
        {error && <p className="text-red-500 my-2">{error}</p>}
        <Link className="text-blue-600 font-medium my-1" href={"/login"}>
          I Have An Account?
        </Link>
      </form>
    </div>
  );
};

export default Signin;
