function Upload () {
  return (
    <div>
      <form action='http://localhost:4000/upload' method='post' encType='multipart/form-data'>
        <input type='file' id='file-upload' name='file-upload' />
        <input type='submit' value='Envoyer' />
      </form>
    </div>
  )
}

export default Upload
