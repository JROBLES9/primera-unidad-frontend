'use client'

import { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton className='text-textPrimary' onClick={handleClick}>
        <i className='ri-notification-2-line' />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Notificación 1</MenuItem>
        <MenuItem onClick={handleClose}>Notificación 2</MenuItem>
        <MenuItem onClick={handleClose}>Ver todas las notificaciones</MenuItem>
      </Menu>
    </>
  )
}

export default NotificationsMenu
