import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import axios from 'axios'

// MUI
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

const FormLayoutsWithIcon = ({
  idProveedor,
  nombre: initialNombre,
  telefono: initialTelefono,
  direccion: initialDireccion,
  descripcion: initialDescripcion,
  estadoActivo: initialEstadoActivo
}) => {
  const [nombre, setNombre] = useState(initialNombre || '')
  const [telefono, setTelefono] = useState(initialTelefono || '')
  const [direccion, setDireccion] = useState(initialDireccion || '')
  const [descripcion, setDescripcion] = useState(initialDescripcion || '')
  const [estadoActivo, setEstadoActivo] = useState(initialEstadoActivo) // Estado booleano
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' })
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/proveedor/${idProveedor}`, {
        nombre,
        telefono,
        direccion,
        descripcion,
        estadoActivo
      })

      if (response.status === 200) {
        setAlert({ show: true, message: 'Actualización Exitosa', severity: 'success' })
        setTimeout(() => {
          setAlert({ show: false, message: '', severity: 'success' })
          router.push('/proveedores')
        }, 1500)
      }
    } catch (error) {
      console.error('Error al actualizar al proveedor:', error)
      setAlert({ show: true, message: 'Error al actualizar al proveedor', severity: 'error' })
      setTimeout(() => {
        setAlert({ show: false, message: '', severity: 'error' })
      }, 2000)
    }
  }

  const handleCancel = () => {
    router.push('/proveedores') // Redirigir a la página de proveedores o cualquier otra página
  }

  return (
    <Card>
      <CardHeader
        title={
          <Typography
            variant='h5'
            sx={{
              color: 'rgb(109, 9, 197)',
              fontWeight: 'bold',
              fontSize: '2rem',
              textAlign: 'center'
            }}
          >
            EDITAR PROVEEDOR
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
                onChange={e => setNombre(e.target.value)}
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
                label='Teléfono'
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-phone-fill' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Dirección'
                value={direccion}
                onChange={e => setDireccion(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-map-pin-2-line' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Descripción'
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-file-list-2-line' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} align={'start'}>
              <label htmlFor='s'>ESTADO</label>
              <br />
              <FormControlLabel
                control={
                  <Switch
                    checked={estadoActivo == true ? true : false}
                    onChange={e => setEstadoActivo(e.target.checked)}
                    color='success'
                    size='medium'
                  />
                }
                label={estadoActivo == true ? 'Activo' : 'Inactivo'}
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
        <Alert severity={alert.severity} sx={{ mb: 2 }} onClose={() => setAlert({ ...alert, show: false })}>
          {alert.message}
        </Alert>
      )}
    </Card>
  )
}

export default FormLayoutsWithIcon
