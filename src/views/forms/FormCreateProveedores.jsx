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

const FormLayoutsWithIcon = ({ idProveedor, nombre: initialNombre, direccion: initialDireccion,
    telefono: initialTelefono, descripcion: initialDescripcion, estadoActivo: initialEstadoActivo
}) => {
    const [nombre, setNombre] = useState(initialNombre || '');
    const [direccion, setDireccion] = useState(initialDireccion || '');
    const [telefono, setTelefono] = useState(initialTelefono || '');
    const [descripcion, setDescripcion] = useState(initialDescripcion || '');
    const estadoActivo = true;
    const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/proveedor/`, {
                nombre,
                direccion,
                telefono,
                descripcion,
                estadoActivo
            });

            if (response.status === 200) {
                setAlert({ show: true, message: 'Registro Exitoso', severity: 'success' });
                setTimeout(() => {
                    setAlert({ show: false, message: '', severity: 'success' });
                    router.push('/proveedoresF');
                }, 1500);
            }
        } catch (error) {
            console.error('Error al registrar al proveedor:', error);
            setAlert({ show: true, message: 'Error al registrar al proveedor', severity: 'error' });
            setTimeout(() => {
                setAlert({ show: false, message: '', severity: 'error' });
            }, 2000);
        }
    };

    const handleCancel = () => {
        router.push('/proveedores');  // Redirigir a la página de proveedores o cualquier otra página
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
                        REGISTRAR PROVEEDORES
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
                                label='Direccion'
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
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
                                label='Telefono'
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
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
                                label='Descripcion'
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
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
