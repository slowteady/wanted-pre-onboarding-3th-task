import { styled } from 'styled-components';
import { ChildrenProps } from '../../../types/commonTypes';
import SearchIcon from '../icon/SearchIcon';

interface ItemLayoutProps extends ChildrenProps {
  isFocus: boolean;
}

function AutoCompleteItemLayout({ isFocus, children }: ItemLayoutProps) {
  return (
    <DropDownLi isfocus={isFocus}>
      <IconDiv>
        <SearchIcon />
      </IconDiv>
      {children}
    </DropDownLi>
  );
}

const DropDownLi = styled.div<{ isfocus: boolean }>`
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 8px;
  &:hover {
    background-color: #edf5f5;
  }
  background-color: ${(props) => (props.isfocus ? '#edf5f5' : '#fff')};
`;

const IconDiv = styled.div`
  position: absolute;
  width: 16px;
  top: 13px;
  left: 13px;
  z-index: 1;
`;

export default AutoCompleteItemLayout;
