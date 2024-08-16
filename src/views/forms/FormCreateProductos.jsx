import React, { useState } from 'react';
import axios from 'axios';

// MUI
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { useRouter } from 'next/navigation';

const FormLayoutsWithIcon = ({ idProducto, nombre: initialNombre, precioVenta: initialPrecioVenta, descripcion: initialDescripcion, esPerecedero: initialEsPerecedero }) => {
    const [nombre, setNombre] = useState(initialNombre || '');
    const [precioVenta, setPrecioVenta] = useState(initialPrecioVenta || '');
    const [descripcion, setDescripcion] = useState(initialDescripcion || '');
    const [esPerecedero, setEsPerecedero] = useState(initialEsPerecedero || '');
    const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            nombre,
            precioVenta,
            descripcion,
            esPerecedero
        };

        try {
            console.log('Enviando datos:', data);  // Log de los datos que se están enviando
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/producto/`, data);

            console.log('Respuesta del servidor:', response);  // Log de la respuesta del servidor

            if (response.status === 200) {
                setAlert({ show: true, message: 'Registro Exitoso', severity: 'success' });
                setTimeout(() => {
                    setAlert({ show: false, message: '', severity: 'success' });
                    router.push('/productos');
                }, 1500);
            }
        } catch (error) {
            console.error('Error al registrar el producto:', error);
            console.log('Detalles del error:', error.response ? error.response.data : error.message);  // Log de los detalles del error
            setAlert({ show: true, message: 'Error al registrar el producto', severity: 'error' });
            setTimeout(() => {
                setAlert({ show: false, message: '', severity: 'error' });
            }, 2000);
        }
    };

    const handleCancel = () => {
        router.push('/productos');  // Redirigir a la página de productos o cualquier otra página
    };

    return (
        <Card>
            <CardHeader
                title={
                    <Typography
                        variant="h5"
                        sx={{
                            color: 'rgb(109, 9, 197)',
                            fontWeight: 'bold',
                            fontSize: '2rem',
                            textAlign: 'center',
                        }}
                    >
                        REGISTRAR PRODUCTO
                    </Typography>
                }
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Nombre'
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Precio de Venta'
                                value={precioVenta}
                                onChange={(e) => setPrecioVenta(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Descripcion'
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} align={'start'}>
                            <label htmlFor="s">TIPO</label>
                            <br />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={esPerecedero === 1}
                                        onChange={(e) => setEsPerecedero(e.target.checked ? 1 : 0)}
                                        color="success"
                                        size='medium'
                                    />
                                }
                                label={esPerecedero == true ? 'Perecedero' : 'No perecedero'}
                            />
                        </Grid>
                        <Grid item xs={12} align={'center'}>
                            <Button variant='contained' type='submit' sx={{ mr: 2 }}>
                                <i className='ri-user-add-line' />
                                Guardar
                            </Button>
                            <Button variant='contained' color='secondary' onClick={handleCancel}>
                                <i className='ri-picture-in-picture-exit-line' />
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
            {alert.show && (
                <Alert
                    severity={alert.severity}
                    sx={{ mb: 2 }}
                    onClose={() => setAlert({ ...alert, show: false })}
                >
                    {alert.message}
                </Alert>
            )}
        </Card>
    );
}

export default FormLayoutsWithIcon;
