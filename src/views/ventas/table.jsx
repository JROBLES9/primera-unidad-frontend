"use client";

import { useState, useEffect } from 'react'
import axios from 'axios'

// Para pasar datos a otro componente (push)
import { useRouter } from 'next/navigation'

// MUI
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
// import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TablePagination from '@mui/material/TablePagination'
import Fab from '@mui/material/Fab'

// Estilos
import tableStyles from '@core/styles/table.module.css'

// Ruta base para el consumo de la API
const urlBase = process.env.NEXT_PUBLIC_APP_URL

const TableVentas = () => {
    const [rowsData, setRowsData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterField, setFilterField] = useState('clienteNombre')  // Campo de filtrado por defecto
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const router = useRouter();  // Inicializar el router

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(urlBase + '/api/venta/getAll')
                console.log(response.data)
                setRowsData(response.data)
                setFilteredData(response.data)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const filterData = () => {
            const lowercasedTerm = searchTerm.toLowerCase()
            const filtered = rowsData.filter(row =>
                row[filterField]?.toLowerCase().includes(lowercasedTerm)
            )
            setFilteredData(filtered)
        }

        filterData()
    }, [searchTerm, filterField, rowsData])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleEditClick = (row) => {
        // Construir la URL con los parámetros
        const queryParams = new URLSearchParams({
            idVenta: row.idVenta,
            fecha: row.fecha,
            montoTotal: row.montoTotal,
            clienteNombre: row.clienteNombre,
            empleadoNombre: row.empleadoNombre
        }).toString();

        router.push(`/updateClientes?${queryParams}`);
    };

    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error al cargar los datos</div>

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
                        <MenuItem value="clienteNombre">Cliente</MenuItem>
                        <MenuItem value="fecha">Fecha</MenuItem>
                        <MenuItem value="empleadoNombre">Empleado</MenuItem>
                    </Select>
                </div>
                <div className={tableStyles.buttonContainer}>
                    <Fab variant="extended" color="primary" size="medium" href='/createClientes'>
                        <img src="images/icons/btnAddPerson.png" alt="Agregar" />
                        <label htmlFor="$">Agregar</label>
                    </Fab>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className={tableStyles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FECHA</th>
                            <th>TOTAL Q</th>
                            <th>CLIENTE</th>
                            <th>EMPLEADO</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row) => (
                            <tr key={row.idVenta}>
                                <td>
                                    <Typography>{row.idVenta}</Typography>
                                </td>
                                <td>
                                    <Typography>{row.fecha}</Typography>
                                </td>
                                <td>
                                    <Typography>{row.montoTotal}</Typography>
                                </td>
                                <td>
                                    <Typography>{row.clienteNombre}</Typography>
                                </td>
                                <td>
                                    <Typography>{row.empleadoNombre}</Typography>
                                </td>
                                <td>
                                    <div className={tableStyles.btnContainer}>
                                        <Fab
                                            onClick={() => handleEditClick(row)}
                                            color="info"
                                            size="medium"
                                            className={tableStyles.btn}
                                        >
                                            <img src="images/icons/btnEdit.png" alt="Editar" />
                                        </Fab>
                                        <Fab
                                            variant="contained"
                                            color="primary"
                                            size="medium"
                                            className={tableStyles.btn}
                                        >
                                            <img src="images/icons/btnDelete.png" alt="Eliminar" />
                                        </Fab>
                                    </div>
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
    )
}

export default TableVentas
