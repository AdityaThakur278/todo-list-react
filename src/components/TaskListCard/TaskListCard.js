import { useCallback } from "react";
import uuid from "react-uuid";
import { Droppable } from "react-beautiful-dnd";

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
    <div className={styles.parentContainer}>
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
      <Droppable droppableId={listId}>
        {(provided) => (
          <div
            className={styles.taskListContainer}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <TaskList
              taskList={taskList}
              listId={listId}
              onTaskListUpdate={onTaskListUpdate}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskListCard;
