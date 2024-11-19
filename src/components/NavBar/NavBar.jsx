import React, { useEffect, useState } from "react";
import { Icon } from "../../Actions/IconUtils";
import "./NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { selectData } from "../../Actions/DataAction";
localStorage.setItem("group", "status");
localStorage.setItem("order", "priority");
const getOrder = () => {
  if (localStorage.getItem("order")) {
    return localStorage.getItem("order");
  } else {
    return "priority";
  }
};
const getGroup = () => {
  if (localStorage.getItem("group")) {
    return localStorage.getItem("group");
  } else {
    return "status";
  }
};
const NavBar = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);
  const [groupValue, setGroupValue] = useState(getGroup());
  const [orderValue, setOrderValue] = useState(getOrder());
  const handleGroupValue = (e, valueBool) => {
    if (valueBool) {
      setGroupValue(e.target.value);
      setDisplayOnClick(!displayOnClick);
      localStorage.setItem("group", e.target.value);
    } else {
      setOrderValue(e.target.value);
      setDisplayOnClick(!displayOnClick);
      localStorage.setItem("order", e.target.value);
    }
  };
  useEffect(() => {
    if (groupValue === "user") {
      dispatch(
        selectData(
          groupValue,
          {
            allTickets,
            allUser,
          },
          orderValue
        )
      );
    } else {
      dispatch(selectData(groupValue, allTickets, orderValue));
    }
  }, [allTickets, dispatch, groupValue, allUser, orderValue]);
  return (
    <div
      className="top-header"
      style={{
        paddingLeft: "50px",
        paddingTop: "10px",
        paddingRight: "30px",
        paddingBottom: "10px",
        borderBottom: "2px solid #e3e3e3",
      }}
    >
      <div className="displayButton">
        <button
          className="p-10 f-16 btn"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          {" "}
          <Icon name="display" /> Display <Icon name="down" />
        </button>
        {displayOnClick && (
          <>
            <div className="dropOnClick flex-gap-10 p-10">
              <div className="selectGroup flex-sb">
                <span style={{ fontSize: "14px", color: "#555B5A" }}>
                  Grouping
                </span>
                <select
                  value={groupValue}
                  onChange={(e) => handleGroupValue(e, true)}
                  className="selectStyle"
                  name="group"
                  id="group"
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="selectGroup flex-sb">
                <span style={{ fontSize: "14px", color: "#555B5A" }}>
                  Ordering
                </span>
                <select
                  value={orderValue}
                  onChange={(e) => handleGroupValue(e, false)}
                  className="selectStyle"
                  name="order"
                  id="order"
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default NavBar;
