import {
  styled,
  AppBar as MuiAppBar,
  Toolbar,
  Box,
  IconButton,
  useTheme,
} from '@mui/material'
import { drawerWidth } from '../config/constants.config'
import { IconLogout, IconMenu } from '../config/icons.config'
import { ELogoSizes, MuiAppBarProps, THeaderProps } from '../types'
import Logo from './Logo'

//The "shouldForwardProp" property is set to a function that determines whether or not to forward the "open" prop to the underlying component. In this case, the "open" prop is not forwarded to the underlying AppBar component.
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MuiAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 5,
  paddingTop: '5px',
  paddingBottom: '5px',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: theme.palette.background.paper,
}))

//This code defines a functional component named Header that renders an app bar with a logo and a logout button. It receives the following props:
function Header(props: THeaderProps) {
  const theme = useTheme()
  const { drawerState, handleDrawerState, onLogout } = props
  const profile = localStorage.getItem('companyImage')
  return (
    <AppBar position="fixed" open={drawerState} elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex">
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerState}
            edge="start"
            sx={{
              marginRight: 5,
              ...(drawerState && { display: 'none' }),
              color: theme.palette.primary.main,
            }}
          >
            <IconMenu />
          </IconButton>
          <Logo size={ELogoSizes.small} image={profile} />
        </Box>
        <IconButton onClick={onLogout}>
          <IconLogout color={theme.palette.error.main} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
