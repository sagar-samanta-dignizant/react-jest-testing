// ** React Imports
import { useState, SyntheticEvent, useEffect } from 'react'
// ** MUI Imports
import { Avatar, Box, Button, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import Spacer from '../../../component/Spacer'

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(1),
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down('sm')]: {
    width: 100,
  },
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}))

const ImageUploader = (props: any) => {
  console.log(props)
  // ** State
  const [files, setFiles] = useState<File[]>([])
  useEffect(() => {
    if (props.image) {
      setFiles(props.image)
    }
  }, [props.image])

  // ** Hook for uploading the image
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles: File[]) => {
      debugger
      typeof files === 'string' &&
        setFiles(acceptedFiles?.map((file: File) => Object.assign(file)))
      typeof files === 'object' &&
        setFiles(acceptedFiles?.map((file: File) => Object.assign(file)))
        props.uploadFile(acceptedFiles.map((file: File) => Object.assign(file)))
    },
  })

  const handleLinkClick = (event: SyntheticEvent) => {
    event.preventDefault()
  }

  const img =
    typeof files === 'string' ? (
      <Avatar src={files} style={{ width: '150px', height: '150px' }} />
    ) : (
      files.map((file: FileProp) => (
        <img
          key={file.name}
          alt={file.name}
          className="single-file-image"
          src={URL.createObjectURL(file as any)}
          style={{ width: '150px' }}
        
        />
      ))
    )

  return (
    <>
      <Box
        {...getRootProps({ className: 'dropzone' })}
        sx={acceptedFiles.length ? { height: 250 } : {}}
      >
        <input {...getInputProps()} required/>

        <Box
          sx={{
            display: 'flex',
            flexDirection: ['column', 'column', 'row'],
            alignItems: 'center',
          }}
        >
          <Spacer direction="row">
            {files?.length ? (
              img
            ) : (
              <Img
                alt="Upload img"
                src={props.image ? props.image : '/images/user.png'}
                  style={{ width: '150px' }}
              />
            )}

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: ['center', 'center', 'inherit'],
              }}
            >
              <HeadingTypography variant="h5">
                Please upload profile picture here.
              </HeadingTypography>
              <Typography color="textSecondary">
                Upload profile picture here or click
                <Link href="/" onClick={handleLinkClick}>
                  browse
                </Link>
              </Typography>
            </Box>
          </Spacer>
        </Box>
      </Box>
      {props.displayButton && (
        <Box>
          <Button onClick={() =>
             props.uploadFile(files)}>Upload</Button>
        </Box>
      )}
    </>
  )
}

export default ImageUploader
