import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    role: "mentor",
    interest: "",
    work: "",
    company: "",
    experience: "",
  });

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        phone: credentials.phone,
        role: credentials.role,
        interest: credentials.interest,
        work: credentials.work,  
        company: credentials.company,
        experience: credentials.experience,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save tha uth and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert('Account Created Succesfully', 'success')
    } else {
      props.showAlert('Invalid Details', 'danger')
    }
  };
  return (
    <div className="container mt-3">
      <h2 className="my-3" >Create an account to use to Cloud notebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={credentials.name}
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={credentials.email}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={credentials.password}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            name="phone"
            id="phone"
            value={credentials.phone}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="interest" className="form-label">
            Interest
          </label>
          <input
            type="text"
            className="form-control"
            name="interest"
            id="interest"
            value={credentials.interest}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="work" className="form-label">
            Work
          </label>
          <input
            type="text"
            className="form-control"
            name="work"
            id="work"
            value={credentials.work}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            type="text"
            className="form-control"
            name="company"
            id="company"
            value={credentials.company}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="experience" className="form-label">
            Years of Experience
          </label>
          <input
            type="number"
            className="form-control"
            name="experience"
            id="experience"
            value={credentials.experience}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
