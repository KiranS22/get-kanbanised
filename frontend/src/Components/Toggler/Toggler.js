import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../Redux/features/Slices/Toggler/Toggler";

const Toggler = () => {
  const defaultMode = JSON.parse(localStorage.getItem("mode"));
  const [checked, setChecked] = useState(defaultMode ?? false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleTheme(checked));
  }, []);
  const toggleModes = (e) => {
    let c = e.target.checked;
    setChecked(c);
    localStorage.setItem("mode", JSON.stringify(c));
    dispatch(toggleTheme(c));
  };

  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          value={checked}
          onChange={toggleModes}
          id="flexSwitchCheckDefault"
        />
        <label
          className="form-check-label"
          htmlFor="flexSwitchCheckDefault"
        ></label>
      </div>
    </>
  );
};

export default Toggler;
