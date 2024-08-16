"use client"
import { useSearchParams } from 'next/navigation';
import Grid from '@mui/material/Grid';
import FormLayoutsWithIcon from '@views/forms/FormCreateLotes';

const createLotes = () => {

    const searchParams = useSearchParams();

    const idLote = searchParams.get('idLote');
    const categoria = searchParams.get('categoria');
    const cantidadInicial = searchParams.get('cantidadInicial');
    const cantidadDisponible = searchParams.get('cantidadDisponible');
    const fechaCaducidad = searchParams.get('fechaCaducidad');
    const fechaIngreso = searchParams.get('fechaIngreso');
    const idPedido = searchParams.get('idPedido');
    const idProducto = searchParams.get('idProducto');

    return (
        <Grid item xs={12} md={6} width={0.75}
            boxShadow={'4px 4px 20px rgba(94, 1, 110, 0.35)'}
            marginLeft={'10%'}
            marginTop={'5%'}
            align={'center'}
        >
            <FormLayoutsWithIcon
                idLote={idLote}
                categoria={categoria}
                cantidadInicial={cantidadInicial}
                cantidadDisponible={cantidadDisponible}
                fechaCaducidad={fechaCaducidad}
                fechaIngreso={fechaIngreso}
                idPedido={idPedido}
                idProducto={idProducto}
            />
        </Grid>
    );
}

export default createLotes;
