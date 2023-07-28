import { Box } from '@mui/material'
import { TLogoProps } from '../types'

const LOGO_SIZES = {
  small: 40,
  medium: 50,
  large: 60,
}
//This is a component that displays a logo image. It takes in a size prop (small, medium, or large) and an optional image prop which can be a URL to a custom image. If the image prop is not provided, it will display a default image located in the public folder.
function Logo(props: TLogoProps) {
  const { size } = props

  return (
    <Box padding={2}>
      <img
        src={props.image || '/images/logo.webp'}
        height={LOGO_SIZES[size] || LOGO_SIZES['large']}
        alt="home-logo"
        id="home-logo"
      />
    </Box>
  )
}

export default Logo
