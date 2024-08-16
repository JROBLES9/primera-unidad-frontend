"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';
import Fab from '@mui/material/Fab';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import tableStyles from '@core/styles/table.module.css';

const urlBase = process.env.NEXT_PUBLIC_APP_URL;

const TableLotes = () => {
    const [rowsData, setRowsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterField, setFilterField] = useState('nombreProducto');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [view, setView] = useState('all');

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(urlBase + '/api/inventario/inventario');
                const data = response.data.flatMap(producto =>
                    producto.lotes.map(lote => ({
                        ...lote,
                        nombreProducto: producto.nombre,
                        precioVenta: producto.precioVenta,
                        descripcionProducto: producto.descripcion,
                        esPerecedero: producto.esPerecedero,
                        estadoActivoProducto: producto.estadoActivo
                    }))
                );
                setRowsData(data);
                setFilteredData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filterData = () => {
            const lowercasedTerm = searchTerm.toLowerCase();
            const filtered = rowsData.filter(row =>
                row[filterField]?.toLowerCase().includes(lowercasedTerm) &&
                (view === 'all' ||
                    (view === 'active' && row.estadoActivoProducto) ||
                    (view === 'inactive' && !row.estadoActivoProducto)) &&
                (categoryFilter === 'all' ||
                    (categoryFilter === 'perecedero' && row.esPerecedero === 1) ||
                    (categoryFilter === 'no-perecedero' && row.esPerecedero === 0))
            );
            setFilteredData(filtered);
        };
        filterData();
    }, [searchTerm, filterField, rowsData, view, categoryFilter]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleView = (event, newView) => {
        setView(newView);
    };

    const handleCategoryFilter = (event, newCategory) => {
        setCategoryFilter(newCategory);
    };

    const handleEditClick = (row) => {
        const queryParams = new URLSearchParams({
            idLote: row.idLote,
            nombreProducto: row.nombreProducto,
            cantidadInicial: row.cantidadInicial,
            cantidadDisponible: row.cantidadDisponible,
            fechaCaducidad: row.fechaCaducidad
        }).toString();

        router.push(`/updateLotes?${queryParams}`);
    };

    const handleDeleteClick = async (row) => {
        try {
            const response = await axios.delete(`${urlBase}/api/lote/${row.idLote}`);
            if (response.status === 200) {
                router.reload();
            }
        } catch (error) {
            console.error('Error al eliminar el lote:', error);
        }
    };

    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar los datos</div>;

    return (
        <Card>
            <div className={tableStyles.topTable}>
                <div className={tableStyles.filterContainer}>
                    <TextField
                        label="Buscar"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        className={tableStyles.searchField}
                    />
                    <Select
                        value={filterField}
                        onChange={(e) => setFilterField(e.target.value)}
                        variant="outlined"
                        size="small"
                        className={tableStyles.selectField}
                    >
                        <MenuItem value="nombreProducto">Nombre Producto</MenuItem>
                        <MenuItem value="categoria">Categoría</MenuItem>
                        <MenuItem value="cantidadDisponible">Cantidad Disponible</MenuItem>
                        <MenuItem value="fechaCaducidad">Fecha Caducidad</MenuItem>
                    </Select>
                </div>

                <div className={tableStyles.filterContainer}>
                    <ToggleButtonGroup
                        exclusive
                        value={categoryFilter}
                        orientation='horizontal'
                        onChange={handleCategoryFilter}
                        aria-label='filter by category'
                    >
                        <ToggleButton value='all' aria-label='all categories'>
                            Todas las categorías
                        </ToggleButton>
                        <ToggleButton value='perecedero' aria-label='perecedero'>
                            Perecedero
                        </ToggleButton>
                        <ToggleButton value='no-perecedero' aria-label='no perecedero'>
                            No Perecedero
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

            </div>

            <div className='overflow-x-auto'>
                <table className={tableStyles.table}>
                    <thead>
                        <tr>
                            <th>NOMBRE PRODUCTO</th>
                            <th>PRECIO VENTA</th>
                            <th>DESCRIPCIÓN</th>
                            <th>TIPO</th>
                            <th>CATEGORÍA</th>
                            <th>CANTIDAD DISPONIBLE</th>
                            <th>FECHA CADUCIDAD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row) => (
                            <tr key={row.idLote}>
                                <td>
                                    <Typography>{row.nombreProducto}</Typography>
                                </td>
                                <td>
                                    <Typography>{row.precioVenta}</Typography>
                                </td>
                                <td>
                                    <Typography>{row.descripcionProducto}</Typography>
                                </td>
                                <td>
                                    <Typography>{row.esPerecedero ? 'Perecedero' : 'No Perecedero'}</Typography>
                                </td>
                                <td>
                                    <Typography>{row.categoria}</Typography>
                                </td>
                                <td>
                                    <Typography>{row.cantidadDisponible}</Typography>
                                </td>
                                <td>
                                    <Typography>{row.fechaCaducidad}</Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage='Filas por página:'
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
        </Card>
    );
};

export default TableLotes;
