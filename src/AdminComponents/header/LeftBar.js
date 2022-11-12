
import {Container,makeStyles,TablePagination,Typography} from "@material-ui/core"
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import UserDetails from "../../AdminPages/home/UserDetails";




const useStyles = makeStyles((theme) =>({
container:{
    height:"100vh",
    color:"white",
    paddingTop:theme.spacing(10),
    backgroundColor:theme.palette.primary.main
},
item:{
    display:"flex",
    alignItems:"center",
    marginBottom:theme.spacing(4),
    [theme.breakpoints.up("sm")]:{
        marginBottom:theme.spacing(3),
        cursor:"pointer"
    }
},
icon:{
marginRight:theme.spacing(1),
[theme.breakpoints.up("sm")]:{
    fontSize:"18px",
}
},
text:{
    fontWeight:500,
    [theme.breakpoints.down("sm")]:{
        display:"none"
    },
}

}))

export default function LeftBar() {

const classes = useStyles()


  return (
    
    <Container className={classes.container}>
   <div className={classes.item}>
<HomeIcon className={classes.icon}/>
<Typography className={classes.text}>
Homepage
</Typography>
   </div>
   <div className={classes.item}>
< GroupIcon className={classes.icon}/>
<Typography className={classes.text}>
UserDetails

</Typography>
   </div>
   <div className={classes.item}>
<HomeIcon className={classes.icon}/>
<Typography className={classes.text}>
Homepage
</Typography>
   </div>
   <div className={classes.item}>
<HomeIcon className={classes.icon}/>
<Typography className={classes.text}>
Homepage
</Typography>
   </div>
 
    </Container>
  )
}
