import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Typography,
  Container,
  Box,
} from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

const Comanda = () => {
  const { mesa } = useParams();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [jantinhaOpcoes, setJantinhaOpcoes] = useState({
    entrega: false,
    comerNoLocal: false,
    arroz: false,
    feijao: false,
    mandioca: false,
    vinagrete: false,
    porcaoVinagrete: false,
    porcaoArroz: false,
    porcaoFeijao: false,
    porcaoMandioca: false,
  });

  const [mesaStatus, setMesaStatus] = useState("disponivel");

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "updateMesaStatus" && event.data.mesa === mesa) {
        setMesaStatus(event.data.status);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [mesa]);

  const handleCheckboxChange = (name) => (event) => {
    setJantinhaOpcoes({ ...jantinhaOpcoes, [name]: event.target.checked });
  };

  const renderSnackbarContent = () => (
    <SnackbarContent
      message="Escolha pelo menos um item antes de enviar o pedido."
      style={{ backgroundColor: "red" }}
    />
  );
  const handleSubmit = () => {
    const algumItemEscolhido = Object.values(jantinhaOpcoes).some(
      (opcao) => opcao
    );

    if (algumItemEscolhido) {
      const payload = {
        mesa: mesa,
        jantinhaOpcoes: { ...jantinhaOpcoes },
      };
      navigate(`/cozinha/${mesa}`);
      console.log("Pedido enviado:", payload);
      window.parent.postMessage(
        { type: "pedidoEnviado", mesa, pedido: payload },
        "*"
      );
    } else {
      setSnackbarOpen(true);
    }

    console.log("Status da mesa:", mesaStatus);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Comanda {mesa}
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jantinhaOpcoes.entrega}
                      onChange={handleCheckboxChange("entrega")}
                    />
                  }
                  label="Entrega"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jantinhaOpcoes.comerNoLocal}
                      onChange={handleCheckboxChange("comerNoLocal")}
                    />
                  }
                  label="Comer no Local"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Opções da Jantinha</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jantinhaOpcoes.arroz}
                      onChange={handleCheckboxChange("arroz")}
                    />
                  }
                  label="Com Arroz"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jantinhaOpcoes.feijao}
                      onChange={handleCheckboxChange("feijao")}
                    />
                  }
                  label="Com Feijão"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jantinhaOpcoes.mandioca}
                      onChange={handleCheckboxChange("mandioca")}
                    />
                  }
                  label="Com Mandioca"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jantinhaOpcoes.vinagrete}
                      onChange={handleCheckboxChange("vinagrete")}
                    />
                  }
                  label="Com Vinagrete"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              style={{ marginRight: "10px" }}
            >
              Enviar Pedido
            </Button>
            <Button variant="contained" color="primary" onClick={handleGoBack}>
              Voltar
            </Button>
          </Box>
        </form>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      >
        {renderSnackbarContent()}
      </Snackbar>
    </Container>
  );
};

export default Comanda;
