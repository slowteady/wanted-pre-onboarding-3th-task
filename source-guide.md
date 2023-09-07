# 코드리뷰용 소스 가이드

## 소스 트리

```bash
.
└── src/
    ├── api/
    │   ├── axiosInstance.ts - API 인스턴스와 헤더 등을 관리
    │   └── searchApi.ts - HTTP 요청 함수 관리
    ├── components/
    │   ├── common/
    │   │   ├── Loading.tsx - 로딩 컴포넌트
    │   │   └── NoData.tsx - 노데이터 컴포넌트
    │   └── search/
    │       ├── icon/
    │       │   └── SearchIcon.tsx - 검색 아이콘 컴포넌트
    │       ├── layout/
    │       │   ├── AutoCompleteItemLayout.tsx - 검색 자동완성 레이아웃 컴포넌트
    │       │   └── InputLayout.tsx - input창 레이아웃 컴포넌트
    │       ├── AutoCompleteItem.tsx - 검색 자동완성 아이템 컴포넌트
    │       ├── AutoCompleteList.tsx - 검색 자동완성 리스트 컴포넌트
    │       ├── EmptyButton.tsx - 삭제 버튼 컴포넌트
    │       └── SearchIndex.tsx - 검색 인덱스 컴포넌트
    ├── hooks/
    │   ├── useDebounce.ts - 디바운스 커스텀 훅
    │   └── useRequest.ts - 리퀘스트 요청 커스텀 훅
    ├── pages/
    │   ├── error/
    │   │   └── Error.tsx - 에러 페이지 컴포넌트
    │   └── search/
    │       └── Search.tsx - 검색 페이지 컴포넌트
    ├── router/
    │   ├── Router.tsx - 라우터 컴포넌트
    │   └── routerPaths.ts - path 객체 관리
    ├── state/
    │   └── focusindexReducer.ts - state관리 reducer
    ├── types/
    │   ├── commonTypes.ts - 공통 타입
    │   └── sickTypes.ts - state 타입
    ├── utils/
    │   ├── CacheManager.ts - 캐시 관리
    │   └── validate.ts - 문자열 검증
    ├── App.jsx
    └── index.jsx
```

## 기능

### 1. 로컬 캐싱, 요청 최소화, 키보드를 이용한 추천 검색어 이동은 [README](https://github.com/slowteady/wanted-pre-onboarding-3th-task/blob/main/README.md)에 작성 되어 있습니다

### 2. state 관리

```tsx
function SearchIndex() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [focusIndex, dispatch] = useReducer(focusIndexReducer, DEFAULT_INDEX);
  const ulRef = useRef<HTMLUListElement>(null);
  const debouncedValue = useDebounce(value, TIME_TERM);
  const { sicks, isLoading } = useRequest(debouncedValue);

                                  .
                                  .
                                  .

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValAndResetIdx(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isComposing) {
      switch (e.key) {
        case 'ArrowDown':
          dispatch({ type: 'INDEX_INCREMENT' });
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
    if (textValue && strCheck.isNotEmpty(textValue)) {
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
```

- 한 곳에서 state를 관리할 수 있다고 판단하여 최상위 부모 컴포넌트에서 state를 관리 하도록 구현했습니다.
- 요청을 통해 가져올 데이터와 로딩 여부 상태는 Custom Hook을 통해 가져올 수 있도록 구현했습니다.
- 소스의 가독성 향상과 효율을 위해 focusInput state를 reducer를 사용하여 구현했습니다.
