import React, { useState, useEffect } from "react";
import { selectTheme } from "../../Redux/features/Slices/Toggler/Toggler";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/utils";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
const Register = () => {
  const mode = useSelector(selectTheme);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
    tel: "",
    address: "",
    city: "",
    postcode: "",
  });
  const [value, setValue] = useState("");
  const [errMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
 
    e.preventDefault();
    const data = await registerUser(user, value);

    const status = data.status;
    const message = data.message;
    if (status === "success") {
      navigate("/login");
    } else {
      setErrorMessage(message);

      setInterval(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <section id={`content-${mode}`}>
        <div className="container-fluid ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://labyrinthinc.com/wp-content/uploads/2019/12/registery-your-charity.jpg"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <h4 className={`content-error-${mode}`}>{errMessage}</h4>
              <form onSubmit={(e) => handleSubmit(e)} method="POST">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"></div>

                <div className="divider d-flex align-items-center my-4"></div>

                <label className="form-label" htmlFor="firstName">
                  First Name:
                </label>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="firstName"
                    className="form-control form-control-lg"
                    placeholder="Enter your First Name"
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                    name="firstName"
                    required
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="lastName">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control form-control-lg"
                    placeholder="Enter your Last Name"
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                    name="lastName"
                    required
                  />
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="lname">
                    Email:
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
                    required
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
                    required
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="verify-password">
                    Re-Enter Password
                  </label>
                  <input
                    type="password"
                    id="verify-password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    minLength="6"
                    value={user.verifyPassword}
                    onChange={(e) =>
                      setUser({ ...user, verifyPassword: e.target.value })
                    }
                    name="verify-password"
                    required
                  />
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="tel">
                    Mobile Number
                  </label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="country">
                    Address
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    className="form-control form-control-lg"
                    placeholder="Address"
                    value={user.address}
                    onChange={(e) =>
                      setUser({ ...user, address: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control form-control-lg"
                    placeholder="city"
                    value={user.city}
                    onChange={(e) => setUser({ ...user, city: e.target.value })}
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="city">
                    Postcode
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control form-control-lg"
                    placeholder="postcode"
                    value={user.postcode}
                    onChange={(e) =>
                      setUser({ ...user, postcode: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className={
                      mode == "light"
                        ? `btn btn-primary btn-sm my-2 text-end`
                        : `btn btn-outline-info btn-sm my-2 text-end`
                    }
                  >
                    Register
                  </button>

                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="link-danger">
                      Log In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
