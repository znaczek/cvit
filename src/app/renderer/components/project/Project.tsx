import * as React from 'react';
import {T} from '../T';
import styled from 'styled-components';
import {STYLES} from '../../styles/variables';
import {Template} from '../../models/template.model';
import {SelectBox} from '../common/SelectBox/SelectBox';
import {H1} from '../common/styled/H1';
import {Button} from '../common/styled/Button';
import {DirectoryPicker} from '../common/DirectoryPicker/DirectoryPicker';
import {Themes} from '../common/styled/themes';
import {Header} from '../common/styled/Header';
import {OptionModel} from '../../../common/model/options-model';


const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    height: 100%;
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
    templates: OptionModel<Template>[];
    create: (templateName: string, directory: string) => void;
}

interface State {
    template: Template;
    path: string;
}

export default class Project extends React.Component {
    public props: Props;
    public state: State;

    public handleOnDirectoryChoose = (paths: string[]) => {
        this.setState({path: paths && paths[0]});
    };

    public handleOnTemplateSelect = (template: Template) => {
        this.setState({template});
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            template: props.templates && props.templates.length ? props.templates[0].value : null,
            path: null,
        }
    }

    public render() {
        const {templates} = this.props;
        const {template, path} = this.state;

        return (
            <Wrapper>
                <Header>
                    <H1><T>PROJECT.NEW.HEADER</T></H1>
                </Header>
                <OptionsWrapper>
                    <Option>
                        <H3><T>PROJECT.NEW.TEMPLATE.CHOOSE</T></H3>
                        <SelectBox
                            options={templates}
                            selected={template}
                            handleOnSelect={this.handleOnTemplateSelect}
                        />
                    </Option>
                    <Option>
                        <H3><T>PROJECT.NEW.DIRECTORY.CHOOSE</T></H3>
                        <DirectoryPicker
                            handleOnDirectoryChoose={this.handleOnDirectoryChoose}
                            value={path}
                        />
                    </Option>
                </OptionsWrapper>
                <Button theme={Themes.primary} onClick={() =>
                    console.log('state:', this.state)
                }><T>ACTIONS.CREATE</T></Button>
            </Wrapper>
        );
    }
}
