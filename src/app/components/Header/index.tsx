"use client";
import { useState } from 'react';
import { Drawer, Dropdown, Popover, Space } from 'antd';
import { CloseOutlined, DownOutlined, MenuOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Icon from './icon.png';
import styles from './index.module.scss';

interface HeaderProps {
  type: string;
  setType: (type: string) => void;
}

const Header: React.FC<HeaderProps> = ({ type, setType }) => {
  const [open, setOpen] = useState(false);
  const items = [
    {
      label: 'Mirana (CKB Mainnet)',
      key: 'mirana',
      onClick: () => setType('mirana')
    },
    {
      label: 'Pudge (CKB Testnet)',
      key: 'pudge',
      onClick: () => setType('pudge')
    }
  ]

  return (
    <header className={styles.header}>
      <div className={`ckb-container ${styles.container}`}>
        <div className={styles.logo}>
          <Image src={Icon} alt='LOGO' />
          <span className={styles.title}>CKB Full Nodes</span>
          <Popover placement="bottomLeft" content={<>
            <strong>What is a full node?</strong>
            <br />
            <a href="https://docs.nervos.org/">docs.nervos.org</a>
          </>}>
            <QuestionCircleOutlined />
          </Popover>
        </div>
        <div className={styles.right}>
          <div className={styles.menu}>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>{items.filter(item => item.key === type)[0].label}<DownOutlined /></Space>
              </a>
            </Dropdown>
          </div>
          <div className={styles.mobile}>
            <MenuOutlined onClick={() => setOpen(true)} />
          </div>
          <Drawer
            title={null}
            placement={'left'}
            closable={false}
            width={'60vw'}
            rootStyle={{ zIndex: 10001 }}
            onClose={() => setOpen(false)}
            open={open}
            className={styles.mobileDrawer}
          >
            <CloseOutlined className={styles.close} onClick={() => setOpen(false)} />
            <ul>
              { items.map((item) => <li key={item.key} onClick={item.onClick}>{item.label}</li>) }
            </ul>
          </Drawer>
        </div>
      </div>
    </header>
  )
}

export default Header;
