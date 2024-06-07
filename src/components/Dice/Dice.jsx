import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import "./Dice.css"; // Import the CSS file

function RollingDice({ diceValue }) {
  const [diceValues, setDiceValues] = useState([6, 1]);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    setIsRolling(true);
    setTimeout(() => {
      setDiceValues(diceValue);
      setIsRolling(false);
    }, 1000);
  }, [diceValue]);

  return (
    <Box className="diceContainer">
      <Grid container justifyContent="center" spacing={2}>
        {diceValues.map((value, index) => (
          <Grid item key={index}>
            <Box className={`dice face${value} ${isRolling ? "rolling" : ""}`}>
              {[...Array(value)].map((_, i) => (
                <span key={i} className="dot"></span>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RollingDice;
