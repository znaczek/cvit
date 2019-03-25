import * as React from 'react';
import styled from 'styled-components';
import {STYLES} from '../../../styles/variables';
import {H1} from '../styled/H1';
import {T} from '../../T';
import {MIXINS} from '../../../styles/mixins';

interface OverlayProps {
    visible: boolean;
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.65);
    display: ${(props: OverlayProps) => props.visible ? 'flex' : 'none'}
`;

interface ModalProps {
    background?: string;
    width?: string;
}

const Modal = styled.div`
    background: ${(props: ModalProps) => props.background || STYLES.colors.white}
    width: ${(props: ModalProps) => props.width || 'auto'}
    padding: ${STYLES.gutter / 2}px
`;

interface Props {
    visible: boolean;
    children: React.ReactNode
}

const Popup = (props: Props) => {
    const {visible, children} = props;

    return (
        <Overlay visible={visible}>
            <Modal>{children}</Modal>
        </Overlay>
    );
};

const Header = styled.header`
    display: flex;
    align-items: center;
    margin-bottom: ${STYLES.gutter}px;
    border-bottom: 2px solid ${STYLES.colors.gray3};
`;

const Close = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 20px;
    align-self: flex-start;
    ${MIXINS.focusable}
`;

interface HeaderPrpos {
    children: React.ReactNode;
    handleClose?: () => void;
}

Popup.Header = (props: HeaderPrpos) => {
    const {children, handleClose} = props;
    return (
        <Header>
            {children}
            {handleClose && <Close onClick={handleClose}>X</Close>}
        </Header>
    )
};

export {Popup};
