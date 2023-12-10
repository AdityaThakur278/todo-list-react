import { useState, useCallback } from "react";
import uuid from "react-uuid";

import AddTask from "./components/AddTask";
import ListItem from "./components/ListItem";
import "./styles.css";

export default function App() {
  const [taskList, setTaskList] = useState([]);

  const handleAddNewTask = useCallback((taskValue) => {
    setTaskList((currentList) => [
      {
        value: taskValue,
        id: uuid(),
        editMode: false,
      },
      ...currentList,
    ]);
  }, []);

  const handleTaskEditSubmit = useCallback(
    (selectedId) => (taskValue) => {
      setTaskList((taskList) =>
        taskList.map((taskInfo) => {
          const { id } = taskInfo || {};
          if (id !== selectedId) return taskInfo;

          return {
            ...taskInfo,
            value: taskValue,
            editMode: false,
          };
        }),
      );
    },
    [],
  );

  const handleEditButtonClick = useCallback((selectedId) => {
    setTaskList((taskList) =>
      taskList.map((taskInfo) => {
        const { id } = taskInfo || {};
        if (id !== selectedId) return taskInfo;

        return {
          ...taskInfo,
          editMode: true,
        };
      }),
    );
  }, []);

  const handleTaskDelete = useCallback((selectedId) => {
    setTaskList((taskList) =>
      taskList.filter((taskInfo) => {
        const { id } = taskInfo || {};
        return id !== selectedId;
      }),
    );
  }, []);

  const handleToggleCompleted = useCallback((selectedId) => {
    setTaskList((taskList) =>
      taskList.map((taskInfo) => {
        const { id, isTaskCompleted = false } = taskInfo || {};
        if (id !== selectedId) return taskInfo;

        return {
          ...taskInfo,
          isTaskCompleted: !isTaskCompleted,
        };
      }),
    );
  }, []);

  return (
    <div className="app">
      <p className="header-title">Get Things Done !</p>
      <div style={{ marginTop: "12px" }} />
      <AddTask initialTaskValue="" onAddTask={handleAddNewTask} />
      {taskList.map((taskInfo) => {
        const { editMode, value, id } = taskInfo || {};

        return editMode ? (
          <>
            <div style={{ marginTop: "12px" }} />
            <AddTask
              key={id}
              initialTaskValue={value}
              onAddTask={handleTaskEditSubmit(id)}
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
      })}
    </div>
  );
}
