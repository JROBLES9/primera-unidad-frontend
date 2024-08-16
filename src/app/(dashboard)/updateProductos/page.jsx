"use client"
import { useSearchParams } from 'next/navigation';
import Grid from '@mui/material/Grid';
import FormLayoutsWithIcon from '@views/forms/FormUpdateProductos';

const UpdateProductos = () => {
    const searchParams = useSearchParams();

    const idProducto = searchParams.get('idProducto');
    const nombre = searchParams.get('nombre');
    const precioVenta = searchParams.get('precioVenta');
    const descripcion = searchParams.get('descripcion');
    const esPerecedero = searchParams.get('esPerecedero');
    const estadoActivo = searchParams.get('estadoActivo');

    return (
        <Grid item xs={12} md={6} width={0.75}
            boxShadow={'4px 4px 20px rgba(94, 1, 110, 0.35)'}
            marginLeft={'10%'}
            marginTop={'5%'}
            align={'center'}
        >
            <FormLayoutsWithIcon
                idProducto={idProducto}
                nombre={nombre}
                precioVenta={precioVenta}
                descripcion={descripcion}
                esPerecedero={esPerecedero}
                estadoActivo={estadoActivo}
            />
        </Grid>
    );
}

export default UpdateProductos;
