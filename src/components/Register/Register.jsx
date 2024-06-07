// Register.jsx
import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // Move useNavigate hook outside handleSubmit

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://seven-updown-backend-1.onrender.com/api/user/register",
        formData
      );
      console.log(response.data); // Assuming server responds with a success message
      setFormData({ username: "", password: "" });
      navigate("/"); // Use navigate function to navigate to home page
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Register</Typography>
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            Register
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;
