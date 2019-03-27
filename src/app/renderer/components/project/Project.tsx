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
import {Input} from '../common/styled/Input';
import {StorageService} from '../../service/storage.service';
import {INPUT_DEBOUNCE_TIME} from '../../constants/ui.constants';
import {CreateProjectInterface} from '../../interfaces/create-project.interface';

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Form = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    
    .submit {
        margin-top: ${STYLES.gutter * 2/3}px;
    }
`;

const Group = styled.div`
    position: relative;
    &:not(:last-child) {
        margin-bottom: ${STYLES.gutter}px
    }
    ${Input} {
        width: 100%;
    }
`;

const Error = styled.span`
    position: absolute;
    line-height: 1;
    bottom: -${STYLES.fontSizes.basic + 3}px;
    left: 0;
    color: ${STYLES.colors.red};
`;

const Label = styled.label`
    display: block;
    margin-bottom: ${STYLES.gutter / 3}px;
    font-weight: ${STYLES.fontWeight.bold}
`;

interface Props {
    templates: OptionModel<Template>[];
    createProject: (options: CreateProjectInterface) => void;
    visible: boolean;
}

interface State {
    template: Template;
    path: string;
    name: string;
    nameValid: boolean;
    pending: boolean;
}

export default class Project extends React.Component<Props> {
    public props: Props;
    public state: State;
    public validationTimeout: number;

    constructor(props: Props) {
        super(props);
        this.state = this.getInitialState(props);
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.visible !== this.props.visible) {
            this.setState((state, props) => this.getInitialState(props));
        }
    }

    public handleOnDirectoryChoose = (paths: string[]) => {
        this.setState({
            path: paths && paths[0],
            pending: true,
        });
        this.validateName();
    };

    public handleOnTemplateSelect = (template: Template) => {
        this.setState({template});
    };

    public isValid(): boolean {
        const {pending, template, path, name, nameValid} = this.state;
        return !pending &&
            !!template &&
            !!path &&
            !!name &&
            nameValid;
    }

    public handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: e.target.value,
            pending: true,
        });
        clearTimeout(this.validationTimeout);
        this.validationTimeout = setTimeout(this.validateName, INPUT_DEBOUNCE_TIME);
    };

    public validateName = (): void => {
        this.setState((state: State) => {
            let nameValid = true;
            if (state.path && state.name) {
                nameValid = !StorageService.exists(state.path + '/' + state.name);
            }
            return {
                nameValid,
                pending: false,
            };
        });
    };

    public render() {
        const {templates, createProject} = this.props;
        const {pending, template, path, name, nameValid} = this.state;


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
                        <Label><T>PROJECT.NEW.NAME.CHOOSE</T></Label>
                        <Input value={name} onChange={this.handleNameChange}/>
                        {!pending && !nameValid && (
                            <Error><T>PROJECT.NEW.NAME.EXIST</T></Error>
                        )}
                    </Group>
                    <Group className={'submit'}>
                        <Button
                            theme={Themes.primary}
                            onClick={() => this.isValid() && createProject({
                                templatePath: this.state.template.path,
                                destination: this.state.path + '/' + this.state.name,
                            })}
                            stretched
                            disabled={!this.isValid()}
                        ><T>ACTIONS.CREATE</T></Button>
                    </Group>
                </Form>
            </Wrapper>
        );
    }

    private getInitialState(props: Props): State {
        console.log(props);
        return {
            template: props.templates && props.templates.length ? props.templates[0].value : null,
            path: null,
            name: '',
            nameValid: true,
            pending: true,
        }
    }
}