// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import Table from '@views/ventas/table'

const proveedores = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Table />
            </Grid>
        </Grid>
    )
}

export default proveedores
