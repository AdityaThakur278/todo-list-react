import { useState, useCallback } from "react";

const AddTask = (props) => {
  const { initialTaskValue, onAddTask } = props;
  const [taskValue, setTaskValue] = useState(initialTaskValue || "");

  const handleTaskValueChange = useCallback((event) => {
    setTaskValue(event?.target?.value);
  }, []);

  const handleAddTask = useCallback(() => {
    if (taskValue.length === 0) return;

    onAddTask(taskValue);
    setTaskValue("");
  }, [taskValue, onAddTask]);

  const handleEnterPress = useCallback(
    (event) => {
      if (taskValue?.length === 0 || event?.key !== "Enter") return;

      onAddTask(taskValue);
      setTaskValue("");
    },
    [taskValue, onAddTask],
  );

  return (
    <div className="add-task-container">
      <input
        value={taskValue}
        onChange={handleTaskValueChange}
        className="input-container"
        placeholder="What is the task today?"
        onKeyDown={handleEnterPress}
      />
      <div onClick={handleAddTask} className="add-task-button">
        Add Task
      </div>
    </div>
  );
};

export default AddTask;
