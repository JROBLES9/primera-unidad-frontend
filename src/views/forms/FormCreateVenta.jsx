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
    const [detalles, setDetalles] = useState([{ idProducto: '', idLote: '', cantidadProducto: 0, subtotal: 0 }]);
    const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [lotes, setLotes] = useState({});

    const router = useRouter();

    // Establecer la fecha actual
    const fechaActual = new Date().toISOString().split('T')[0];

    useEffect(() => {
        // Fetch clientes y productos
        const fetchData = async () => {
            try {
                const [clientesRes, productosRes] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/cliente/getAll`),
                    axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/producto/all`)
                ]);
                setClientes(clientesRes.data);
                setProductos(productosRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const fetchLotes = async (idProducto) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/lote/byIdProduct/${idProducto}`);
            setLotes((prevLotes) => ({ ...prevLotes, [idProducto]: response.data }));
        } catch (error) {
            console.error('Error fetching lotes:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construir los datos de la venta
        const ventaData = {
            venta: {
                fecha: fechaActual,
                montoTotal: parseFloat(montoTotal.toFixed(2)),
                idCliente: parseInt(idCliente),
                idRrhh: 1 // ID del empleado fijo
            },
            detalles: detalles.map(detalle => ({
                idProducto: parseInt(detalle.idProducto),
                cantidadProducto: parseInt(detalle.cantidadProducto),
                subtotal: parseFloat(detalle.subtotal.toFixed(2))
            }))
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/venta/`, ventaData);

            if (response.status === 200) {
                // Mostrar mensaje de éxito
                setAlert({ show: true, message: 'Venta creada exitosamente', severity: 'success' });

                // Esperar 1.5 segundos antes de redirigir
                setTimeout(() => {
                    router.push('/venta');
                }, 1500);
            }
        } catch (error) {
            console.error('Error al crear la venta:', error);
            // Mostrar mensaje de error
            setAlert({ show: true, message: 'Error al crear la venta', severity: 'error' });
        }
    };

    const handleCancel = () => {
        router.push('/ventas');
    };

    const handleDetalleChange = (index, field, value) => {
        const newDetalles = [...detalles];
        newDetalles[index][field] = value;
        if (field === 'idProducto') {
            fetchLotes(value);
            newDetalles[index].idLote = ''; // Resetear el lote al cambiar de producto
        }
        if (field === 'cantidadProducto' || field === 'idProducto') {
            const producto = productos.find(p => p.idProducto === newDetalles[index].idProducto);
            if (producto) {
                // Calcular subtotal
                newDetalles[index].subtotal = producto.precioVenta * newDetalles[index].cantidadProducto;
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
        setDetalles([...detalles, { idProducto: '', idLote: '', cantidadProducto: 0, subtotal: 0 }]);
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
                            {/* Coloca el bloque de alerta aquí, justo después de abrir el Grid container */}
                            {alert.show && (
                                <Grid item xs={12}>
                                    <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, show: false })}>
                                        {alert.message}
                                    </Alert>
                                </Grid>
                            )}
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
                                        <MenuItem key={cliente.idCliente} value={cliente.idCliente}>{cliente.nombre}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 2 }} color={"primary"}>Detalles de la venta</Typography>
                                {detalles.map((detalle, index) => (
                                    <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                                        <Grid item xs={12} sm={3}>
                                            <Select
                                                fullWidth
                                                value={detalle.idProducto}
                                                onChange={(e) => handleDetalleChange(index, 'idProducto', e.target.value)}
                                                displayEmpty
                                                variant="outlined"
                                            >
                                                <MenuItem value="" disabled>Seleccione un producto</MenuItem>
                                                {productos.map((producto) => (
                                                    <MenuItem key={producto.idProducto} value={producto.idProducto}>{producto.nombre}</MenuItem>
                                                ))}
                                            </Select>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Select
                                                fullWidth
                                                value={detalle.idLote}
                                                onChange={(e) => handleDetalleChange(index, 'idLote', e.target.value)}
                                                displayEmpty
                                                variant="outlined"
                                                disabled={!detalle.idProducto}
                                            >
                                                <MenuItem value="" disabled>Seleccione un lote</MenuItem>
                                                {lotes[detalle.idProducto]?.map((lote) => (
                                                    <MenuItem key={lote.idLote} value={lote.idLote}>
                                                        {`Lote: ${lote.idLote} (V ${lote.fechaCaducidad}) (Disp. ${lote.cantidadDisponible})`}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
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
                                <Typography variant="h6" color={"primary"}>Total: Q. {montoTotal.toFixed(2)}</Typography>
                            </Grid>
                            {alert.show && (
                                <Grid item xs={12}>
                                    <Alert severity={alert.severity}>{alert.message}</Alert>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                    Guardar Venta
                                </Button>
                                <Button variant="outlined" onClick={handleCancel} fullWidth sx={{ mt: 1 }}>
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default NuevaVentaForm;
