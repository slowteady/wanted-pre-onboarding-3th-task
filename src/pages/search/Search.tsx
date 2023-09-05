import { styled } from 'styled-components';
import SearchInput from '../../components/search/SearchInput';

function Search() {
  return (
    <SectionContainer>
      <SectionBox>
        <StyleH2>
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </StyleH2>
        <SearchInput />
      </SectionBox>
    </SectionContainer>
  );
}

const SectionContainer = styled.section`
  margin-top: 56px;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  background-color: #cae9ff;
`;

const StyleH2 = styled.h2`
  font-size: 2.125rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.018em;
  line-height: 1.6;
  margin: 0 0 40px;
`;

const SectionBox = styled.div`
  padding: 80px 0 160px;
`;

export default Search;
