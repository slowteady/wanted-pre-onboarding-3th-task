import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Error() {
  const navigate = useNavigate();

  const navigateMain = () => {
    navigate('/');
  };

  return (
    <ErrorPageContainer>
      <ErrorDescription>에러가 발생했거나 찾을 수 없는 페이지 입니다.</ErrorDescription>
      <Button onClick={navigateMain}>돌아가기</Button>
    </ErrorPageContainer>
  );
}

const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
`;

const ErrorDescription = styled.p`
  font-size: 1.5rem;
`;

const Button = styled.button`
  background-color: #6b59d9;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 20px 2px;
  cursor: pointer;
  border-radius: 20px;
`;

export default Error;
