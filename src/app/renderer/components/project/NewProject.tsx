import * as React from 'react';
import {T} from '../T';
import {SelectBox} from '../common/SelectBox/SelectBox';
import {OptionModel} from '../../../common/model/options-model';
import {StorageService} from '../../../common/services/storage.service';
import {CreateProjectInterface} from '../../interfaces/create-project.interface';
import {DirectoryPicker} from '../common/directory-picker/DirectoryPicker';
import {Error, Form, Group, Label} from '../common/html-styled/Form';
import {Input} from '../common/html-styled/Input';
import {Button} from '../common/html-styled/Button';
import {Themes} from '../themes';
import {TemplateInterface} from '../../../common/interfaces/template.interface';

const INPUT_DEBOUNCE_TIME = 500;

interface Props {
    templates: OptionModel<TemplateInterface>[];
    createProject: (options: CreateProjectInterface) => void;
    visible: boolean;
}

interface State {
    template: TemplateInterface;
    path: string;
    name: string;
    nameValid: boolean;
    pending: boolean;
}

export default class NewProject extends React.Component<Props> {
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

    public handleOnTemplateSelect = (template: TemplateInterface) => {
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
            <Form>
                <Group>
                    <Label><T>NEW_PROJECT.NEW.TEMPLATE.CHOOSE</T></Label>
                    <SelectBox
                        options={templates}
                        selected={template}
                        handleOnSelect={this.handleOnTemplateSelect}
                    />
                </Group>
                <Group>
                    <Label><T>NEW_PROJECT.NEW.DIRECTORY.CHOOSE</T></Label>
                    <DirectoryPicker
                        handleOnDirectoryChoose={this.handleOnDirectoryChoose}
                        value={path}
                    />
                </Group>
                <Group>
                    <Label><T>NEW_PROJECT.NEW.NAME.CHOOSE</T></Label>
                    <Input value={name} onChange={this.handleNameChange}/>
                    {!pending && !nameValid && (
                        <Error><T>NEW_PROJECT.NEW.NAME.EXIST</T></Error>
                    )}
                </Group>
                <Group className={'submit'}>
                    <Button
                        theme={Themes.primary}
                        onClick={() => this.isValid() && createProject({
                            templatePath: this.state.template.path,
                            directory: this.state.path + '/' + this.state.name,
                        })}
                        stretched
                        disabled={!this.isValid()}
                    ><T>ACTIONS.CREATE</T></Button>
                </Group>
            </Form>
        );
    }

    private getInitialState(props: Props): State {
        return {
            template: props.templates && props.templates.length ? props.templates[0].value : null,
            path: null,
            name: '',
            nameValid: true,
            pending: true,
        }
    }
}
