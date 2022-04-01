import { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";
import './dataTable.scss'
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../data/dataTableSource";
import { db } from '../../firebase'


interface dataRow {
  id: number,
  username: string,
  img: string,
  status: string,
  email: string,
  age: number,
}

interface dataState{
  data : dataRow[]
}

const DataTable : FC = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        let list : any = []
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({id : doc.id, ...doc.data()})
        });
        setData(list)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  },[])

  const handleDelete = (id:number) => {
    setData(data?.filter((item:dataRow) => item?.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params : GridRenderCellParams) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
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