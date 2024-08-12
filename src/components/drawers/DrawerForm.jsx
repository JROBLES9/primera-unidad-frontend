// components/DrawerForm.jsx
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import FormLayoutsWithIcon from '@views/forms/FormUpdateClientes'; // Asegúrate de que la ruta es correcta

const DrawerForm = ({ open, onClose }) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{ width: 300 }}
        >
            <div style={{ padding: 20, width: 300, position: 'relative' }}>
                <IconButton onClick={onClose} style={{ position: 'absolute', right: 10, top: 10 }}>
                </IconButton>
                <FormLayoutsWithIcon />
            </div>
        </Drawer>
    );
};

export default DrawerForm;
