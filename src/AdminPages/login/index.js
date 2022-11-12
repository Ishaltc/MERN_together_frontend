import { Form, Formik } from "formik";
import { useState } from "react";
import LoginInput from "../../components/input/logininput";
import "./style.css";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const Navigate = useNavigate()
  const dispatch = useDispatch();
  const loginInfos = {
    email: "",
    password: "",
  };

  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // const loginSubmit =()=>{

  // }
  const loginValidation = Yup.object({
    email: Yup.string().required("Email address is required").max(100),
    password: Yup.string().required("Password is required"),
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLogin({ ...login, [name]: value });
  };
  const loginSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/adminLogin`,
        {
          email,
          password,
        }
      );
      dispatch({ type: "ADMIN_LOGIN", payload: data });
      Cookies.set("admin", JSON.stringify(data));
      Navigate("/admin/home");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="myClass">
      <img className="side_icon" src="./../icons/together_icon.jpg" alt="" />
      <div className="login_wrap">
        <div className="login_1">
          <span>
            <span className="together_text">Together </span>helping people to
            getting connected
          </span>
        </div>
        <div className="login_2">
          <h2 className="together_text">Admin</h2>
          <div className="login_2_wrap">
            <Formik
              enableReinitialize
              initialValues={{ email, password }}
              validationSchema={loginValidation}
              onSubmit={() => {
                loginSubmit();
              }}
            >
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address"
                  onChange={handleLoginChange}
                />
  {
    error &&  <div className="error_text">{error}</div>
  }
                <LoginInput
                
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
