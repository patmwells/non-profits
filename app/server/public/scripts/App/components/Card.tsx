import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { colors, PrimaryButton, SecondaryButton } from './Styled';

const Container = styled.div`
  margin: 40px auto 0 auto;
  border-radius: 12px;
  background: ${colors.white};
  box-shadow: 0 0 10px 1px #bcbcbc;
  max-width: 500px;
  min-width: 400px;
`;

const Content = styled.div`
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
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  width: 100%;

  ${SecondaryButton} {
    margin-top: 25px;
    margin-right: auto;
  }
  
  ${PrimaryButton} {
    margin-top: 25px;
    margin-left: auto;
  }
`;

interface CardProps {
    headerText?: string;
    children: JSX.Element | JSX.Element[];
    primaryButtonText?: string;
    onPrimaryClick?: (event: SyntheticEvent<HTMLButtonElement>) => void;
    secondaryButtonText?: string;
    onSecondaryClick?: (event: SyntheticEvent<HTMLButtonElement>) => void;
}

/**
 *
 */
export interface Card {
    (props: CardProps): JSX.Element;
}

/**
 *
 * @param props
 */
export function Card(props: CardProps): JSX.Element {
    const {
        headerText,
        children,
        primaryButtonText,
        onPrimaryClick,
        secondaryButtonText,
        onSecondaryClick
    } = props;

    return (
        <Container>
            <Content>
                {headerText && <Header>{headerText}</Header>}
                <Body>{children}</Body>
                <Row>
                    {secondaryButtonText &&
                        <SecondaryButton onClick={onSecondaryClick}>{secondaryButtonText}</SecondaryButton>}
                    {primaryButtonText &&
                        <PrimaryButton onClick={onPrimaryClick}>{primaryButtonText}</PrimaryButton>}
                </Row>
            </Content>
        </Container>
    );
}
