import React from 'react';
import styled, { keyframes } from 'styled-components';

function Loading() {
  return (
    <LoadingOverlay>
      <Spinner />
    </LoadingOverlay>
  );
}

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #ccc;
  border-top-color: #333;
  animation: ${spin} 1s linear infinite;
`;

export default Loading;
