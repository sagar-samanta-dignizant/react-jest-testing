import React from 'react'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

//The first code snippet is a Header component that displays a navigation bar at the top of a page. It contains a company logo, a hamburger menu button to toggle a sidebar, and a logout button.
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#eeeeee',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'fit-content',
  },
}))

//The second code snippet is an InputField component that uses the TextField component from the @mui/material library to display a styled input field.
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}))

//The third code snippet is a Logo component that displays a logo image. It takes a size prop to determine the size of the logo, and an optional image prop to specify the image source.
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    marginBottom: '5px',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

//The StyledInputBase component includes a placeholder text and an onChange event that calls the handleChange function whenever the user types in the input. It also takes in a value prop to set the current value of the input.
function SearchBar(props) {
  return (
    <Search>
      <SearchIconWrapper onClick={props.iconClick} id="search-icon">
        <SearchIcon color="primary" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={props.handleChange}
        value={props.value}
      />
    </Search>
  )
}

export default SearchBar
