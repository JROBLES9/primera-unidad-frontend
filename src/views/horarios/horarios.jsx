"use client";

import { useState, useEffect } from 'react'
import axios from 'axios'

// MUI
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TablePagination from '@mui/material/TablePagination'

// Estilos
import tableStyles from '@core/styles/table.module.css'

// Ruta base para el consumo de laAPI
const urlBase = process.env.NEXT_PUBLIC_APP_URL

const HorariosComponent = () => {
  const [rowsData, setRowsData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterField, setFilterField] = useState('nombre')  // Campo de filtrado por defecto
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(urlBase + '/api/horario/all/1', {
            headers: {
              Authorization: `${token}`
            }
          })
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
            <MenuItem value="nombre">Nombre</MenuItem>
            <MenuItem value="telefono">Teléfono</MenuItem>
            <MenuItem value="dpi">DPI</MenuItem>
          </Select>
        </div>
        <div className={tableStyles.buttonContainer}>
          <Button variant="contained" color="primary" size="small">
            <img src="images/icons/btnAddPerson.png" alt="Agregar" />
            <label htmlFor="$">Agregar</label>
          </Button>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
            <th>ID RRHH</th>
            <th>NOMBRE</th>
            <th>EDAD</th>
            <th>DPI</th>
            <th>DIRECCION</th>
            <th>TELEFONO</th>
            <th>SALARIO</th>
            <th>ESTADO ACTIVO</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.idRrhh}>
                <td>
                    <Typography>{row.idRrhh}</Typography>
                </td>
                <td>
                    <Typography>{row.nombre}</Typography>
                </td>
                <td>
                    <Typography>{row.edad}</Typography>
                </td>
                <td>
                    <Typography>{row.dpi}</Typography>
                </td>
                <td>
                    <Typography>{row.direccion}</Typography>
                </td>
                <td>
                    <Typography>{row.telefono}</Typography>
                </td>
                <td>
                    <Typography>{row.salario}</Typography>
                </td>
                <td>
                    <Typography>{row.estadoActivo}</Typography>
                </td>
                <td>
                  <div className={tableStyles.btnContainer}>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      className={tableStyles.btn}
                    >
                      <img src="images/icons/btnEdit.png" alt="Editar" />
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={tableStyles.btn}
                    >
                      <img src="images/icons/btnDelete.png" alt="Eliminar" />
                    </Button>
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

export default HorariosComponent
