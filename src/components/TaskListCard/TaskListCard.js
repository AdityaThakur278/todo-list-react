import { useCallback } from "react";
import uuid from "react-uuid";

import UserInput from "../UserInput";
import CardHeader from "./components/CardHeader";
import TaskList from "./components/TaskList";

import styles from "./taskListCard.module.css";

const TaskListCard = (props) => {
  const {
    listId,
    listName,
    taskList,
    onTaskListUpdate,
    onTaskListDelete,
    onListNameEdit,
  } = props;

  const handleAddNewTask = useCallback(
    (taskValue) => {
      const updatedTaskList = [
        {
          value: taskValue,
          id: uuid(),
          editMode: false,
        },
        ...taskList,
      ];
      onTaskListUpdate(listId, updatedTaskList);
    },
    [listId, onTaskListUpdate, taskList]
  );

  return (
    <div className={styles.app}>
      <CardHeader
        listName={listName}
        listId={listId}
        onTaskListDelete={onTaskListDelete}
        onListNameEdit={onListNameEdit}
      />
      <div style={{ marginTop: "12px" }} />
      <UserInput
        containerStyle={styles.userInputContainerStyle}
        placeholder={"What is the task today?"}
        buttonText={"Add Task"}
        onSubmit={handleAddNewTask}
      />
      <TaskList
        taskList={taskList}
        listId={listId}
        onTaskListUpdate={onTaskListUpdate}
      />
    </div>
  );
};

export default TaskListCard;
