import React from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const AlertMessage = ({type,message}) => {
  let icon;
  let bgColor;
  let textColor;
  let borderLeftColor;

  switch (type) {
    case "error":
      icon = <AiOutlineCloseCircle className="text-red-600 text-2xl" />;
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      borderLeftColor = "border-l-4 border-red-600";
      break;
    case "success":
      icon = <AiOutlineCheckCircle className="text-green-600 text-2xl" />;
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      borderLeftColor = "border-l-4 border-green-600";
      break;
    case "loading":
        icon = <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-2xl"/>
        bgColor= "bg-blue-100"
        textColor= "text-blue-800"
        borderLeftColor = "border-l-4 border-blue-600"
        break;
  }
  return <div className={`flex items-center p-2 space-x-3 rounded-lg ${bgColor} ${textColor} ${borderLeftColor}`}>
    {icon} 
    <span className="text-sm font-medium"> {message} </span>
  </div>;
};

export default AlertMessage;
