import video from "./demo.mp4";
import styles from "./demoModal.module.css";

const DemoModal = (props) => {
  const { isVisible, setIsDemoModalVisible } = props;

  if (!isVisible) return null;

  return (
    <div
      onClick={() => setIsDemoModalVisible(false)}
      className={styles.parentContainer}
    >
      <video
        width="750"
        height="500"
        controls
        onClick={(event) => event.stopPropagation()}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default DemoModal;
