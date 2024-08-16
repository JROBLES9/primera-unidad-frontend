import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const DashboardAnalytics = () => {
  return (
    <Grid
      container
      spacing={6}
      sx={{
        position: 'relative', // Necesario para posicionar el contenido correctamente
        minHeight: '80vh', // Asegura que el fondo cubra al menos el 80% de la vista
        padding: 2, // Añade un padding para evitar que el contenido esté pegado a los bordes
        backgroundImage: 'url(/images/icons/fondoTienda.jpg)', // Ruta correcta a la imagen de fondo
        backgroundSize: 'cover', // Ajusta el tamaño de la imagen de fondo
        backgroundPosition: 'center', // Centra la imagen de fondo
      }}
    >
      {/* Contenedor para la imagen semi-transparente */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)', // Fondo blanco semi-transparente
          zIndex: 1, // Coloca el fondo semi-transparente por debajo del contenido
        }}
      />

      {/* Texto de bienvenida */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2, // Coloca el texto por encima del fondo semi-transparente
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: 'white', // Color del texto
            fontWeight: 'bold',
            mb: 2, // Espacio debajo del texto
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Sombra para mejorar la legibilidad
          }}
        >
          ¡Bienvenido a La Bendición!
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: 'white', // Color del texto
            fontWeight: 'medium',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 1)', // Sombra para mejorar la legibilidad
          }}
        >
          Tu espacio para las mejores ofertas
        </Typography>

        {/* Logo */}
        {/* <Box
          sx={{
            position: 'absolute',
            bottom: 20, // Ajusta la posición del logo según sea necesario
            right: 20, // Ajusta la posición del logo según sea necesario
            zIndex: 2, // Coloca el logo por encima del fondo semi-transparente
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <img
            src="/images/logos/laBendicionLogo.png" // Ruta correcta al logo
            alt="Logo"
            style={{ maxWidth: '150px', maxHeight: '100px' }} // Ajusta el tamaño del logo según sea necesario
          />
        </Box> */}
      </Box>
    </Grid>
  );
}

export default DashboardAnalytics;
