import { FC, useState, useEffect } from 'react'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Navbar, Sidebar } from '../../components'
import { inputType } from '../../data/formSource';
import './new.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate } from 'react-router-dom';

interface newProps{
  inputs: inputType[],
  title: string;
}

interface data{
  username: string,
  displayName: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  country: string;
  img: string;
  status: string;
}

const New : FC<newProps> = ({ inputs, title }) => {
  const [data, setData] = useState<data>(
      {
        username: "",
        displayName: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        country: "",
        img: '',
        status: ''
      });
  const [file, setFile] = useState<any>();
  const [per, setPerc] = useState<number>(0);
  const navigate = useNavigate()

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData({ ...data, img: downloadURL, status: "active" });
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e:React.SyntheticEvent) => {
    e.preventDefault();
    try {
     const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
     await setDoc(doc(db, "users", res.user.uid), {
      ...data,
      timeStamp: serverTimestamp(),
    });
    navigate(-1)
    } catch (error) {
      console.error(error);
      
    }
  };



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
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    const image = (e.target as HTMLInputElement).files;
                    //console.log(image && image[0])
                    setFile(image && image[0]);
                  }}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input  
                    id={input.id} 
                    type={input.type} 
                    placeholder={input.placeholder} 
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button disabled={per !== 0 && per < 100} type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New