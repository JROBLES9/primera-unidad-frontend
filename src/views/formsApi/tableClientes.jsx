"use client";

import { useState, useEffect } from 'react'
import axios from 'axios'

// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

// const URL = process.env.NEXT_PUBLIC_BACKEND_URL

const tableClientes = () => {
  const [rowsData, setRowsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cliente/getAll')
        setRowsData(response.data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error al cargar los datos</div>

  return (
    <Card>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>TELEFONO</th>
              <th>NIT</th>
            </tr>
          </thead>
          <tbody>
            {rowsData.map((row) => (
              <tr key={row.idCliente}>
                <td className='!plb-1'>
                  <Typography>{row.idCliente}</Typography>
                </td>
                <td className='!plb-1'>
                  <Typography>{row.nombre}</Typography>
                </td>
                <td className='!plb-1'>
                  <Typography>{row.telefono}</Typography>
                </td>
                <td className='!plb-1'>
                  <Typography>{row.nit}</Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default tableClientes
