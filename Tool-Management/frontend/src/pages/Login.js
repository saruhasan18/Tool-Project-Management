import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../index.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);

      // Get stored user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        message.error("No user found. Please register first.");
        return;
      }

      // Validate user credentials
      if (storedUser.email === values.email && storedUser.password === values.password) {
        message.success("Login successful");
        navigate("/");
      } else {
        message.error("Invalid email or password");
      }
    }, 1000);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-page">
      <h1 className="page-heading">Spend Sync</h1>
      {loading && <Spinner />}
      <Form layout="vertical" onFinish={submitHandler} className="login-form">
        <h1>Login Form</h1>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
          <Input type="password" />
        </Form.Item>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        <Link to="/register" className="link">
          Not a User? Click here to register
        </Link>
      </Form>
    </div>
  );
};

export default Login;
