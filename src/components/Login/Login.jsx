import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        formData
      );

      dispatch(login()); // Dispatch login action
      setFormData({ username: "", password: "" });
      navigate("/game");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            style={{ margin: "2px" }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/register")}
            type="submit"
            fullWidth
            style={{ margin: "2px" }}
            variant="contained"
            color="secondary"
          >
            New User? Regsiter
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
