import { Route, Routes } from "react-router-dom";
import AdminRouter from "./routes/Admin";
import UserRouter from "./routes/User";


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<UserRouter/>} >
        </Route>
        <Route path="/admin/*" element={<AdminRouter/>} >
        </Route>
      </Routes>
      
    </div>
  )
}
