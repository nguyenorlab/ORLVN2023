import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #f7f7f7;
  padding: 20px;
`;

const SidebarItem = styled.div`
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Sidebar = ({ items, onItemClick }) => (
  <SidebarContainer>
    {items.map((item, index) => (
      <SidebarItem key={index} onClick={() => onItemClick(item)}>{item}</SidebarItem>
    ))}
  </SidebarContainer>
);

export default Sidebar;
