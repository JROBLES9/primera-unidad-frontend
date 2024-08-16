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

import { useRouter } from 'next/navigation';

const FormLayoutsWithIcon = ({ idLote, categoria: initialCategoria, cantidadInicial: initialCantidadInicial, cantidadDisponible: initialCantidadDisponible, setFechaCaducidad: initialFechaCaducidad, fechaIngreso: initialFechaIngreso, idPedido: initialIdPedido, idProducto: initialIdProdcuto }) => {
    const [categoria, setCategoria] = useState(initialCategoria || '');
    const [cantidadInicial, setCantidadInicial] = useState(initialCantidadInicial || '');
    const [cantidadDisponible, setCantidadDisponible] = useState(initialCantidadDisponible || '');
    const [fechaCaducidad, setFechaCaducidad] = useState(initialFechaCaducidad || '');
    const [fechaIngreso, setFechaIngreso] = useState(initialFechaIngreso || '');
    const [idPedido, setIdPedido] = useState(initialIdPedido || '');
    const [idProducto, setIdProducto] = useState(initialIdProdcuto || 1);
    const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
    const router = useRouter();

    const [date, setDate] = useState(new Date())
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/lote/`, {
                categoria,
                cantidadInicial,
                cantidadDisponible,
                fechaCaducidad,
                fechaIngreso,
                idPedido,
                idProducto
            });

            if (response.status === 200) {
                setAlert({ show: true, message: 'Registro Exitoso', severity: 'success' });
                setTimeout(() => {
                    setAlert({ show: false, message: '', severity: 'success' });
                    router.push('/lotes');
                }, 1500);
            }
        } catch (error) {
            console.error('Error al registrar al lote:', error);
            setAlert({ show: true, message: 'Error al registrar al lote', severity: 'error' });
            setTimeout(() => {
                setAlert({ show: false, message: '', severity: 'error' });
            }, 2000);
        }
    };

    const handleCancel = () => {
        router.push('/lotes');  // Redirigir a la página de proveedores o cualquier otra página
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
                        REGISTRAR LOTES
                    </Typography>
                }
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Categoria'
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <i className='ri-user-3-line' />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='CantidadInicial'
                                value={cantidadInicial}
                                onChange={(e) => setCantidadInicial(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <i className='ri-direction-line' />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='CantidadDisponible'
                                value={cantidadDisponible}
                                onChange={(e) => setCantidadDisponible(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <i className='ri-phone-line' />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='fechaCaducidad'
                                value={fechaCaducidad}
                                onChange={(e) => setFechaCaducidad(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <i className='ri-phone-line' />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='fechaIngreso'
                                value={fechaIngreso}
                                onChange={(e) => setFechaIngreso(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <i className='ri-phone-line' />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='idPedido'
                                value={idPedido}
                                onChange={(e) => setIdPedido(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <i className='ri-file-text-line' />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='idProducto'
                                value={idProducto}
                                onChange={(e) => setIdProducto(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <i className='ri-file-text-line' />
                                        </InputAdornment>
                                    )
                                }}
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
