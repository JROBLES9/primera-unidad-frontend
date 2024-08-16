import React, { useState } from 'react';
import axios from 'axios';

// MUI
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


import { useRouter } from 'next/navigation';

const FormLayoutsWithIcon = ({ idLote, categoria: initialCategoria, cantidadInicial: initialCantidadInicial, cantidadDisponible: initialCantidadDisponible, fechaCaducidad: initialFechaCaducidad, fechaIngreso: initialFechaIngreso, idPedido: initialIdPedido, idProducto: initialIdProdcuto, estadoActivo: initialEstadoActivo }) => {
    const [categoria, setCategoria] = useState(initialCategoria || '');
    const [cantidadInicial, setCantidadInicial] = useState(initialCantidadInicial || '');
    const [cantidadDisponible, setCantidadDisponible] = useState(initialCantidadDisponible || '');
    const [fechaCaducidad, setFechaCaducidad] = useState(initialFechaCaducidad || '');
    const [fechaIngreso, setFechaIngreso] = useState(initialFechaIngreso || '');
    const [estadoActivo, setEstadoActivo] = useState(initialEstadoActivo);
    const [idPedido, setIdPedido] = useState(initialIdPedido || '');
    const [idProducto, setIdProducto] = useState(initialIdProdcuto || '');
    const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            categoria,
            cantidadInicial,
            cantidadDisponible,
            fechaCaducidad,
            fechaIngreso,
            estadoActivo: String(estadoActivo), // Convertir estadoActivo a string
            idPedido,
            idProducto
        };

        console.log('Data being sent:', dataToSend);

        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/lote/${idLote}`, dataToSend);
            console.log('response:', response);
            if (response.status === 200) {
                setAlert({ show: true, message: 'Actualización Exitosa', severity: 'success' });
                setTimeout(() => {
                    setAlert({ show: false, message: '', severity: 'success' });
                    router.push('/lotes');
                }, 1500);
            }
        } catch (error) {
            console.error('Error al actualizar al lote:', error);
            setAlert({ show: true, message: 'Error al actualizar al lote', severity: 'error' });
            setTimeout(() => {
                setAlert({ show: false, message: '', severity: 'error' });
            }, 2000);
        }
    };

    const handleCancel = () => {
        router.push('/lotes');  // Redirigir a la página de lote o cualquier otra página
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
                        EDITAR LOTE
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
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Cantidad Inicial'
                                value={cantidadInicial}
                                onChange={(e) => setCantidadInicial(e.target.value)}
                                InputProps={{
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Cantidad Disponible'
                                value={cantidadDisponible}
                                onChange={(e) => setCantidadDisponible(e.target.value)}
                                InputProps={{
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Fecha de Caducidad'
                                value={fechaCaducidad}
                                onChange={(e) => setFechaCaducidad(e.target.value)}
                                InputProps={{
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Fecha de Ingreso'
                                value={fechaIngreso}
                                onChange={(e) => setFechaIngreso(e.target.value)}
                                InputProps={{
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} align={'start'}>
                            <label htmlFor="s">ESTADO</label>
                            <br />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={estadoActivo === 1}
                                        onChange={(e) => setEstadoActivo(e.target.checked ? 1 : 0)}
                                        color="success"
                                        size='medium'
                                    />
                                }
                                label={estadoActivo == true ? 'Activo' : 'Inactivo'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Id del Pedido'
                                value={idPedido}
                                onChange={(e) => setIdPedido(e.target.value)}
                                InputProps={{
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Id del Producto'
                                value={idProducto}
                                onChange={(e) => setIdProducto(e.target.value)}
                                InputProps={{
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} align={'center'} >
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
