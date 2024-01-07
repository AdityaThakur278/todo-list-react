import { useState } from "react";
import uuid from "react-uuid";

import TaskListCard from "./components/TaskListCard";
import UserInput from "./components/UserInput";

import styles from "./app.module.css";

export default function App() {
  const [listData, setListData] = useState([]);

  const handleAddList = (listName) => {
    setListData((currentData) => [
      { listId: uuid(), listName, taskList: [] },
      ...currentData,
    ]);
  };

  const handleTaskListUpdated = (listId, updatedTaskList) => {
    setListData((currentData) =>
      currentData.map((currentTaskListData) => {
        const { listId: currentListId } = currentTaskListData;
        if (currentListId === listId)
          return {
            ...currentTaskListData,
            taskList: updatedTaskList,
          };
        return currentTaskListData;
      })
    );
  };

  const handleTaskListDelete = (listId) => {
    setListData((currentData) =>
      currentData.filter((currentTaskListData) => {
        const { listId: currentListId } = currentTaskListData;
        return listId !== currentListId;
      })
    );
  };

  const handleListNameEdit = (listId, updatedListName) => {
    setListData((currentData) =>
      currentData.map((currentTaskListData) => {
        const { listId: currentListId } = currentTaskListData;
        if (currentListId === listId)
          return {
            ...currentTaskListData,
            listName: updatedListName,
          };
        return currentTaskListData;
      })
    );
  };

  return (
    <div className={styles.parentContainer}>
      <UserInput
        containerStyle={styles.userInputContainerStyle}
        inputStyle={styles.userInputStyle}
        buttonStyle={styles.userInputButtonStyle}
        placeholder={"Add new todo list"}
        buttonText={"Add Todo"}
        onSubmit={handleAddList}
      />
      <div className={styles.taskListContainer}>
        {listData.map((todoList) => {
          const { listId, listName, taskList } = todoList;
          return (
            <TaskListCard
              key={listId}
              listId={listId}
              listName={listName}
              taskList={taskList}
              onTaskListUpdate={handleTaskListUpdated}
              onTaskListDelete={handleTaskListDelete}
              onListNameEdit={handleListNameEdit}
            />
          );
        })}
      </div>
    </div>
  );
}

/*
data structure --> [{
  listId: 'uudi1',
  listName: 'list1',
  taskList: [{
    id: 'uuid2',
    value: 'value1,
    editMode: false,
    isTaskCompleted: false,
  }]
}]
*/
