import { BrowserRouter } from 'react-router-dom';
import { styled } from 'styled-components';
import Router from './router/Router';

function App() {
  return (
    <BrowserRouter>
      <ToCenterWrap>
        <Router />
      </ToCenterWrap>
    </BrowserRouter>
  );
}

const ToCenterWrap = styled.main`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export default App;
