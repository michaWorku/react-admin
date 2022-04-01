import { FC, useState, useEffect} from 'react'
import './widget.scss'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase';

interface widgetProps {
  widgetType: string
}

const Widget : FC<widgetProps> = ({widgetType}) => {
  const [amount, setAmount] = useState(0);
  const [diff, setDiff] = useState(0);
  let data : any;

  switch (widgetType) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        query:"users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        query: 'products',
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        query: 'users',
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "PRODUCTS",
        query:"products",
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  useEffect(()=>{
    const fetchData = async()=>{
      const today = new Date()
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));
      
      const lastMonthQuery = query(
        collection(db, data.query), 
        where('timeStamp', '<=', today),
        where('timeStamp', '>', lastMonth)
        )

      const prevMonthQuery = query(
        collection(db, data.query), 
        where('timeStamp', '<=', lastMonth),
        where('timeStamp', '>', prevMonth)
        )
      
      const lastMonthData = await getDocs(lastMonthQuery)
      const prevMonthData = await getDocs(prevMonthQuery)

      setAmount(lastMonthData.docs.length)
      setDiff(
        ((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) *
          100
      );
    }
    
    fetchData()
  },[])

  console.log({diff})

  return (
    <div className='widget'>
      <div className="left">
        <span className="title">{data?.title}</span>
        <div className="counter">
          {data?.isMoney && "$" } {amount}
        </div>
        <div className="link">{data?.link}</div>
      </div>
      <div className="right">
        <div className={`percentage ${diff > 0 ? 'positive' : 'negative'}`}>
          {
            diff > 0 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
          {diff} %
        </div>
        {data?.icon}
      </div>
    </div>
  )
}

export default Widget