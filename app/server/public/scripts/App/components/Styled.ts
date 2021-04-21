import styled from 'styled-components';

/**
 *
 */
export const colors = {
    white: '#fff',
    lightBlue: '#3D77A4',
    darkBlue: '#232257',
    grey: '#2D4452'
};

export const Page = styled.div`
  padding: 50px 15px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  border-radius: 16px;
  min-width: 120px;
  min-height: 40px;
`;

export const PrimaryButton = styled(Button)`
  color: ${colors.white};
  background: ${colors.lightBlue};
  border: none;
`;

export const SecondaryButton = styled(Button)`
  color: ${colors.lightBlue};
  background: ${colors.white};
  border: 2px solid ${colors.lightBlue};
`;

export const SelectionOptions = styled.button`
  border: 1px solid black;
  height: 50px;
  width: 100%;
`;
