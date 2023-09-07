import React from 'react';
import { styled } from 'styled-components';
import { ChildrenProps } from '../../../types/commonTypes';
import SearchIcon from '../icon/SearchIcon';

function InputLayout({ children }: ChildrenProps) {
  return (
    <InputBox>
      <IconDiv>
        <SearchIcon />
      </IconDiv>
      {children}
      <ButtonDiv>검색</ButtonDiv>
    </InputBox>
  );
}

const InputBox = styled.div`
  width: 470px;
  margin: 0px auto;
  position: relative;
  padding-right: 50px;
`;

const IconDiv = styled.div`
  position: absolute;
  width: 16px;
  top: 27px;
  left: 20px;
  z-index: 1;
`;

const ButtonDiv = styled.div`
  position: absolute;
  width: 18%;
  height: 100%;
  top: 0px;
  right: 0px;
  border-radius: 0 42px 42px 0;
  background-color: rgb(74, 120, 220);
  cursor: pointer;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
`;

export default InputLayout;
