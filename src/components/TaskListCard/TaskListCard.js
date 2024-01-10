import { useCallback } from "react";
import uuid from "react-uuid";
import { Draggable, Droppable } from "react-beautiful-dnd";

import UserInput from "../UserInput";
import CardHeader from "./components/CardHeader";
import TaskList from "./components/TaskList";

import styles from "./taskListCard.module.css";

const TaskListCard = (props) => {
  const {
    listId,
    index,
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
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          className={styles.parentContainer}
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={provided.draggableProps.style}
        >
          <CardHeader
            listName={listName}
            listId={listId}
            onTaskListDelete={onTaskListDelete}
            onListNameEdit={onListNameEdit}
            {...provided.dragHandleProps}
          />
          <div style={{ marginTop: "12px" }} />
          <UserInput
            containerStyle={styles.userInputContainerStyle}
            placeholder={"What is the task?"}
            buttonText={"Add Task"}
            onSubmit={handleAddNewTask}
          />
          <Droppable droppableId={listId} type="droppableSubItem">
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
      )}
    </Draggable>
  );
};

export default TaskListCard;
