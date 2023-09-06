import { styled } from 'styled-components';
import { ChildrenProps } from '../../../types/commonTypes';
import SearchIcon from '../icon/SearchIcon';

interface ItemLayoutProps extends ChildrenProps {
  isFocus: boolean;
}

function AutoCompleteItemLayout({ isFocus = false, children }: ItemLayoutProps) {
  return (
    <DropDownLi data-isfocus={isFocus}>
      <IconDiv>
        <SearchIcon />
      </IconDiv>
      {children}
    </DropDownLi>
  );
}

const DropDownLi = styled.div<{ 'data-isfocus': boolean }>`
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 8px;
  background-color: ${(props) => (props['data-isfocus'] ? '#edf5f5' : '#fff')};
`;

const IconDiv = styled.div`
  position: absolute;
  width: 16px;
  top: 13px;
  left: 13px;
  z-index: 1;
`;

export default AutoCompleteItemLayout;
