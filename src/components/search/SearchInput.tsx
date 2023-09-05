import { styled } from 'styled-components';
import InputLayout from '../layout/search/InputLayout';

const PLACEHOLDER_TEXT = '질환명을 검색해주세요.';

function SearchInput() {
  return (
    <InputLayout>
      <Input placeholder={PLACEHOLDER_TEXT} />
    </InputLayout>
  );
}

const Input = styled.input`
  border-radius: 42px;
  border: 2px solid;
  border-color: #ffffff;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 25px 0 25px 45px;
  font-size: 17px;
  &:focus::placeholder {
    color: transparent;
  }
`;

export default SearchInput;
