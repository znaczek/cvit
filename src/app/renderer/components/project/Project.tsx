import * as React from 'react';
import {T} from '../T';
import styled from 'styled-components';
import {STYLES} from '../../styles/variables';
import {Template} from '../../models/template.model';
import {SelectBox} from '../common/SelectBox/SelectBox';
import {Button} from '../common/styled/Button';
import {DirectoryPicker} from '../common/DirectoryPicker/DirectoryPicker';
import {Themes} from '../common/styled/themes';
import {OptionModel} from '../../../common/model/options-model';


const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Form = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const Group = styled.div`
    &:not(:last-child) {
        margin-bottom: ${STYLES.gutter}px
    }
`;

const Label = styled.label`
    display: block;
    margin-bottom: ${STYLES.gutter / 3}px;
    font-weight: ${STYLES.fontWeight.bold}
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

    public isValid(): boolean {
        return !!this.state.template && !!this.state.path;
    }

    public render() {
        const {templates} = this.props;
        const {template, path} = this.state;

        return (
            <Wrapper>
                <Form>
                    <Group>
                        <Label><T>PROJECT.NEW.TEMPLATE.CHOOSE</T></Label>
                        <SelectBox
                            options={templates}
                            selected={template}
                            handleOnSelect={this.handleOnTemplateSelect}
                        />
                    </Group>
                    <Group>
                        <Label><T>PROJECT.NEW.DIRECTORY.CHOOSE</T></Label>
                        <DirectoryPicker
                            handleOnDirectoryChoose={this.handleOnDirectoryChoose}
                            value={path}
                        />
                    </Group>
                    <Group>
                        <Button
                            theme={Themes.primary}
                            onClick={() => this.isValid() && console.log('state:', this.state )}
                            stretched
                            disabled={!this.isValid()}
                        ><T>ACTIONS.CREATE</T></Button>
                    </Group>
                </Form>
            </Wrapper>
        );
    }
}
