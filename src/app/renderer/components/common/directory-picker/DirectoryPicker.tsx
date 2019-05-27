import * as React from 'react';
import {Dialog, remote} from 'electron';
import styled from 'styled-components';
import {T} from '../../T';
import {MIXINS} from '../../../styles/mixins';
import {STYLES} from '../../../styles/variables';
import {Button} from '../html-styled/Button';
import {Input} from '../html-styled/Input';

const dialog: Dialog = remote.require('electron').dialog;

const Wrapper = styled.div`
    display: flex;
    ${MIXINS.focusable}
    ${Button} {
        font-size: ${STYLES.fontSizes.basic}px;
        padding: ${STYLES.input.padding[0]}px ${STYLES.input.padding[1]}px;
    }
`;

interface Props {
    handleOnDirectoryChoose: (paths: string[]) => void;
    value: string;
    btnText?: string;
}

export const DirectoryPicker = (props: Props) =>  {

    const {value, btnText} = props;

    const handleDirectoryChoose = () => {
        dialog.showOpenDialog({
            properties: ['openDirectory'],
        }, props && props.handleOnDirectoryChoose)
    };

    return (
        <Wrapper>
            <Input
                value={value || ''}
                readOnly
                tabIndex={-1}
            />
            <Button onClick={handleDirectoryChoose}><T>{btnText ? btnText : 'ACTIONS.CHOOSE'}</T></Button>
        </Wrapper>
    );
};
