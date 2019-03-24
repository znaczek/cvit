import * as React from 'react';
import styled from 'styled-components';
import {STYLES} from '../../../styles/variables';

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

export const Popup = (props: Props) => {
    const {visible, children} = props;

    return <Overlay visible={visible}>
        <Modal>{children}</Modal>
    </Overlay>;
};
