import { Ref, forwardRef } from 'react';
import { styled } from 'styled-components';
import { SickObj } from '../../types/sickTypes';
import Loading from '../utils/Loading';
import NoData from '../utils/NoData';
import AutoCompleteItem from './AutoCompleteItem';

interface ResultProps {
  sicks: SickObj[];
  isLoading: boolean;
  isEmpty: boolean;
  focusIndex: number;
}

function AutoCompleteBox({ sicks, isLoading, isEmpty, focusIndex }: ResultProps, ref: Ref<HTMLUListElement>) {
  return (
    <>
      <DropDownUl ref={ref}>
        {isEmpty && <NoData />}
        {isLoading ? <Loading /> : !isEmpty && <RecommandP>추천 검색어</RecommandP>}
        {sicks.map(({ sickNm, sickCd }, index) => {
          return <AutoCompleteItem key={sickCd} isFocus={focusIndex === index} sickNm={sickNm} sickCd={sickCd} />;
        })}
      </DropDownUl>
    </>
  );
}

const DropDownUl = styled.ul`
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 480px;
  position: absolute;
  box-shadow: rgb(27 28 29 / 10%) 2px 12px 12px;
  margin: 7px 0;
  padding: 0;
  overflow: auto;

  > div {
    display: flex;
    flex-direction: column;
    max-height: 480px;
    max-width: 480px;
  }
`;

const RecommandP = styled.p`
  font-size: 14px;
  margin: 20px 0 0 15px;
`;

export default forwardRef(AutoCompleteBox);
