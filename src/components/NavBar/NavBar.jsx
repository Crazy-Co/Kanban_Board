import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../Actions/IconUtils";
import { selectData } from "../../Actions/DataAction";
import "./NavBar.css";

// Utility Functions for Local Storage
const getLocalStorageValue = (key, defaultValue) => {
  return localStorage.getItem(key) || defaultValue;
};

const setLocalStorageValue = (key, value) => {
  localStorage.setItem(key, value);
};

// Component
const NavBar = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null); // Reference for the dropdown

  // Redux State
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);

  // Local State
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const [groupValue, setGroupValue] = useState(
    getLocalStorageValue("group", "status")
  );
  const [orderValue, setOrderValue] = useState(
    getLocalStorageValue("order", "priority")
  );

  // Handlers
  const handleGroupValueChange = (e, isGroup) => {
    const newValue = e.target.value;
    if (isGroup) {
      setGroupValue(newValue);
      setLocalStorageValue("group", newValue);
    } else {
      setOrderValue(newValue);
      setLocalStorageValue("order", newValue);
    }
    setDisplayOnClick(false);
  };

  // Effect: Update Redux State when groupValue or orderValue changes
  useEffect(() => {
    if (groupValue === "user") {
      dispatch(selectData(groupValue, { allTickets, allUser }, orderValue));
    } else {
      dispatch(selectData(groupValue, allTickets, orderValue));
    }
  }, [groupValue, orderValue, allTickets, allUser, dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDisplayOnClick(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Render
  return (
    <div
      className="top-header"
      style={{
        padding: "10px 30px 10px 50px",
        borderBottom: "2px solid #e3e3e3",
      }}
    >
      <div className="displayButton" ref={dropdownRef}>
        {/* Display Button */}
        <button
          className="p-10 f-16 btn"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          <Icon name="display" /> Display <Icon name="down" />
        </button>

        {/* Dropdown Menu */}
        {displayOnClick && (
          <div className="dropOnClick flex-gap-10 p-10">
            {/* Grouping Select */}
            <div className="selectGroup flex-sb">
              <span className="label">Grouping</span>
              <select
                value={groupValue}
                onChange={(e) => handleGroupValueChange(e, true)}
                className="selectStyle"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            {/* Ordering Select */}
            <div className="selectGroup flex-sb">
              <span className="label">Ordering</span>
              <select
                value={orderValue}
                onChange={(e) => handleGroupValueChange(e, false)}
                className="selectStyle"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
