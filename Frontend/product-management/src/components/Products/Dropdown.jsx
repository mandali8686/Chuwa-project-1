import React, { useState } from 'react';
import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';

const SortDropdown = () => {
  const [selectedKey, setSelectedKey] = useState('last');

  const items = [
    {
      key: 'last',
      label: (
        <span>
          {selectedKey === 'last' && <CheckOutlined style={{ marginRight: 8 }} />}
          Last added
        </span>
      ),
    },
    {
      key: 'priceLow',
      label: (
        <span>
          {selectedKey === 'priceLow' && <CheckOutlined style={{ marginRight: 8 }} />}
          Price: low to high
        </span>
      ),
    },
    {
      key: 'priceHigh',
      label: (
        <span>
          {selectedKey === 'priceHigh' && <CheckOutlined style={{ marginRight: 8 }} />}
          Price: high to low
        </span>
      ),
    },
  ];

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    console.log('Selected:', e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick} items={items} />
  );

  const getSelectedLabel = () => {
    switch (selectedKey) {
      case 'last':
        return 'Last added';
      case 'priceLow':
        return 'Price: low to high';
      case 'priceHigh':
        return 'Price: high to low';
      default:
        return 'Sort';
    }
  };

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {getSelectedLabel()}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default SortDropdown;
