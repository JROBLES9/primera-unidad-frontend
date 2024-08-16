// MUI Imports
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// import UnderMaintenance from '@views/Prueba'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
          className: 'bs-full overflow-y-auto overflow-x-hidden',
          onScroll: container => scrollMenu(container, false)
        }
        : {
          options: { wheelPropagation: false, suppressScrollX: true },
          onScrollY: container => scrollMenu(container, true)
        })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        <MenuItem
          href='/'
          icon={<i className='ri-home-smile-line' />}

        // suffix={<Chip label='5' size='small' color='error' />}
        >
          Dashboard
        </MenuItem>

        <MenuSection label='Ventas'>
          <MenuItem href='/venta' icon={<i className='ri-user-settings-line' />}>
            Vender
          </MenuItem>
          <SubMenu
            label='Gestion'
            icon={<i className='ri-home-smile-line' />}

          // suffix={<Chip label='5' size='small' color='error' />}
          >
            <MenuItem href='/login' icon={<i className='ri-user-settings-line' />}>
              Historial de Ventas
            </MenuItem>
            <MenuItem href='/login' icon={<i className='ri-user-settings-line' />}>
              Detalle de venta
            </MenuItem>
          </SubMenu>
        </MenuSection>

        <MenuSection label='Inventario'>
          <MenuItem href='/login' icon={<i className='ri-user-settings-line' />}>
            Inventario
          </MenuItem>
          <SubMenu
            label='Gestion'
            icon={<i className='ri-home-smile-line' />}

          // suffix={<Chip label='5' size='small' color='error' />}
          >
            <MenuItem href='/productos' icon={<i className='ri-user-settings-line' />}>
              Productos
            </MenuItem>
            <MenuItem href='/login' icon={<i className='ri-user-settings-line' />}>
              Pedidos
            </MenuItem>
            <MenuItem href='/login' icon={<i className='ri-user-settings-line' />}>
              Lotes
            </MenuItem>
          </SubMenu>
        </MenuSection>

        <MenuSection label='Administracion'>
          <SubMenu
            label='Proveedores/Clientes'
            icon={<i className='ri-folder-user-line' />}

          // suffix={<Chip label='5' size='small' color='error' />}
          >
            <MenuItem href='/proveedores' icon={<i className='ri-user-settings-line' />}>
              Proveedores
            </MenuItem>
            <MenuItem href='/clientes' icon={<i className='ri-user-settings-line' />}>
              Clientes
            </MenuItem>
          </SubMenu>
          <SubMenu
            label='Recurso Humano'
            icon={<i className='ri-home-smile-line' />}

          // suffix={<Chip label='5' size='small' color='error' />}
          >
            <MenuItem href='/login' icon={<i className='ri-user-settings-line' />}>
              Colaboradores
            </MenuItem>
            <MenuItem href='/login' icon={<i className='ri-user-settings-line' />}>
              Horarios
            </MenuItem>
            <MenuItem href='/login' icon={<i className='ri-user-settings-line' />}>
              Usuarios
            </MenuItem>
            <MenuItem href='/login' icon={<i className='ri-user-settings-line' />}>
              Roles
            </MenuItem>
          </SubMenu>
          <MenuItem href='/login' icon={<i className='ri-user-settings-line' />}>
            Control entradas
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
