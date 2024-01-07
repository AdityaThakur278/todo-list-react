import { useCallback } from "react";
import cx from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./listItem.module.css";

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
    <div className={styles.listItemContainer}>
      <p
        onClick={handleToggleCompleted}
        className={cx(styles.todoText, {
          [styles.completedText]: isTaskCompleted,
        })}
      >
        {value}
      </p>
      <div>
        <FontAwesomeIcon
          className={styles.editIcon}
          icon={faPenToSquare}
          onClick={handleEditButtonClick}
        />
        <FontAwesomeIcon
          className={styles.deleteIcon}
          icon={faTrash}
          onClick={handleDeleteButtonClick}
        />
      </div>
    </div>
  );
};

export default ListItem;
