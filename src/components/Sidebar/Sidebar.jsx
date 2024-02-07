import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #f7f7f7;
  padding: 20px;

  @media screen and (max-width: 820px) {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50px;
    background-color: white;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const SidebarItem = styled.div`
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }

  @media screen and (max-width: 820px) {
    width: fit-content;
    color: white;
    font-size: 16px;
    outline: none;
    border: none;
    height: 38px;
    background: rgb(0, 94, 141);
    border-radius: 4px;
    padding: 10px;
  }
`;

const WelcomeMessage = styled.h2`
  color: rgb(0, 94, 141);
  padding-top: 5px;
`;

const Sidebar = ({ items, username, onItemClick }) => (
  <SidebarContainer>
    <WelcomeMessage>Welcome, {username}</WelcomeMessage>
    {items.map((item, index) => (
      <SidebarItem key={index} onClick={() => onItemClick(item)}>{item}</SidebarItem>
    ))}
  </SidebarContainer>
);

export default Sidebar;
