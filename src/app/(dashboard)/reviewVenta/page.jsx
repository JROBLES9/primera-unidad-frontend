"use client"
import { useSearchParams } from 'next/navigation';
import Grid from '@mui/material/Grid';
import FormReview from '@views/ventas/reviewTable';

const reviewVenta = () => {
    const searchParams = useSearchParams();

    // Extraer parámetros de la URL
    const idVenta = searchParams.get('idVenta');
    const fecha = searchParams.get('fecha');
    const montoTotal = searchParams.get('montoTotal');
    const clienteNombre = searchParams.get('clienteNombre');
    const empleadoNombre = searchParams.get('empleadoNombre');

    // Pasar parámetros a FormReview
    return (
        <Grid
            item xs={12} md={6}
            boxShadow={'4px 4px 20px rgba(94, 1, 110, 0.4)'}
        >
            <FormReview
                idVenta={idVenta}
                fecha={fecha}
                montoTotal={montoTotal}
                clienteNombre={clienteNombre}
                empleadoNombre={empleadoNombre}
            />
        </Grid>
    );
}

export default reviewVenta;
