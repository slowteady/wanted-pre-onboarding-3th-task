import { MouseEvent } from 'react';
import { styled } from 'styled-components';

interface onClickProps {
  onClick: () => void;
}

function EmptyButton({ onClick }: onClickProps) {
  const stayFocus = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <StyledButton onClick={onClick} onMouseDown={stayFocus}>
      x
    </StyledButton>
  );
}

const StyledButton = styled.button`
  position: absolute;
  border-radius: 20px;
  top: 25px;
  right: 100px;
  width: 24px;
  height: 24px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #d7c9b8;
  text-align: center;
`;

export default EmptyButton;
