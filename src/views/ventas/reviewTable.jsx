"use client";

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TablePagination from '@mui/material/TablePagination'
import Button from '@mui/material/Button'
import tableStyles from '@core/styles/table.module.css'
import InputAdornment from '@mui/material/InputAdornment';

const urlBase = process.env.NEXT_PUBLIC_APP_URL

const TableVentas = () => {
    const [rowsData, setRowsData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterField, setFilterField] = useState('Producto')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const router = useRouter()
    const searchParams = useSearchParams()

    // Extraer parámetros de la URL
    const idVenta = searchParams.get('idVenta')
    const fecha = searchParams.get('fecha')
    const montoTotal = searchParams.get('montoTotal')
    const clienteNombre = searchParams.get('clienteNombre')
    const empleadoNombre = searchParams.get('empleadoNombre')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(urlBase + '/api/detalleVenta/getAll/' + idVenta, {
                    headers: {
                        Authorization: `${token}`
                    }
                })
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

    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error al cargar los datos</div>

    const handleCancel = () => {
        router.push('/venta')
    };

    return (
        <Card>
            {/* Mostrar los datos de la factura */}
            <Card>
                <Typography variant="h2" align='center' color={"rgb(109, 9, 197)"}> <strong>FACTURA</strong></Typography>
                <br />
                <TextField
                    id='standard-basic'
                    variant='standard'
                    value={"ID Venta: " + idVenta}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <i className='ri-id-card-line' />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    id='standard-basic'
                    variant='standard'
                    value={"Cliente: " + clienteNombre}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <i className='ri-user-3-line' />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    id='standard-basic'
                    variant='standard'
                    value={"Fecha: " + fecha}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <i className='ri-calendar-2-fill' />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    id='standard-basic'
                    variant='standard'
                    value={"Monto Total: " + montoTotal}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <i className='ri-money-dollar-box-line' />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    id='standard-basic'
                    variant='standard'
                    value={"Empleado: " + empleadoNombre}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <i className='ri-user-voice-line' />
                            </InputAdornment>
                        )
                    }}
                />
            </Card>

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
                        <MenuItem value="Producto">Producto</MenuItem>
                        <MenuItem value="subtotal">Subtotal</MenuItem>
                    </Select>
                </div>
                <div className={tableStyles.buttonContainer}>
                    <Button variant='contained' color='primary' onClick={handleCancel}>
                        <i className='ri-arrow-go-back-fill' />
                        Volver
                    </Button>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className={tableStyles.table}>
                    <thead>
                        <tr>
                            <th>PRODUCTO</th>
                            <th>CANTIDAD Q</th>
                            <th>SUBTOTAL</th>
                            <th>ID VENTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row) => (
                            <tr key={row.idDetalleVenta}>
                                <td>
                                    <Typography>{row.Producto}</Typography>
                                </td>
                                <td>
                                    <Typography>{row.Cantidad}</Typography>
                                </td>
                                <td>
                                    <Typography>{row.subtotal}</Typography>
                                </td>
                                <td>
                                    <Typography>{row.idVenta}</Typography>
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
