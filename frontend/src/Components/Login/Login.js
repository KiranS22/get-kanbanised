import React from "react";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { selectIsLoggedIn } from "../../Redux/features/Slices/Auth/Auth";
import { logInUser } from "../../Redux/features/Slices/Auth/Auth";
import { userLogin } from "../../utils/utils";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errMessage, setErrorMessage] = useState("");
  const loggedIn = useSelector(selectIsLoggedIn);
  const userAlreadyLoggedIn = () => {
    if (loggedIn) {
      navigate("/");
    }
  };

  useEffect(() => {
    userAlreadyLoggedIn();
  }, [loggedIn]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await userLogin(user);
   
    const status = data.status;
    const message = data.message;
    if (status === "success") {
      const { user, token } = data;
      dispatch(logInUser({ token, user }));

      navigate("/");
    } else {
      setErrorMessage(message);

      setInterval(() => {
        setErrorMessage("");
      }, 3000);
    }
  };
  const mode = useSelector(selectTheme);
  return (
    <>
      <div className="container" id={`content-${mode}`}>
        {" "}
        <section className="vh-100 container">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://jobs.rhacc.ac.uk/Upload/Content/images/122/login.png"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"></div>
                {errMessage != "" ? (
                  <h4 className={`content-error-${mode}`}>{errMessage}</h4>
                ) : null}
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="divider d-flex align-items-center my-4"></div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="Enter a valid email address"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      name="email"
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      name="password"
                    />
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="sumbit"
                      className={
                        mode == "light"
                          ? `btn btn-primary btn-sm my-2 text-end`
                          : `btn btn-outline-info btn-sm my-2 text-end`
                      }
                      onClick={(e) => handleSubmit(e)}
                    >
                      Login
                    </button>

                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account?{" "}
                      <Link to="/register" className="link-danger">
                        Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
