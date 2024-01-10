const handleDragEndForListItem = ({ result, setListData }) => {
  const { source, destination } = result;

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

const handleDragEndForCard = ({ result, setListData }) => {
  const { source, destination } = result;

  const sourceListIndex = source?.index;
  const destinationListIndex = destination?.index;
  setListData((currentListData) => {
    const listData = currentListData[sourceListIndex];
    currentListData.splice(sourceListIndex, 1);
    currentListData.splice(destinationListIndex, 0, listData);
    return currentListData;
  });
};

export const handleDragEnd = ({ result, setListData }) => {
  const { destination, type } = result;

  if (!destination) return;

  if (type === "droppableItem") {
    handleDragEndForCard({ result, setListData });
  } else if (type === "droppableSubItem") {
    handleDragEndForListItem({ result, setListData });
  }
};
