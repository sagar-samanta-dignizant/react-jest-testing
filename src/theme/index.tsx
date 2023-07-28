import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
  useTheme,
} from '@mui/material/styles'
import breakpoints from './breakpoints'
import { CssBaseline } from '@mui/material'

//This code defines color palettes for a light and dark theme. lightThemeColors contains values for a light theme, such as primary, secondary, success, warning, and error colors, as well as background and paper colors. 
const lightThemeColors = {
  primary: '#0b5aa0',
  secondary: '#fca404',
  success: '#54D62C',
  warning: '#FFC107',
  error: '#FF4842',
  background: '#ffffff',
  paper: '#ffffff',
}

const darkThemeColors = {
  primary: '#fca404',
  secondary: '#0b5aa0',
  success: '#54D62C',
  warning: '#FFC107',
  error: '#FF4842',
  background: '#3C4048',
  paper: '#3C4048',
}

const themeColors = {
  light: lightThemeColors,
  dark: darkThemeColors,
}

//themeColors defines an object that maps the string 'light' to lightThemeColors and the string 'dark' to darkThemeColors.
function ThemeProvider({ children }) {
  const defaultTheme = useTheme()
  const selectedTheme = 'light'

  const theme = createTheme({
    ...defaultTheme,
    breakpoints,
    shape: { borderRadius: 10 },
    palette: {
      mode: selectedTheme,
      background: {
        paper: themeColors[selectedTheme].paper,
        default: themeColors[selectedTheme].background,
      },
      primary: {
        main: themeColors[selectedTheme].primary,
      },
      secondary: {
        main: themeColors[selectedTheme].secondary,
      },
      success: {
        main: themeColors[selectedTheme].success,
      },
      warning: {
        main: themeColors[selectedTheme].warning,
      },
      error: {
        main: themeColors[selectedTheme].error,
      },
    },
    typography: {
      fontFamily: 'Montserrat',
      h6: {
        fontWeight: 500,
        fontSize: '0.75rem',
        color: themeColors[selectedTheme].primary,
      },
      h5: {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: themeColors[selectedTheme].primary,
      },
      h4: {
        fontSize: '1rem',
        fontWeight: 600,
        color: themeColors[selectedTheme].primary,
      },
      h3: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: themeColors[selectedTheme].primary,
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: themeColors[selectedTheme].primary,
      },
      h1: {
        fontSize: '2.125rem',
        fontWeight: 700,
        color: themeColors[selectedTheme].primary,
      },
      subtitle1: {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: themeColors[selectedTheme].primary,
      },
      subtitle2: {
        fontSize: '0.75rem',
        fontWeight: 400,
        color: themeColors[selectedTheme].primary,
      },
      caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        color: themeColors[selectedTheme].primary,
      },
      body1: {
        fontSize: '0.875rem',
        fontWeight: 400,
        color: themeColors[selectedTheme].primary,
        lineHeight: '1.334em',
      },
      body2: {
        letterSpacing: '0em',
        fontWeight: 400,
        color: themeColors[selectedTheme].primary,
        lineHeight: '1.5em',
      },
      button: {
        textTransform: 'capitalize',
      },
    },
  })

  //StyledEngineProvider is used to inject a global CSS baseline and define the style overrides of Material-UI components. MuiThemeProvider is used to provide the theme object to the Material-UI components, which defines the color palette, typography, and other visual styles used by the app. 
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeProvider
