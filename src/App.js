import { useState } from "react";
import uuid from "react-uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TaskListCard from "./components/TaskListCard";
import UserInput from "./components/UserInput";

import { handleDragEnd } from "./app.helpers";
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
    handleDragEnd({ result, setListData });
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
        <Droppable
          droppableId="taskListContainer"
          direction="horizontal"
          type="droppableItem"
        >
          {(provided) => (
            <div
              className={styles.taskListContainer}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {listData.map((todoList, index) => {
                const { listId, listName, taskList } = todoList;
                return (
                  <TaskListCard
                    key={listId}
                    index={index}
                    listId={listId}
                    listName={listName}
                    taskList={taskList}
                    onTaskListUpdate={handleTaskListUpdated}
                    onTaskListDelete={handleTaskListDelete}
                    onListNameEdit={handleListNameEdit}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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
