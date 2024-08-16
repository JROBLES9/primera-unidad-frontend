'use client'
import { useSearchParams } from 'next/navigation'

import Grid from '@mui/material/Grid'

import FormLayoutsWithIcon from '@views/forms/FormUpdatePedido'

const UpdateProductos = () => {
  const searchParams = useSearchParams()

  const idPedido = searchParams.get('idPedido')
  const descripcion = searchParams.get('descripcion')
  const precioCompra = searchParams.get('precioCompra')
  const estadoRecibido = searchParams.get('estadoRecibido')
  const fechaPedido = searchParams.get('fechaPedido')
  const idProducto = searchParams.get('idProducto')
  const idProveedor = searchParams.get('idProveedor')

  return (
    <Grid
      item
      xs={12}
      md={6}
      width={0.75}
      boxShadow={'4px 4px 20px rgba(94, 1, 110, 0.35)'}
      marginLeft={'10%'}
      marginTop={'-2%'}
      align={'center'}
    >
      <FormLayoutsWithIcon
        idPedido={idPedido}
        descripcion={descripcion}
        precioCompra={precioCompra}
        estadoRecibido={estadoRecibido}
        fechaPedido={fechaPedido}
        idProducto={idProducto}
        idProveedor={idProveedor}
      />
    </Grid>
  )
}

export default UpdateProductos
