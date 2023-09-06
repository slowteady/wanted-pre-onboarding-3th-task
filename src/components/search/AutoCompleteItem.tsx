import { styled } from 'styled-components';
import { SickObj } from '../../types/sickTypes';
import AutoCompleteItemLayout from './layout/AutoCompleteItemLayout';

interface SickProps extends SickObj {
  isFocus: boolean;
}

function AutoCompleteItem({ sickNm, sickCd, isFocus }: SickProps) {
  
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
