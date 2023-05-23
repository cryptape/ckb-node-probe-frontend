"use client";
import { useState } from 'react';
import { Drawer, Dropdown, Space } from 'antd';
import { CloseOutlined, DownOutlined, MenuOutlined } from '@ant-design/icons';
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
      label: 'mirana',
      key: 'mirana',
      onClick: () => setType('mirana')
    },
    {
      label: 'pudge',
      key: 'pudge',
      onClick: () => setType('pudge')
    }
  ]

  return (
    <header className={styles.header}>
      <div className={`ckb-container ${styles.container}`}>
        <div className={styles.logo}>
          <Image src={Icon} alt='LOGO' />
          <span>CKB Full Node Probe</span>
        </div>
        <div className={styles.right}>
          <div className={styles.menu}>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>{type}<DownOutlined /></Space>
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
            width={'40vw'}
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
