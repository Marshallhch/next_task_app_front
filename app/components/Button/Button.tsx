'use client';

import { useGlobalState } from '@/app/context/globalProvider';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';

interface Props {
  icon?: React.ReactNode;
  name?: string;
  background?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  border?: string;
  color?: string;
}

const Button = ({
  icon,
  name,
  background,
  padding,
  borderRad,
  fw,
  fs,
  click,
  type,
  border,
  color,
}: Props) => {
  const { theme } = useGlobalState();
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <ButtonStyled
      onClick={click}
      type={type}
      style={{
        background: background,
        padding: padding || '0.25rem 1rem',
        borderRadius: borderRad || '0.25rem',
        fontWeight: fw || '500',
        fontSize: fs,
        border: border || 'none',
        color: color,
      }}
      theme={theme}
    >
      {icon && icon}
      {name && name}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colorWhite};
  z-index: 5;
  cursor: pointer;
  overflow: hidden;

  transition: all 0.4s ease;

  i {
    margin-right: 1rem;
    color: ${(props) => props.theme.colorWhite};
    font-size: 1.25rem;
    transition: all 0.4s ease;
  }

  &:hover {
    color: ${(props) => props.theme.colorGrey2};
    i {
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Button;
