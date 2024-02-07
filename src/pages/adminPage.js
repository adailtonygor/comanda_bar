import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, Typography, Container } from "@mui/material";

const AdminPage = () => {
  const [statusMesas, setStatusMesas] = useState({
    mesa1: "disponivel",
    mesa2: "disponivel",
  });

  useEffect(() => {
    const savedStatus = localStorage.getItem("statusMesas");
    if (savedStatus) {
      setStatusMesas(JSON.parse(savedStatus));
    }
  }, []);

  const handleMesaClick = (mesa) => {
    const newStatus = { ...statusMesas };
    newStatus[mesa] =
      newStatus[mesa] === "disponivel" ? "ocupada" : "disponivel";
    setStatusMesas(newStatus);
    localStorage.setItem("statusMesas", JSON.stringify(newStatus));
    notifyComandaStatus(mesa, newStatus[mesa]);
  };

  const navigate = useNavigate();

  const notifyComandaStatus = (mesa, status) => {
    window.postMessage({ type: "updateMesaStatus", mesa, status }, "*");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Jantinha da Vovó
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(statusMesas).map((mesa) => (
            <Grid item xs={6} key={mesa}>
              <Button
                onClick={() => {
                  handleMesaClick(mesa);
                  navigate(`/comanda/${mesa}`);
                }}
                variant="contained"
                color={statusMesas[mesa] === "disponivel" ? "success" : "error"}
                fullWidth
              >
                Mesa {mesa.substring(4)}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminPage;
