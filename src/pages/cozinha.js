import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  Box,
  Snackbar,
} from "@mui/material";

const CozinhaPage = () => {
  const { mesa } = useParams();
  const [pedidos, setPedidos] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePedidoPronto = () => {
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "pedidoEnviado" && event.data.mesa === mesa) {
        const novoPedido = event.data.pedido;
        setPedidos((prevPedidos) => [...prevPedidos, novoPedido]);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [mesa]);

  const renderizarOpcoes = (opcoes) => {
    return Object.keys(opcoes).map((opcao) => (
      <div
        key={opcao}
        style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
      >
        <Checkbox
          checked={opcoes[opcao]}
          disabled
          checkedIcon={<span style={{ color: "green" }}>✅</span>}
        />
        <Typography variant="body1" style={{ marginLeft: "5px" }}>
          {opcao}
        </Typography>
      </div>
    ));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Cozinha - {mesa}
        </Typography>
        <List>
          {pedidos.map((pedido, index) => (
            <ListItem key={index} style={{ marginBottom: "10px" }}>
              <ListItemText
                primary={`Pedido ${index + 1}`}
                secondary={
                  <>
                    <Typography variant="body1">Opções:</Typography>
                    {renderizarOpcoes(pedido.jantinhaOpcoes)}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="success"
            onClick={handlePedidoPronto}
            style={{ marginRight: "10px" }}
          >
            Pedido Pronto
          </Button>
          <Button variant="contained" color="primary" onClick={handleGoBack}>
            Voltar
          </Button>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message="Pedido pronto! Redirecionando para a página principal..."
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Paper>
    </Container>
  );
};

export default CozinhaPage;
