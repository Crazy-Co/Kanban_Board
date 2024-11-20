import React from "react";
import { useSelector } from "react-redux";

// Icons
import { Icon } from "../../Actions/IconUtils";

// Styles and Components
import "./DashBoard.css";
import Card from "../Card/Card";

const DashBoard = () => {
  // Determine grouping type from localStorage
  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";

  // Redux state
  const { selectedData, user } = useSelector(
    (state) => state.SelectDataReducer
  );

  console.log("status:", isStatus, "priority:", isPriority, "user:", user);

  // Utility function to render icons based on title
  const renderIcon = (title, type) => {
    if (type === "status") {
      switch (title) {
        case "Backlog":
          return <Icon name="backlog" />;
        case "Todo":
          return <Icon name="toDo" />;
        case "In progress":
          return <Icon name="inProgress" />;
        case "Done":
          return <Icon name="done" />;
        default:
          return null;
      }
    }
    if (type === "priority") {
      switch (title) {
        case "High":
          return <Icon name="highPriority" />;
        case "Medium":
          return <Icon name="mediumPriority" />;
        case "Low":
          return <Icon name="lowPriority" />;
        case "Urgent":
          return <Icon name="urgentPriorityColor" />;
        case "No priority":
          return <Icon name="noPriority" />;
        default:
          return null;
      }
    }
    return null;
  };

  // Render static sections for status grouping
  const renderStaticSections = () =>
    ["Done", "Cancelled"].map((status) => (
      <div
        className="dashCardHeading flex-sb"
        key={status}
        // style={{ border: "2px solid" }}
      >
        <div
          className="leftView"
          style={{
            fontSize: "15px",
            marginRight: "90px",
            wordSpacing: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name={status.toLowerCase()} />
          <span className="cardTitle">{status}</span>
          <span className="cardCount">0</span>
        </div>
        <div className="rightView">
          <Icon name="add" />
          <Icon name="threeDotMenu" />
        </div>
      </div>
    ));

  return (
    selectedData && (
      <div className="dashContainer">
        {/* Dynamic Cards */}
        {selectedData.map((element, index) => (
          <div
            key={index}
            className="dashCardContainer"
            style={{ width: "18.7%" }}
          >
            {/* Card Header */}
            <div className="dashCardHeading flex-sb">
              <div className="leftView">
                {user ? (
                  <div className="imageContainer">
                    <img
                      className="userAvatar"
                      src="https://xsgames.co/randomusers/avatar.php?g=male"
                      alt="User"
                    />

                    <div className="showStatus"></div>
                  </div>
                ) : (
                  renderIcon(
                    element[index]?.title,
                    isStatus ? "status" : isPriority ? "priority" : null
                  )
                )}
                <span className="cardTitle">{element[index]?.title}</span>
                <span className="cardCount">
                  {element[index]?.value?.length}
                </span>
              </div>
              <div className="rightView">
                <Icon name="add" />
                <Icon name="threeDotMenu" />
              </div>
            </div>

            {/* Card Content */}
            <div className="dashList">
              {element[index]?.value?.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  tag={item.tag}
                  status={item.status}
                  priority={item.priority}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Static Sections for Status */}
        {isStatus && renderStaticSections()}
      </div>
    )
  );
};

export default DashBoard;
