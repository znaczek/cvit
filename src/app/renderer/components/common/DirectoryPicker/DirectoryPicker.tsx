import * as React from 'react';
import {Dialog, remote} from 'electron';
import {Button} from '../styled/Button';
import {Input} from '../styled/Input';
import styled from 'styled-components';
import {T} from '../../T';
import {MIXINS} from '../../../styles/mixins';

const dialog: Dialog = remote.require('electron').dialog;

const Wrapper = styled.div`
    display: flex;
    ${MIXINS.focusable}
`;

interface Props {
    handleOnDirectoryChoose: (paths: string[]) => void;
    value: string;
    btnText?: string;
}

export class DirectoryPicker extends React.Component {
    public props: Props;

    private handleDirectoryChoose = () => {
        dialog.showOpenDialog({
            properties: ['openDirectory'],
        }, this.props && this.props.handleOnDirectoryChoose)
    };

    public render() {
        const {value, btnText} = this.props;

        return (
            <Wrapper>
                <Input
                    value={value || ''}
                    readOnly
                    tabIndex={-1}
                />
                <Button onClick={this.handleDirectoryChoose}><T>{btnText ? btnText : 'ACTIONS.CHOOSE'}</T></Button>
            </Wrapper>
        );
    }
}
