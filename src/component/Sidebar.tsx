import {
  Drawer as MuiDrawer,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Badge,
} from '@mui/material'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import { useTheme } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { drawerWidth, ICON_SIZE } from '../config/constants.config'
import {
  IconAdminSettings,
  IconHome,
  IconMenu,
  IconModel,
  IconUsers,
} from '../config/icons.config'
import { ADMIN_ROUTES, USER_ROUTES } from '../config/routes.config'
import { getRole } from '../hooks/commonFunction'
import { ELogoSizes, TSidebarItemsProps, TSidebarListItems } from '../types'
import Logo from './Logo'

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})
//This component that renders a sidebar for the application. It uses styled-components to define the styles of the components used in the sidebar
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 12px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 12px)`,
  },
})

//The sidebar has a drawer component that can be opened or closed, and it contains a header with a logo and a menu icon that can toggle the drawer's state.
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  ...theme.mixins.toolbar,
}))

//The sidebar has two sets of routes, one for the admin role and another for the user role, which are stored in separate arrays. 
function Sidebar(props: TSidebarItemsProps) {
  const { open, onStateChange } = props
  const navigate = useNavigate()
  const theme = useTheme()
  const path = useLocation().pathname

  const [role, setRole] = useState('admin')
  const [displayDot, setDisplayDot] = useState(false)
  window.addEventListener(
    'notification',
    function (e: any) {
      setDisplayDot(e.detail)
    },
    false,
  )

  //The component renders a list of items based on the role of the logged-in user. 
  const AdminRoutes: any = [
    {
      name: `Home`,
      path: ADMIN_ROUTES.root,
      displayDot: displayDot,
      icon: <IconHome color={theme?.palette?.primary?.main} size={ICON_SIZE} />,
      className: 'home',
    },
    {
      name: 'Users',
      path: ADMIN_ROUTES.users,
      icon: <IconUsers color={theme?.palette?.primary?.main} size={ICON_SIZE} />,
      className: 'users',
    },
    {
      name: 'Admin Settings',
      path: ADMIN_ROUTES.adminProfile,
      icon: (
        <IconAdminSettings
          color={theme?.palette?.primary?.main}
          size={ICON_SIZE}
        />
      ),
      className: 'admin-settings',
    },
    {
      name: 'Models',
      path: ADMIN_ROUTES.models,
      icon: <IconModel color={theme?.palette?.primary?.main} size={ICON_SIZE} />,
      className: 'models', 
    },
  ]

  const UserRoutes: any = [
    {
      name: 'User Settings',
      path: USER_ROUTES.root,
      icon: (
        <IconAdminSettings
          color={theme?.palette?.primary?.main}
          size={ICON_SIZE}
        />
      ),
      id: 'admin-settings',
    },
    {
      name: 'Models',
      path: USER_ROUTES.models,
      icon: <IconModel color={theme?.palette?.primary?.main} size={ICON_SIZE} />,
      id: 'models',
    },
  ]

  const routes = {
    admin: AdminRoutes,
    user: UserRoutes,
  }

  useEffect(() => {
    const loginUserRole: string = getRole()
    if (loginUserRole) {
      setRole(loginUserRole)
    }
  }, [])
  //The component triggers the display of a dot on the corresponding item in the list if a new notification is received.
  return (
    <Drawer
      data-testid="sidebar"
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: (theme) => theme.palette.background.default,
          color: (theme) => theme.palette.background.default,
        },
      }}
    >
      <DrawerHeader  >
        <Logo size={ELogoSizes.small} />
        <IconButton
          onClick={onStateChange}
          id="sidebar-menu-icon"
          data-testid="menu-icon"
        >
          <IconMenu color={theme?.palette?.primary?.main} />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {routes[role].map((item: TSidebarListItems, index: number) => (
          <ListItem key={index}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={path === item.path}
              style={{
                borderRadius: theme.shape.borderRadius,
              }}
              id={item.id}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {item.displayDot && (
                <Badge variant="dot" color="warning" data-testid="notification-dot">
                  <ListItemText primary={item.name} />
                </Badge>
              )}
              {!item.displayDot && (
                <ListItemText
                  primary={item.name}
                  secondary={item.displayDot && "*"}
                ></ListItemText>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
