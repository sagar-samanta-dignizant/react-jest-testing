import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material'
import React, { forwardRef } from 'react'
import { TPageContainerProps } from '../types'

const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
}

//This code exports a functional React component called SectionContainer. This component is a card that contains a title, subtitle, and children components. It accepts props such as title, subtitle, sx, secondary, children, and id.
const SectionContainer = forwardRef((props: TPageContainerProps, ref: any) => {
  const { title, subtitle, sx, secondary, children, id, ...rest } = props
  return (
    <Card
      sx={{
        ...sx,
        mt: (theme) => theme.spacing(3),
        mb: (theme) => theme.spacing(3),
      }}
      ref={ref}
      {...rest}
    >
      <CardHeader
        sx={headerSX}
        title={
          <Typography variant="h4" id={id} >
            {title}
          </Typography>
        }
        subheader = {
          <Typography>
            {subtitle}
          </Typography>}
        action={secondary}
      />
      {title && <Divider />}
      <CardContent>{children}</CardContent>
    </Card>
  )
})

export default SectionContainer
