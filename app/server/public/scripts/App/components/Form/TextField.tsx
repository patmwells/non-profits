import React, { ChangeEvent, useState } from 'react';
import styled, {keyframes} from 'styled-components';
import { colors } from '../Styled';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

const LineBlocker = styled.div`
  position: absolute;
  background: ${colors.white};
  bottom: 9px;
  width: 100%;
  height: 10px;
  z-index: 1;
`;

const LabelText = styled.span`
  z-index: 2;
`;

const LabelAnimation = keyframes`
  from {
    bottom: 43px;
    left: 30px;
  }

  to {
    bottom: 53px;
    left: 30px;
  }
`;

const Label = styled.label`
  text-transform: capitalize;
  position: absolute;
  bottom: 53px;
  left: 30px;
  display: ${(props): string => props.show ? 'inherit' : 'none'};
  animation-duration: 0.4s;
  animation-name: ${LabelAnimation};
`;

const Input = styled.input`
  border: 2px solid #D9DBE9;
  border-radius: 16px;
  min-height: 40px;
  font-size: 20px;
  padding: 12px 20px;
  text-transform: capitalize;

  &:focus {
    border: 2px solid #3D77A4;
    outline: none;
  }
`;

/**
 *
 */
interface TextFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 *
 * @param label
 * @param name
 * @param value
 * @param onChange
 */
export function TextField({ label, name, value, onChange }: TextFieldProps): JSX.Element {
    const [focused, setFocused] = useState(false);
    const showFloatingLabel = focused || value;
    const placeholder = focused ? '' : label;

    /**
     *
     */
    function onFocus(): void {
        setFocused(true);
    }

    /**
     *
     */
    function onBlur(): void {
        setFocused(false);
    }

    return (
        <Container>
            <Label show={showFloatingLabel}>
                <LabelText>{label}</LabelText>
                <LineBlocker />
            </Label>
            <Input
                type="text"
                name={name}
                value={value}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={onChange}
                placeholder={placeholder}
            />
        </Container>
    );
}
