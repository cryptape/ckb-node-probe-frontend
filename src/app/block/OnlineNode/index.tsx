import { Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
interface OnlineNodeProps {
  nodes: number;
}

const OnlineNode: React.FC<OnlineNodeProps> = ({ nodes }) => {
  return (
    <div className={styles.onlineNode}>
      <h1>{nodes}</h1>
      <p>
        Nodes
        <Popover placement="bottomLeft" content={<>
          <strong>What is a full node?</strong>
          <br />
          <a href="https://docs.nervos.org/">docs.nervos.org</a>
        </>}>
          <QuestionCircleOutlined />
        </Popover>
      </p>
    </div>
  )
}

export default OnlineNode;
