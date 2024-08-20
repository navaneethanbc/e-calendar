import React from "react";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputField = ({
  userID,
  validID,
  focusT,
  focusF,
  type,
  placeholder,
  text,
  onChange,
  value,
}) => {
  return (
    <div className="m-3">
      <label htmlFor={userID}>
        <FontAwesomeIcon
          icon={faCheck}
          className={!(!validID || value === "") ? "text-green-700" : "hidden"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={!validID && value ? "text-red-600" : "hidden"}
        />
      </label>
      <input
        type={type}
        id={userID}
        placeholder={placeholder}
        required
        autoComplete="on"
        onChange={onChange}
        value={value}
        aria-invalid={validID ? "false" : "true"}
        aria-describedby={`${userID}note`}
        onFocus={focusT}
        onBlur={focusF}
        className="box-content border-2 rounded-md shadow min-w-52 h-6 px-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <p
        id={`${userID}note`}
        className={focus && value && !validID ? "text-gray-600" : "hidden"}
      >
        <FontAwesomeIcon icon={faInfoCircle} /> {text}
      </p>
    </div>
  );
};

export default InputField;
