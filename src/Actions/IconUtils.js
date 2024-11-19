// src/utils/iconUtils.js
import threeDotMenu from "../assets/icons/3 dot menu.svg";
import add from "../assets/icons/add.svg";
import backlog from "../assets/icons/Backlog.svg";
import cancelled from "../assets/icons/Cancelled.svg";
import display from "../assets/icons/Display.svg";
import done from "../assets/icons/Done.svg";
import down from "../assets/icons/down.svg";
import highPriority from "../assets/icons/Img - High Priority.svg";
import lowPriority from "../assets/icons/Img - Low Priority.svg";
import mediumPriority from "../assets/icons/Img - Medium Priority.svg";
import inProgress from "../assets/icons/in-progress.svg";
import noPriority from "../assets/icons/No-priority.svg";
import urgentPriorityColor from "../assets/icons/SVG - Urgent Priority colour.svg";
import urgentPriorityGrey from "../assets/icons/SVG - Urgent Priority grey.svg";
import toDo from "../assets/icons/To-do.svg";

// Icon mapping object
export const ICONS = {
  threeDotMenu,
  add,
  backlog,
  cancelled,
  display,
  done,
  down,
  highPriority,
  lowPriority,
  mediumPriority,
  inProgress,
  noPriority,
  urgentPriorityColor,
  urgentPriorityGrey,
  toDo,
};

// Icon component that renders the appropriate SVG
export const Icon = ({ name, className = "", ...props }) => {
  const IconComponent = ICONS[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <img src={IconComponent} className={className} alt={name} {...props} />
  );
};

// Helper function to get icon URL
export const getIconUrl = (name) => ICONS[name] || null;
