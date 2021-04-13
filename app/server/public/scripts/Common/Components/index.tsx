import styled from 'styled-components';

/**
 *
 */
export interface Components {
    View: typeof View;
    ViewHeader: typeof ViewHeader;
    Card: typeof Card;
    Container: typeof Container;
    Header: typeof Header;
    Body: typeof Body;
    PrimaryButton: typeof PrimaryButton;
}

/**
 *
 */
const colors = {
    white: '#fff',
    lightBlue: '#3D77A4',
    darkBlue: '#232257',
    grey: '#2D4452'
};

const View = styled.div`
  padding: 95px 16px;
  display: flex;
  flex-direction: column;
`;

const ViewHeader = styled.div`
  font-size: 22px;
  line-height: 30px;
  color: ${colors.darkBlue};
`;

const Card = styled.div`
  margin-top: 40px;
  min-width: 340px;
  border-radius: 12px;
  background: ${colors.white};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 44px 24px;
`;

const Header = styled.div`
  color: ${colors.darkBlue};
  font-size: 22px;
  line-height: 30px;
`;

const Body = styled.div`
  color: ${colors.grey};
  margin-top: 8px;
  font-size: 18px;
  line-height: 30px;
`;

const PrimaryButton = styled.button`
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

export const Components: Components = {
    View,
    ViewHeader,
    Card,
    Container,
    Header,
    Body,
    PrimaryButton
};
