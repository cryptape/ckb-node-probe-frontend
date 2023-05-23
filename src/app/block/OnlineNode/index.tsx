import styles from './index.module.scss';
interface OnlineNodeProps {
  nodes: number;
}

const OnlineNode: React.FC<OnlineNodeProps> = ({ nodes }) => {
  return (
    <div className={styles.onlineNode}>
      <h1>{nodes}</h1>
      <p>Detected online node</p>
    </div>
  )
}

export default OnlineNode;
