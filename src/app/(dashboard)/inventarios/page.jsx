import Grid from '@mui/material/Grid'

// Components Imports
import Table from '@views/inventarios/table'

const inventarios = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <h1>INVENTARIO</h1>
                <Table />
            </Grid>
        </Grid>
    )
}

export default inventarios
