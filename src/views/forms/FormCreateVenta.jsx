import React, { useState, useEffect } from 'react';
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useRouter } from 'next/navigation';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6d09c5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

const NuevaVentaForm = () => {
    const [montoTotal, setMontoTotal] = useState(0);
    const [idCliente, setIdCliente] = useState('');
    const [detalles, setDetalles] = useState([{ idProducto: '', cantidadProducto: 0, subtotal: 0 }]);
    const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);

    const router = useRouter();

    // Establecer la fecha actual
    const fechaActual = new Date().toISOString().split('T')[0];

    useEffect(() => {
        // Fetch clientes y productos
        const fetchData = async () => {
            try {
                const [clientesRes, productosRes] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/clientes`),
                    axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/productos`)
                ]);
                setClientes(clientesRes.data);
                setProductos(productosRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/ventas`, {
                venta: {
                    fecha: fechaActual,
                    montoTotal,
                    idCliente,
                    idRrhh: 1 // ID del empleado fijo
                },
                detalles
            });

            if (response.status === 201) {
                setAlert({ show: true, message: 'Venta creada exitosamente', severity: 'success' });
                setTimeout(() => {
                    setAlert({ show: false, message: '', severity: 'success' });
                    router.push('/ventas');
                }, 1500);
            }
        } catch (error) {
            console.error('Error al crear la venta:', error);
            setAlert({ show: true, message: 'Error al crear la venta', severity: 'error' });
            setTimeout(() => {
                setAlert({ show: false, message: '', severity: 'error' });
            }, 2000);
        }
    };

    const handleCancel = () => {
        router.push('/ventas');
    };

    const handleDetalleChange = (index, field, value) => {
        const newDetalles = [...detalles];
        newDetalles[index][field] = value;
        if (field === 'cantidadProducto' || field === 'idProducto') {
            const producto = productos.find(p => p.id === newDetalles[index].idProducto);
            if (producto) {
                newDetalles[index].subtotal = producto.precio * newDetalles[index].cantidadProducto;
            }
        }
        setDetalles(newDetalles);
        calcularMontoTotal(newDetalles);
    };

    const calcularMontoTotal = (detalles) => {
        const total = detalles.reduce((sum, detalle) => sum + detalle.subtotal, 0);
        setMontoTotal(total);
    };

    const agregarDetalle = () => {
        setDetalles([...detalles, { idProducto: '', cantidadProducto: 0, subtotal: 0 }]);
    };

    const eliminarDetalle = (index) => {
        const newDetalles = detalles.filter((_, i) => i !== index);
        setDetalles(newDetalles);
        calcularMontoTotal(newDetalles);
    };

    return (
        <ThemeProvider theme={theme}>
            <Card elevation={3} sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
                <CardHeader
                    title={
                        <Typography variant="h4" sx={{ color: 'rgb(109, 9, 197)', fontWeight: 'bold', textAlign: 'center' }}>
                            NUEVA VENTA
                        </Typography>
                    }
                />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Fecha"
                                    value={fechaActual}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    fullWidth
                                    value={idCliente}
                                    onChange={(e) => setIdCliente(e.target.value)}
                                    displayEmpty
                                    label="Cliente"
                                    variant="outlined"
                                >
                                    <MenuItem value="" disabled>Seleccione un cliente</MenuItem>
                                    {clientes.map((cliente) => (
                                        <MenuItem key={cliente.id} value={cliente.id}>{cliente.nombre}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 2 }} color={"primary"}>Detalles de la venta</Typography>
                                {detalles.map((detalle, index) => (
                                    <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                                        <Grid item xs={12} sm={5}>
                                            <Select
                                                fullWidth
                                                value={detalle.idProducto}
                                                onChange={(e) => handleDetalleChange(index, 'idProducto', e.target.value)}
                                                displayEmpty
                                                variant="outlined"
                                            >
                                                <MenuItem value="" disabled>Seleccione un producto</MenuItem>
                                                {productos.map((producto) => (
                                                    <MenuItem key={producto.id} value={producto.id}>{producto.nombre}</MenuItem>
                                                ))}
                                            </Select>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                label="Cantidad"
                                                value={detalle.cantidadProducto}
                                                onChange={(e) => handleDetalleChange(index, 'cantidadProducto', parseInt(e.target.value))}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                label="Subtotal"
                                                value={detalle.subtotal}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={1}>
                                            <Button
                                                onClick={() => eliminarDetalle(index)}
                                                color="error"
                                                variant="contained"
                                                sx={{ minWidth: '40px', height: '100%' }}
                                            >
                                                <i className='ri-delete-bin-5-line' />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                ))}
                                <Button variant="outlined" onClick={agregarDetalle} sx={{ mt: 2 }}>
                                    <i className='ri-add-circle-line' />
                                    Agregar Producto
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Monto Total"
                                    value={montoTotal}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                <Button variant='contained' type='submit' color="primary" sx={{ minWidth: 120 }}>
                                    <i className='ri-save-line' />
                                    Guardar
                                </Button>
                                <Button variant='contained' color='secondary' onClick={handleCancel} sx={{ minWidth: 120 }}>
                                    <i className='ri-close-circle-line' />
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
                {alert.show && (
                    <Alert severity={alert.severity} sx={{ mb: 2 }} onClose={() => setAlert({ ...alert, show: false })}>
                        {alert.message}
                    </Alert>
                )}
            </Card>
        </ThemeProvider>
    );
}

export default NuevaVentaForm;
