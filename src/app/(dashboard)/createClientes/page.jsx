"use client"
import { useSearchParams } from 'next/navigation';
import Grid from '@mui/material/Grid';
import FormLayoutsWithIcon from '@views/forms/FormCreateClientes';

const createClientes = () => {
    const searchParams = useSearchParams();

    const idCliente = searchParams.get('idCliente');
    const nombre = searchParams.get('nombre');
    const telefono = searchParams.get('telefono');
    const nit = searchParams.get('nit');

    return (
        <Grid item xs={12} md={6} width={0.75}
            boxShadow={'4px 4px 20px rgba(94, 1, 110, 0.35)'}
            marginLeft={'10%'}
            marginTop={'5%'}
            align={'center'}
        >
            <FormLayoutsWithIcon
                idCliente={idCliente}
                nombre={nombre}
                telefono={telefono}
                nit={nit}
            />
        </Grid>
    );
}

export default createClientes;
