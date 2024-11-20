import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import DashBoard from "./components/DashBoard/DashBoard";
import Loading from "./components/Loading/Loading";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "./Actions/DataAction";

const App = () => {
  const dispatch = useDispatch();

  // Extracting state from Redux
  const { loading } = useSelector((state) => state.DataReducer);

  // Fetching data on component mount
  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  return (
    <div className="app-container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <NavBar />
          <DashBoard />
        </>
      )}
    </div>
  );
};

export default App;
