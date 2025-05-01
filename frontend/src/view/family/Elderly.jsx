import React, { useEffect, useState } from 'react';
import Layout from './layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  CircularProgress,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BASE_URL = "http://localhost:3001";

function Elderly() {
  const { user } = useSelector((s) => s.auth);
  const [elderlyList, setElderlyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    createdBy: user._id
  });

  const token = localStorage.getItem('token');
  const familyId = user._id;

  const fetchElderly = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/elder/family/${familyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setElderlyList(data);
    } catch (err) {
      toast.error('Failed to fetch elderly');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElderly();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { data } = await axios.put(`${BASE_URL}/api/elder/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Elderly updated');
        setElderlyList((prev) => prev.map((el) => (el._id === editingId ? data : el)));
      } else {
        const { data } = await axios.post(`${BASE_URL}/api/elder`, {
          ...formData,
          createdBy: familyId,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Elderly added');
        setElderlyList((prev) => [...prev, data]);
      }

      setFormData({ name: '', email: '', phone: '', address: '' });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error submitting');
    }
  };

  const handleEdit = (elderly) => {
    setFormData({
      name: elderly.name,
      email: elderly.email,
      phone: elderly.phone,
      address: elderly.address,
    });
    setEditingId(elderly._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/elder/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Elderly deleted');
      setElderlyList((prev) => prev.filter((el) => el._id !== id));
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold" color="primary">Manage Elderly</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setShowForm(!showForm);
              setFormData({ name: '', email: '', phone: '', address: '' });
              setEditingId(null);
            }}
          >
            {showForm ? 'Close Form' : 'Add Elderly'}
          </Button>
        </Box>

        {showForm && (
          <Box component="form" onSubmit={handleSubmit} mb={4}>
            <Grid container spacing={2}>
              <Grid fullWidth item xs={16}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required={!editingId}
                  disabled={!!editingId}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="success" fullWidth>
                  {editingId ? 'Update' : 'Create'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : elderlyList.length === 0 ? (
          <Typography>No elderly profiles found.</Typography>
        ) : (
          <Grid container spacing={2}>
            {elderlyList.map((el) => (
              <Grid item xs={12} key={el._id}>
                <Paper elevation={2} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">{el.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{el.email}</Typography>
                    <Typography variant="body2">📞 {el.phone}</Typography>
                    <Typography variant="body2">📍 {el.address}</Typography>
                  </Box>
                  <Box>
                    <IconButton color="warning" onClick={() => handleEdit(el)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(el._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
}

export default Layout(Elderly);
