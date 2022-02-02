import axios from 'axios'
import { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { useState } from 'react/cjs/react.development'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}

const focusedStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

function Upload () {
  const [uploadedImage, setUploadedImage] = useState(null)

  const handleDrop = async (acceptedFiles) => {
    console.log(acceptedFiles)
    const data = new FormData()
    data.append('file', acceptedFiles[0])
    data.append('file-name', acceptedFiles[0].name)

    const response = await axios.post('http://localhost:4000/upload', data)
    console.log(response)
    setUploadedImage(response.data)
  }

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: 'image/*', onDrop: handleDrop, multiple: false })

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ])

  return (
    <div>
      {
        uploadedImage
          ? <img src={`http://localhost:4000/${uploadedImage.path}`} width={400} />
          : (
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p>Glissez-déposez vos fichiers ici</p>
            </div>
            )
        }
    </div>
  )
}

export default Upload
