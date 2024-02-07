import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const Bebidas = ({ onPedidoEnviado }) => {
  const [opcoes, setOpcoes] = useState({
    refrigerante: false,
    suco: false,
    agua: false,
    cerveja: false,
  });

  const handleCheckboxChange = (name) => (event) => {
    setOpcoes({ ...opcoes, [name]: event.target.checked });
  };

  const handleSubmit = () => {
    const algumItemEscolhido = Object.values(opcoes).some((opcao) => opcao);

    if (algumItemEscolhido) {
      const payload = {
        categoria: 'bebidas',
        opcoes: { ...opcoes },
      };

      onPedidoEnviado(payload);
    } else {
      console.log('Escolha pelo menos uma bebida antes de enviar o pedido.');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6">Opções de Bebidas</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={opcoes.refrigerante} onChange={handleCheckboxChange('refrigerante')} />}
          label="Refrigerante"
        />
        <FormControlLabel
          control={<Checkbox checked={opcoes.suco} onChange={handleCheckboxChange('suco')} />}
          label="Suco"
        />
        <FormControlLabel
          control={<Checkbox checked={opcoes.agua} onChange={handleCheckboxChange('agua')} />}
          label="Água"
        />
        <FormControlLabel
          control={<Checkbox checked={opcoes.cerveja} onChange={handleCheckboxChange('cerveja')} />}
          label="Cerveja"
        />
      </FormGroup>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" color="success" onClick={handleSubmit} style={{ marginRight: '10px' }}>
          Adicionar Bebidas
        </Button>
      </Box>
    </Paper>
  );
};

export default Bebidas;