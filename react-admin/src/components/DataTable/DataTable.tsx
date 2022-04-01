import { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, doc, deleteDoc, onSnapshot  } from "firebase/firestore";
import './dataTable.scss'
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../data/dataTableSource";
import { db } from '../../firebase'


interface dataRow {
  id: string,
  username: string,
  img: string,
  status: string,
  email: string,
  contry: string,
}

interface dataState{
  data : dataRow[]
}

const DataTable : FC = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    // Get data with Cloud Firebase by calling a method
    // const fetchData = async () => {
    //   try {
    //     let list : any = []
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({id : doc.id, ...doc.data()})
    //     });
    //     setData(list)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // fetchData()

    //Get data with Cloud Firebase by setting a listener
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list : any = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  },[])

  const handleDelete = async (id:string) => {
   try {
      await deleteDoc(doc(db, "users", id));
      setData(data?.filter((item:dataRow) => item?.id !== id));
   } catch (err) {
      console.log(err)
   }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params : GridRenderCellParams) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className='dataTable'>
      <div className="dataTableTitle">
        Add New User
        <Link to='/users/new' className='link'>
          Add New
        </Link>
      </div>

      <DataGrid
        className="dataGrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default DataTable