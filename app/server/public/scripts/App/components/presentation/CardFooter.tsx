import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { PrimaryButton, SecondaryButton } from './Styled';

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

/**
 *
 */
interface CardFooterProps {
    onSecondaryClick?: (event: SyntheticEvent) => void;
    secondaryButtonText?: string;
    onPrimaryClick?: (event: SyntheticEvent) => void;
    primaryButtonText?: string;
}

/**
 *
 */
export interface CardFooter {
    (props: CardFooterProps): JSX.Element;
}

/**
 *
 * @param props
 */
export function CardFooter(props: CardFooterProps): JSX.Element {
    const { onSecondaryClick, secondaryButtonText, onPrimaryClick, primaryButtonText } = props;

    return (
        <Row>
            {secondaryButtonText && <SecondaryButton onClick={onSecondaryClick}>{secondaryButtonText}</SecondaryButton>}
            {primaryButtonText && <PrimaryButton onClick={onPrimaryClick}>{primaryButtonText}</PrimaryButton>}
        </Row>
    );
}
