import Grid from '@mui/material/Grid'

// Components Imports
import Table from '@views/lotes/table'

const lotes = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <h1>LOTES</h1>
                <Table />
            </Grid>
        </Grid>
    )
}

export default lotes
