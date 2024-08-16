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
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Button from '@mui/material/Button'

// Estilos
import tableStyles from '@core/styles/table.module.css'

// Ruta base para el consumo de la API
const urlBase = process.env.NEXT_PUBLIC_APP_URL

const TableProductos = () => {
  const [rowsData, setRowsData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterField, setFilterField] = useState('nombre')  // Campo de filtrado por defecto
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [view, setView] = useState('all') // Estado para manejar el filtro de estado

  const router = useRouter();  // Inicializar el router

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlBase + '/api/producto/all')
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
        row[filterField]?.toLowerCase().includes(lowercasedTerm) &&
        (view === 'all' ||
          (view === 'active' && row.estadoActivo) ||
          (view === 'inactive' && !row.estadoActivo)) &&
        (categoryFilter === 'all' ||
          (categoryFilter === 'perecedero' && row.esPerecedero === 1) ||
          (categoryFilter === 'no-perecedero' && row.esPerecedero === 0))
      )
      setFilteredData(filtered)
    }
    filterData()
  }, [searchTerm, filterField, rowsData, view, categoryFilter])

  // Manejo de la paginación

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Manejo del cambio de vista (filtro de estado)
  const handleView = (event, newView) => {
    setView(newView)
  }

  //Filtro por categoría
  const handleCategoryFilter = (event, newCategory) => {
    setCategoryFilter(newCategory)
  }

  const handleEditClick = (row) => {
    // Construir la URL con los parámetros
    const queryParams = new URLSearchParams({
      idProducto: row.idProducto,
      nombre: row.nombre,
      precioVenta: row.precioVenta,
      descripcion: row.descripcion,
      esPerecedero: row.esPerecedero,
      estadoActivo: row.estadoActivo
    }).toString();

    router.push(`/updateProductos?${queryParams}`);
  };

  const handleDeleteClick = async (row) => {
    try {
      const response = await axios.delete(`${urlBase}/api/producto/${row.idProducto}`);
      if (response.status === 200) {
        // Recargar la página
        router.reload();
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    };
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
            <MenuItem value="nombre">Nombre</MenuItem>
            <MenuItem value="precioVenta">Precio de Venta</MenuItem>
            <MenuItem value="descripcion">Descripción</MenuItem>
          </Select>
        </div>

        <div className={tableStyles.filterContainer}>
          {/* Botones de filtro de estado */}
          <ToggleButtonGroup
            exclusive
            value={view}
            orientation='horizontal'
            onChange={handleView}
            aria-label='filter by status'
          >
            <ToggleButton value='all' aria-label='all' >
              <i className='ri-user-line' />
              Todos
            </ToggleButton>
            <ToggleButton value='active' aria-label='active'>
              <i className='ri-user-follow-line' />
              Activos
            </ToggleButton>
            <ToggleButton value='inactive' aria-label='inactive'>
              <i className='ri-user-forbid-line' />
              Inactivos
            </ToggleButton>
          </ToggleButtonGroup>
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

        <div className={tableStyles.buttonContainer}>
          <Fab variant="extended" color="primary" size="medium" href='/createProductos'>
            <img src="images/icons/btnCreate.png" alt="Agregar" />
            <label htmlFor="$">Agregar</label>
          </Fab>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>PRECIO DE VENTA</th>
              <th>DESCRIPCION</th>
              <th>CATEGORIA</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.idProducto}>
                <td>
                  <Typography>{row.idProducto}</Typography>
                </td>
                <td>
                  <Typography>{row.nombre}</Typography>
                </td>
                <td>
                  <Typography>{row.precioVenta}</Typography>
                </td>
                <td>
                  <Typography>{row.descripcion}</Typography>
                </td>
                <td>
                  <Typography>{row.esPerecedero === 1 ? 'Perecedero' : 'No Perecedero'}</Typography>
                </td>
                <td>
                  <Typography>
                    {row.estadoActivo ?
                      <Button color='success'>Activo</Button>
                      : <Button color='error'>Inactivo</Button>}
                  </Typography>
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
                      onClick={() => handleDeleteClick(row)}
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

export default TableProductos
