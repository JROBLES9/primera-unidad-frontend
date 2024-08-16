'use client'
import { useSearchParams } from 'next/navigation'

import Grid from '@mui/material/Grid'

import FormLayoutsWithIcon from '@views/forms/FormCreatePedido'

const createPedido = () => {
  return (
    <Grid
      item
      xs={12}
      md={6}
      width={0.75}
      boxShadow={'4px 4px 20px rgba(94, 1, 110, 0.35)'}
      marginLeft={'10%'}
      marginTop={'5%'}
      align={'center'}
    >
      <FormLayoutsWithIcon />
    </Grid>
  )
}

export default createPedido
