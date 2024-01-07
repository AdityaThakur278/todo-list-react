import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import UserInput from "../../../UserInput";

import styles from "./cardHeader.module.css";

const CardHeader = (props) => {
  const { listName, listId, onTaskListDelete, onListNameEdit } = props;
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDeleteButtonClick = () => {
    onTaskListDelete(listId);
  };

  const handleListNameEdit = (updatedListName) => {
    onListNameEdit(listId, updatedListName);
    setIsEditMode(false);
  };

  return (
    <div className={styles.headerContainer}>
      {isEditMode ? (
        <UserInput
          containerStyle={styles.userInputContainerStyle}
          initialValue={listName}
          buttonText={"Update"}
          onSubmit={handleListNameEdit}
        />
      ) : (
        <>
          <p className={styles.headerTitle}>{listName}</p>
          <div>
            <FontAwesomeIcon
              className={styles.editIcon}
              icon={faPenToSquare}
              onClick={() => setIsEditMode(true)}
            />
            <FontAwesomeIcon
              className={styles.deleteIcon}
              icon={faTrash}
              onClick={handleDeleteButtonClick}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CardHeader;
