import AdminHeader from "../../AdminComponents/header";
import LeftBar from "../../AdminComponents/header/LeftBar";
import {Grid ,makeStyles}  from "@material-ui/core"
import UserDetails from "./UserDetails";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({}))



export default function AdminHome() {
  const {admin } =useSelector((state)=>({...state}))
  console.log(admin);
  const classes = useStyles()
    return (
      <div>
        <AdminHeader/>
      
        <Grid container>
        <Grid item sm={2}>
        <LeftBar/>
  </Grid>
  <Grid item sm={10}>
  <UserDetails admin={admin}/>
  </Grid>
  </Grid>
     
      </div>
    )
  }
  