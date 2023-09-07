import React from 'react';
import { styled } from 'styled-components';

interface textProps {
  text?: string;
}

const DEAULT_TEXT = '검색어가 없습니다.';

function NoData({ text = DEAULT_TEXT }: textProps) {
  return <NoDataDiv>{text}</NoDataDiv>;
}

const NoDataDiv = styled.div`
  align-items: center;
  line-height: 20;
  font-size: 20px;
  font-weight: bold;
`;

export default NoData;
