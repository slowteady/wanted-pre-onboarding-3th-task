import { ChangeEvent, FocusEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import useRequest from '../../hooks/useRequest';
import AutoCompleteBox from './AutoCompleteBox';
import EmptyButton from './EmptyButton';
import InputLayout from './layout/InputLayout';

const PLACEHOLDER_TEXT = '질환명을 검색해주세요.';
const MIN_INDEX = 0;
const MAX_INDEX = 8;
const DEFAULT_INDEX = -1;
const DEFAULT_VALUE = '';
const REQUEST_TERM = 200;

function SearchIndex() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [keyword, setKeyword] = useState(DEFAULT_VALUE);
  const [focusIndex, setFocusIndex] = useState(DEFAULT_INDEX);
  const ref = useRef<HTMLUListElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const { sicks, isLoading, isEmpty } = useRequest(keyword);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (ref.current?.childElementCount === focusIndex + 1) {
      setFocusIndex(MIN_INDEX);
    } else if (ref.current && focusIndex >= MAX_INDEX) {
      const hasScrollbar = ref.current.scrollHeight > ref.current.clientHeight;
      if (hasScrollbar) {
        const focusedItem = ref.current.children[focusIndex];
        focusedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [focusIndex]);

  const inputKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    resetFocusIndex();

    const { value } = e.currentTarget;
    setValue(value);

    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => setKeyword(value), REQUEST_TERM);
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
    if (ref.current?.children[focusIndex + 1]) {
      const listValue = ref.current.children[focusIndex + 1].textContent!;

      if (listValue) {
        setValue(listValue);
        setKeyword(listValue);
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
    setKeyword(DEFAULT_VALUE);
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
        onChange={inputKeyword}
        onKeyDown={handleKeyBoard}
        value={value}
      />
      {open && (
        <>
          <EmptyButton onClick={doReset} />
          <AutoCompleteBox sicks={sicks} isLoading={isLoading} isEmpty={isEmpty} focusIndex={focusIndex} ref={ref} />
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
