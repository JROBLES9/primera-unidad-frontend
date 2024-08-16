import Grid from '@mui/material/Grid'

// Components Imports
import Table from '@views/productos/table'

const productos = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <h1>Productos</h1>
                <Table />
            </Grid>
        </Grid>
    )
}

export default productos
