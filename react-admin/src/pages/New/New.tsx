import { InputUnstyledTypeMap } from '@mui/base'
import { FC, useState } from 'react'
import { Navbar, Sidebar } from '../../components'
import { inputType } from '../../data/formSource';
import './new.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

interface newProps{
  inputs: inputType[],
  title: string;
}

const New : FC<newProps> = ({ inputs, title }) => {

  const [file, setFile] = useState<string | Blob>("");

  //const blobString : string = URL.createObjectURL(file as Blob)

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? "blobString"
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e:React.FormEvent<HTMLInputElement>) => {
                    //setFile(e.target.files[0])
                  }}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New