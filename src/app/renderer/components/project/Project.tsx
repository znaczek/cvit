import * as React from 'react';
import {T} from '../T';
import styled from 'styled-components';
import {STYLES} from '../../styles/variables';
import {Template} from '../../models/template.model';
import {SelectBox} from '../common/SelectBox/SelectBox';
import {remote, Dialog} from 'electron';

const dialog: Dialog = remote.require('electron').dialog;

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Header = styled.header`
    display: flex;
`;

const H1 = styled.h1`
    flex-grow: 1;
    font-size: 36px;
    margin-bottom: ${STYLES.gutter}px;
`;

const OptionsWrapper = styled.div`
    flex-grow: 1;
    display: flex;
`;

const Option = styled.div`
    &:not(:last-child) {
        margin-right: ${STYLES.gutter}px
    }
`;

const H3 = styled.h3`
    margin-bottom: ${STYLES.gutter / 4}px
`;

interface Props {
    templates: Template[];
    create: (templateName: string, directory: string) => void;
}

export default class Project extends React.Component {
    public props: Props;

    private handleDirectoryChoose() {
        dialog.showOpenDialog({
            properties: ['openDirectory']
        });
    }

    public render() {

        return (
            <Wrapper>
                <Header>
                    <H1><T>PROJECT.NEW.HEADER</T></H1>
                    <button onClick={() => this.props.create('witam', 'heniu')}><T>ACTIONS.CREATE</T></button>
                </Header>
                <OptionsWrapper>
                    <Option>
                        <H3><T>PROJECT.NEW.TEMPLATE.CHOOSE</T></H3>
                        <SelectBox templates={this.props.templates}/>
                    </Option>
                    <Option>
                        <H3><T>PROJECT.NEW.DIRECTORY.CHOOSE</T></H3>
                        <button onClick={this.handleDirectoryChoose}>choose</button>
                    </Option>
                </OptionsWrapper>
            </Wrapper>
        );
    }
}
