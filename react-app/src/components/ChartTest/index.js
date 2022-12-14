import '../../stylesheets/chart.css'
import ChartDrawing from '../ChartDrawing'
import Search from '../Search'
import { useState } from 'react'

const ChartTest = () => {
  const [selectedFile, setSelectedFile] = useState()
  const [isFilePicked, setIsFilePicked] = useState(false)

  const changeHandler = e => {
    setSelectedFile(e.target.files[0])
    console.log(selectedFile)
    setIsFilePicked(true)
  }

  const handleUpload = () => {
    const formData = new FormData()
    formData.append('file', selectedFile)

    const options = {
      method: 'POST',
      body: formData
    }

    fetch('/api/file/upload/1', options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div style={{padding: '1rem'}}>
      {/* <Search /> */}
      {/* <ChartDrawing /> */}
      <div>
        <input type='file' name='file' onChange={changeHandler} />
        <button onClick={handleUpload}>File Upload</button>
      </div>
    </div>
  )
}

export default ChartTest
