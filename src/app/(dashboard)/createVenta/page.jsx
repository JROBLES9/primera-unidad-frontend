"use client"
import Grid from '@mui/material/Grid';
import FormLayoutsWithIcon from '@views/forms/FormCreateVenta';

const reviewVenta = () => {

    // Pasar parámetros a FormReview
    return (
        <Grid
            item xs={12} md={6}
            boxShadow={'4px 4px 20px rgba(94, 1, 110, 0.6)'}
        >
            <FormLayoutsWithIcon />
        </Grid>
    );
}

export default reviewVenta;
