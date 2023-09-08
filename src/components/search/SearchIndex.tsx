import React, { ChangeEvent, FocusEvent, KeyboardEvent, useEffect, useReducer, useRef, useState } from 'react';
import { styled } from 'styled-components';
import useDebounce from '../../hooks/useDebounce';
import useRequest from '../../hooks/useRequest';
import { focusIndexReducer } from '../../state/focusIndexReducer';
import AutoCompleteList from './AutoCompleteList';
import EmptyButton from './EmptyButton';
import InputLayout from './layout/InputLayout';

const PLACEHOLDER_TEXT = '질환명을 검색해주세요.';
const MIN_INDEX = 0;
const MAX_INDEX = 8;
export const DEFAULT_INDEX = -1;
const DEFAULT_VALUE = '';
const TIME_TERM = 300;

function SearchIndex() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [focusIndex, dispatch] = useReducer(focusIndexReducer, DEFAULT_INDEX);
  const ulRef = useRef<HTMLUListElement>(null);
  const debouncedValue = useDebounce(value, TIME_TERM);
  const { sicks, isLoading } = useRequest(debouncedValue);

  useEffect(() => {
    const ul = ulRef.current;
    if (ul) {
      if (focusIndex < DEFAULT_INDEX) {
        // 리스트의 포커스를 벗어났을 때 다시 포커스 할 수 있도록 인덱스 리셋
        dispatch({ type: 'INDEX_RESET' });
      } else if (focusIndex >= MAX_INDEX) {
        const hasScrollbar = ul.scrollHeight > ul.clientHeight;
        if (hasScrollbar) {
          const focusedItem = ul.children[focusIndex];
          focusedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [focusIndex]);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValAndResetIdx(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isComposing && sicks.length > 0) {
      const isLastIndex = focusIndex + 1 === sicks.length;

      switch (e.key) {
        case 'ArrowDown':
          if (!isLastIndex) {
            dispatch({ type: 'INDEX_INCREMENT' });
          }
          break;
        case 'ArrowUp':
          dispatch({ type: 'INDEX_DECREMENT' });
          break;
        case 'Escape':
          dispatch({ type: 'INDEX_RESET' });
          e.currentTarget.blur();
          break;
        case 'Enter':
          if (focusIndex >= MIN_INDEX) changeInputValue();
          break;
      }
    }
  };

  const changeInputValue = () => {
    const focusedList = ulRef.current?.children[focusIndex + 1];
    const textValue = focusedList?.textContent;
    if (textValue && textValue.length > 0) {
      setValAndResetIdx(textValue);
    }
  };

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    setOpen(e.type === 'focus');
    if (e.type === 'blur') {
      dispatch({ type: 'INDEX_RESET' });
    }
  };

  const setValAndResetIdx = (value: string) => {
    setValue(value);
    dispatch({ type: 'INDEX_RESET' });
  };

  return (
    <InputLayout>
      <Input
        placeholder={PLACEHOLDER_TEXT}
        onFocus={handleInputFocus}
        onBlur={handleInputFocus}
        onChange={onChangeValue}
        onKeyDown={handleKeyDown}
        value={value}
      />
      {open && (
        <>
          <EmptyButton onClick={() => setValAndResetIdx(DEFAULT_VALUE)} />
          <AutoCompleteList sicks={sicks} isLoading={isLoading} focusIndex={focusIndex} ref={ulRef} />
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
