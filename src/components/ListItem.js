import { useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ListItem = (props) => {
  const {
    taskInfo,
    onEditButtonClick,
    onDeleteButtonClick,
    onToggleCompleted,
  } = props;
  const { value, id, isTaskCompleted } = taskInfo || {};

  const handleEditButtonClick = useCallback(() => {
    onEditButtonClick(id);
  }, [onEditButtonClick, id]);

  const handleDeleteButtonClick = useCallback(() => {
    onDeleteButtonClick(id);
  }, [onDeleteButtonClick, id]);

  const handleToggleCompleted = useCallback(() => {
    onToggleCompleted(id);
  }, [onToggleCompleted, id]);

  return (
    <div className="list-item-container">
      <p
        onClick={handleToggleCompleted}
        className={`todo-text ${isTaskCompleted ? "completed-text" : ""}`}
      >
        {value}
      </p>
      <div>
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={handleEditButtonClick}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={handleDeleteButtonClick}
        />
      </div>
    </div>
  );
};

export default ListItem;
