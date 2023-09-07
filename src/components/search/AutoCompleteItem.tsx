import React from 'react';
import { styled } from 'styled-components';
import AutoCompleteItemLayout from './layout/AutoCompleteItemLayout';

interface SickProps {
  sickNm: string;
  isFocus: boolean;
}

function AutoCompleteItem({ sickNm, isFocus }: SickProps) {
  return (
    <AutoCompleteItemLayout isFocus={isFocus}>
      <Span title={sickNm}>{sickNm}</Span>
    </AutoCompleteItemLayout>
  );
}

const Span = styled.span`
  position: relative;
  font-size: 17px;
  margin: 11px 10px 10px 35px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 450px;
  max-width: 480px;
`;

export default AutoCompleteItem;
