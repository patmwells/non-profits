import styled from 'styled-components';

/**
 *
 */
const colors = {
    white: '#fff',
    lightBlue: '#3D77A4',
    darkBlue: '#232257',
    grey: '#2D4452'
};

export const View = styled.div`
  padding: 50px 15px;
  display: flex;
  flex-direction: column;
`;

export const ViewHeader = styled.div`
  font-size: 22px;
  line-height: 30px;
  color: ${colors.darkBlue};
`;

export const Card = styled.div`
  margin-top: 40px;
  min-width: 340px;
  border-radius: 12px;
  background: ${colors.white};
  box-shadow: 0 0 10px 1px #bcbcbc;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 44px 24px;
`;

export const Header = styled.div`
  color: ${colors.darkBlue};
  font-size: 22px;
  line-height: 30px;
`;

export const Body = styled.div`
  color: ${colors.grey};
  margin-top: 8px;
  font-size: 18px;
  line-height: 30px;
`;

export const PrimaryButton = styled.button`
  color: ${colors.white};
  margin-top: 24px;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  border-radius: 2px;
  background: ${colors.lightBlue};
  border: none;
  width: 120px;
  height: 40px;
  margin-left: auto;
`;

export const SelectionOptions = styled.button`
  border: 1px solid black;
  height: 50px;
  width: 100%;
`;
