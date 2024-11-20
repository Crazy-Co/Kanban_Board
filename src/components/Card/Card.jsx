import React from "react";
import "./Card.css";
import { Icon } from "../../Actions/IconUtils";

const Card = ({ id, title, tag, status, priority }) => {
  // Constants
  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";

  const statusIcons = {
    Backlog: "backlog",
    Todo: "toDo",
    "In progress": "inProgress",
    Done: "done",
  };

  const priorityIcons = {
    1: "lowPriority",
    2: "mediumPriority",
    3: "highPriority",
    4: "urgentPriorityGrey",
    default: "noPriority",
  };

  // Render Functions
  const renderStatusIcon = (status) => {
    return <Icon name={statusIcons[status] || null} />;
  };

  const renderPriorityIcon = (priority) => {
    return <Icon name={priorityIcons[priority] || priorityIcons.default} />;
  };

  const renderTags = (tags) => {
    return tags?.map((element, index) => (
      <div key={index} className="tags color-grey">
        <span style={{ paddingRight: "3px" }}>• </span>
        {element}
      </div>
    ));
  };

  return (
    <div className="cardContainer flex-gap-10" style={{ gap: "5px" }}>
      {/* Card Heading */}
      <div className="cardHeading flex-sb">
        <span className="color-grey" style={{ textTransform: "uppercase" }}>
          {id}
        </span>
        {(isPriority || isStatus) && (
          <div
            className="imageContainer relative"
            style={{ width: "30px", height: "30px" }}
          >
            <img
              src="https://xsgames.co/randomusers/avatar.php?g=male"
              alt="User"
              style={{ width: "95%", height: "95%", borderRadius: "50%" }}
            />
            <div className="showStatus"></div>
          </div>
        )}
      </div>

      {/* Card Title */}
      <div className="cardTitle" style={{ fontWeight: 200 }}>
        {!isStatus && renderStatusIcon(status)}
        <span>{title}</span>
      </div>

      {/* Card Tags */}
      <div className="cardTags">
        {!isPriority && (
          <div className="tags color-grey">{renderPriorityIcon(priority)}</div>
        )}
        {renderTags(tag)}
      </div>
    </div>
  );
};

export default Card;
