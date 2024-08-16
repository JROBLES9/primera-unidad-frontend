"use client"
import { useSearchParams } from 'next/navigation';
import Grid from '@mui/material/Grid';
import FormLayoutsWithIcon from '@views/forms/FormUpdateProveedores';

const UpdateClientes = () => {
    const searchParams = useSearchParams();

    const idProveedor = searchParams.get('idProveedor');
    const nombre = searchParams.get('nombre');
    const telefono = searchParams.get('telefono');
    const direccion = searchParams.get('direccion');
    const descripcion = searchParams.get('descripcion');
    const estadoActivo = searchParams.get('estadoActivo');

    return (
        <Grid item xs={12} md={6} width={0.75}
            boxShadow={'4px 4px 20px rgba(94, 1, 110, 0.35)'}
            marginLeft={'10%'}
            marginTop={'-2%'}
            align={'center'}
        >
            <FormLayoutsWithIcon
                idProveedor={idProveedor}
                nombre={nombre}
                telefono={telefono}
                direccion={direccion}
                descripcion={descripcion}
                estadoActivo={estadoActivo}
            />
        </Grid>
    );
}

export default UpdateClientes;
