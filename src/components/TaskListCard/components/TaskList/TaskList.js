import { useCallback } from "react";

import ListItem from "../../../ListItem";
import UserInput from "../../../UserInput";

import styles from "./taskList.module.css";

const TaskList = (props) => {
  const { taskList, listId, onTaskListUpdate } = props;

  const handleTaskEditSubmit = useCallback(
    (selectedId) => (taskValue) => {
      const updatedTaskList = taskList.map((taskInfo) => {
        const { id } = taskInfo || {};
        if (id !== selectedId) return taskInfo;

        return {
          ...taskInfo,
          value: taskValue,
          editMode: false,
        };
      });

      onTaskListUpdate(listId, updatedTaskList);
    },
    [listId, onTaskListUpdate, taskList]
  );

  const handleEditButtonClick = useCallback(
    (selectedId) => {
      const updatedTaskList = taskList.map((taskInfo) => {
        const { id } = taskInfo || {};
        if (id !== selectedId) return taskInfo;

        return {
          ...taskInfo,
          editMode: true,
        };
      });

      onTaskListUpdate(listId, updatedTaskList);
    },
    [listId, onTaskListUpdate, taskList]
  );

  const handleTaskDelete = useCallback(
    (selectedId) => {
      const updatedTaskList = taskList.filter((taskInfo) => {
        const { id } = taskInfo || {};
        return id !== selectedId;
      });

      onTaskListUpdate(listId, updatedTaskList);
    },
    [listId, onTaskListUpdate, taskList]
  );

  const handleToggleCompleted = useCallback(
    (selectedId) => {
      const updatedTaskList = taskList.map((taskInfo) => {
        const { id, isTaskCompleted = false } = taskInfo || {};
        if (id !== selectedId) return taskInfo;

        return {
          ...taskInfo,
          isTaskCompleted: !isTaskCompleted,
        };
      });
      onTaskListUpdate(listId, updatedTaskList);
    },
    [listId, onTaskListUpdate, taskList]
  );

  return taskList.map((taskInfo) => {
    const { editMode, value, id } = taskInfo || {};

    return editMode ? (
      <>
        <div style={{ marginTop: "12px" }} />
        <UserInput
          containerStyle={styles.userInputContainerStyle}
          initialValue={value}
          buttonText={"Update Task"}
          onSubmit={handleTaskEditSubmit(id)}
        />
      </>
    ) : (
      <>
        <div style={{ marginTop: "12px" }} />
        <ListItem
          key={id}
          taskInfo={taskInfo}
          onToggleCompleted={handleToggleCompleted}
          onEditButtonClick={handleEditButtonClick}
          onDeleteButtonClick={handleTaskDelete}
        />
      </>
    );
  });
};

export default TaskList;
