import { useState } from "react";
import cx from "classnames";

import styles from "./userInput.module.css";

const UserInput = (props) => {
  const {
    containerStyle,
    inputStyle,
    buttonStyle,
    initialValue,
    placeholder,
    buttonText,
    onSubmit,
  } = props;
  const [value, setValue] = useState(initialValue || "");

  const handleAddTask = () => {
    if (value.length === 0) return;

    onSubmit(value);
    setValue("");
  };

  const handleEnterPress = (event) => {
    if (event?.key !== "Enter") return;

    handleAddTask();
  };

  return (
    <div className={cx(styles.containerStyle, containerStyle)}>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className={cx(styles.inputContainer, inputStyle)}
        placeholder={placeholder}
        onKeyDown={handleEnterPress}
        autoFocus
      />
      <div
        onClick={handleAddTask}
        className={cx(styles.buttonStyle, buttonStyle)}
      >
        {buttonText}
      </div>
    </div>
  );
};

export default UserInput;
