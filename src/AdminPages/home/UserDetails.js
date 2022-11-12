import { makeStyles } from "@material-ui/core";
import { useState } from "react";

import { useEffect } from "react";

import { userDetails } from "../../functions/admin";


import Moment from "react-moment";
import {
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableBody,
  Button,
  Avatar,
} from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     height: "100vh",
//     paddingTop: theme.spacing(10),
//   },
// }));

export default function UserDetails({ admin }) {
  const [userData, setUserData] = useState([]);



  //getAllUsers function
  const userManagement = async () => {
    const res = await userDetails(admin.token);
    setUserData(res);
   ;
  };

  useEffect(() => {
    userManagement();
  }, []);
  

  //blocking users
const blockUser = ()=> {

}

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };





  // const classes = useStyles();
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop:"5rem"}}>
      <TableContainer sx={{ maxHeight: "86vh", maxWidth:"100vw", minWidth:"87vw"  }}>
        <Table stickyHeader aria-aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Picture</TableCell>
              
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              
            
              <TableCell>DOB</TableCell>
             <TableCell></TableCell>
             <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData &&
              userData.slice(page*rowsPerPage,page*rowsPerPage + rowsPerPage).map((user, i) => (
                <TableRow>
                <TableCell>{rowsPerPage*page + i + 1}</TableCell>
                <TableCell>
                  <Avatar alt={user.username} src={user.picture} />
                </TableCell>
              
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                
               
                <TableCell>
                <Moment format="DD/MM/YY">{user.createdAt}</Moment>
                </TableCell>
                <TableCell align="center">
                  {user.isBlocked ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        blockUser(user._id);
                      }}
                    >
                    
                      UnBlock
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        blockUser(user._id);
                      }}
                    >
                      Block
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    <TablePagination
      rowsPerPageOptions={[10, 15, 25]}
      component="div"
      count={userData.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </TableContainer>

  </Paper>
);
}