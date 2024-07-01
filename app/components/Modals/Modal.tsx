'use client';

import { useGlobalState } from '@/app/context/globalProvider';
import React from 'react';
import styled from 'styled-components';

interface Props {
  content: React.ReactNode;
}

const Modal = ({ content }: Props) => {
  const { closeModal } = useGlobalState();
  const { theme } = useGlobalState();
  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">{content}</div>
    </ModalStyled>
  );
};

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(4px);
  }

  .modal-content {
    padding: 2rem;
    position: relative;
    width: 650px;
    z-index: 100;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.colorBg2};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  }

  label {
    margin-bottom: 0.5rem;
    display: inline-block;
    font-size: clamp(0.875rem, 4vw, 1rem);
    color: ${(props) => props.theme.colorGrey3};
  }
`;

export default Modal;
