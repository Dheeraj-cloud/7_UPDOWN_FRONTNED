import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResult, updatePoints } from "../../slices/gameSlice";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import DiceComponent from "../Dice/Dice";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

const Game = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const points = useSelector((state) => state.game.points);
  const [betAmount, setBetAmount] = useState(100);
  const [option, setOption] = useState("7 Down");
  const [diceValues, SetDiceValues] = useState([1, 6]);

  const rollDice = async () => {
    try {
      const response = await axiosInstance.post("/roll-dice");
      const result = response.data;
      const newDiceValues = [result.dice1, result.dice2];
      SetDiceValues(newDiceValues);
      dispatch(setResult(result));

      const checkWinResponse = await axiosInstance.post("/update-points", {
        bet: betAmount,
        option: option,
        result: result,
      });
      dispatch(updatePoints(checkWinResponse.data.points));
    } catch (error) {
      console.error("Error rolling dice:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          7 Up 7 Down Game
        </Typography>
        <DiceComponent diceValue={diceValues} />
        <Typography variant="h6" gutterBottom>
          Points: {points}
        </Typography>
        <FormControl style={{ marginBottom: "5px", width: "200px" }}>
          <InputLabel>Bet Amount</InputLabel>
          <Select
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
          >
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={200}>200</MenuItem>
            <MenuItem value={500}>500</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ marginBottom: "5px", width: "200px" }}>
          <InputLabel>Option</InputLabel>
          <Select value={option} onChange={(e) => setOption(e.target.value)}>
            <MenuItem value="7 Down">7 Down</MenuItem>
            <MenuItem value="7 Up">7 Up</MenuItem>
            <MenuItem value="Lucky 7">Lucky 7</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ marginBottom: "50px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={rollDice}
          style={{ margin: "4px" }}
        >
          Roll Dice
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          style={{ margin: "4px" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Game;
