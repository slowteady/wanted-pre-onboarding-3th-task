import { ChangeEvent, FocusEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import useDebounce from '../../hooks/useDebounce';
import useRequest from '../../hooks/useRequest';
import AutoCompleteList from './AutoCompleteList';
import EmptyButton from './EmptyButton';
import InputLayout from './layout/InputLayout';

const PLACEHOLDER_TEXT = '질환명을 검색해주세요.';
const MIN_INDEX = 0;
const MAX_INDEX = 8;
const DEFAULT_INDEX = -1;
const DEFAULT_VALUE = '';
const TIME_TERM = 300;

function SearchIndex() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [focusIndex, setFocusIndex] = useState(DEFAULT_INDEX);
  const ulRef = useRef<HTMLUListElement>(null);
  const debouncedValue = useDebounce(value, TIME_TERM);
  const { sicks, isLoading, isEmpty } = useRequest(debouncedValue);

  useEffect(() => {
    if (ulRef.current?.childElementCount === focusIndex + 1) {
      setFocusIndex(MIN_INDEX);
    } else if (ulRef.current && focusIndex >= MAX_INDEX) {
      const hasScrollbar = ulRef.current.scrollHeight > ulRef.current.clientHeight;
      if (hasScrollbar) {
        const focusedItem = ulRef.current.children[focusIndex];
        focusedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [focusIndex]);

  const inputValue = (e: ChangeEvent<HTMLInputElement>) => {
    resetFocusIndex();

    const { value } = e.currentTarget;
    setValue(value);
  };

  const handleKeyBoard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isComposing) {
      switch (e.key) {
        case 'ArrowDown':
          setFocusIndex(focusIndex + 1);
          break;
        case 'ArrowUp':
          setFocusIndex(focusIndex <= MIN_INDEX ? DEFAULT_INDEX : focusIndex - 1);
          break;
        case 'Escape':
          resetFocusIndex();
          e.currentTarget.blur();
          break;
        case 'Enter':
          if (focusIndex >= MIN_INDEX) changeValue();
          break;
      }
    }
  };

  const changeValue = () => {
    if (ulRef.current?.children[focusIndex + 1]) {
      const listValue = ulRef.current.children[focusIndex + 1].textContent!;

      if (listValue) {
        setValue(listValue);
        resetFocusIndex();
      }
    }
  };

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    setOpen(e.type === 'focus');
    if (e.type === 'blur') {
      resetFocusIndex();
    }
  };

  const doReset = () => {
    setValue(DEFAULT_VALUE);
    resetFocusIndex();
  };

  const resetFocusIndex = () => {
    setFocusIndex(DEFAULT_INDEX);
  };

  return (
    <InputLayout>
      <Input
        placeholder={PLACEHOLDER_TEXT}
        onFocus={handleInputFocus}
        onBlur={handleInputFocus}
        onChange={inputValue}
        onKeyDown={handleKeyBoard}
        value={value}
      />
      {open && (
        <>
          <EmptyButton onClick={doReset} />
          <AutoCompleteList sicks={sicks} isLoading={isLoading} isEmpty={isEmpty} focusIndex={focusIndex} ref={ulRef} />
        </>
      )}
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

export default SearchIndex;
