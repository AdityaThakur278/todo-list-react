import { useState } from "react";
import uuid from "react-uuid";
import { DragDropContext } from "react-beautiful-dnd";

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

  const onDragEndForListItem = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceListId = source?.droppableId;
    const sourceListItemIndex = source?.index;

    const destinationListId = destination?.droppableId;
    const destinationListItemIndex = destination?.index;

    setListData((currentListData) => {
      const sourceListData = currentListData.find(
        (listData) => sourceListId === listData?.listId
      );
      const destinationListData = currentListData.find(
        (listData) => destinationListId === listData?.listId
      );

      const listItemData = sourceListData?.taskList[sourceListItemIndex];
      sourceListData?.taskList.splice(sourceListItemIndex, 1);
      destinationListData?.taskList.splice(
        destinationListItemIndex,
        0,
        listItemData
      );

      return currentListData.map((listData) => {
        const { listId } = listData;

        if (listId === sourceListId) return sourceListData;
        if (listId === destinationListId) return destinationListData;
        return listData;
      });
    });
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
      <DragDropContext onDragEnd={onDragEndForListItem}>
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
      </DragDropContext>
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
