// src/Veiculos.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import API_URL from '../config';

const Veiculo = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [novoVeiculo, setNovoVeiculo] = useState({ marca: '', modelo: '', ano: '', preco: '' });
  const [atualizarVeiculo, setAtualizarVeiculo] = useState(null);

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    const response = await axios.get(API_URL);
    setVeiculos(response.data);
  };

  const handleAddVeiculo = async (e) => {
    e.preventDefault();
    if (atualizarVeiculo) {
      await axios.put(`${API_URL}/${atualizarVeiculo.id}`, novoVeiculo);
    } else {
      await axios.post(API_URL, { ...novoVeiculo, id: Date.now() });
    }
    setNovoVeiculo({ marca: '', modelo: '', ano: '', preco: '' });
    setAtualizarVeiculo(null);
    fetchVeiculos();
  };

  const handleEditVeiculo = (veiculo) => {
    setNovoVeiculo(veiculo);
    setAtualizarVeiculo(veiculo);
  };

  const handleDeleteVeiculo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchVeiculos();
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
        <Typography variant="h4" gutterBottom>
          Veículos
        </Typography>
        <form onSubmit={handleAddVeiculo}>
          <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2} width="100%">
            <TextField
              label="Marca"
              value={novoVeiculo.marca}
              onChange={(e) => setNovoVeiculo({ ...novoVeiculo, marca: e.target.value })}
              required
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              label="Modelo"
              value={novoVeiculo.modelo}
              onChange={(e) => setNovoVeiculo({ ...novoVeiculo, modelo: e.target.value })}
              required
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              label="Ano"
              value={novoVeiculo.ano}
              onChange={(e) => setNovoVeiculo({ ...novoVeiculo, ano: e.target.value })}
              required
              variant="outlined"
              margin="normal"
              type="number"
              fullWidth
            />
            <TextField
              label="Preço"
              value={novoVeiculo.preco}
              onChange={(e) => setNovoVeiculo({ ...novoVeiculo, preco: e.target.value })}
              required
              variant="outlined"
              margin="normal"
              type="number"
              fullWidth
            />
          </Box>
          <Button variant="contained" color="primary" type="submit">
            {atualizarVeiculo ? 'Atualizar' : 'Adicionar'}
          </Button>
        </form>
        <List sx={{ width: '100%', marginTop: 2 }}>
          {veiculos.map((veiculo) => (
            <ListItem key={veiculo.id} sx={{ justifyContent: 'space-between' }}>
              <ListItemText
                primary={`${veiculo.marca} ${veiculo.modelo} (${veiculo.ano}) - R$${veiculo.preco}`}
              />
              <Box>
                <IconButton edge="end" onClick={() => handleEditVeiculo(veiculo)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDeleteVeiculo(veiculo.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Veiculo;
