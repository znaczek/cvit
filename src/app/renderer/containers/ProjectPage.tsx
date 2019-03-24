import * as React from 'react';
import Project from '../components/project/Project';
import {connect} from 'react-redux';
import {ApplicationStateInterface} from '../../common/interfaces/application-state.interface';
import {Template} from '../models/template.model';
import {TemplatesSelectors} from '../store/selectors/templates.selectors';
import {ProjectActions} from '../store/actions/project.actions';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {OptionModel} from '../../common/model/options-model';

interface Props {
    templates: OptionModel<Template>[];
    create: (templateName: string, directory: string) => void;
}

export class ProjectPage extends React.Component<Props> {
    props: Props;

    render() {
        const {templates, create} = this.props;
        return <Project create={create} templates={templates}/>;
    }
}

const mapStateToProps = (state: ApplicationStateInterface) => ({
    templates: TemplatesSelectors.getList(state),
});

const mapDispatchToProps = (dispatch: AppThunkDispatchType) => ({
    create: (templateName: string, directory: string) => dispatch(ProjectActions.createProject(templateName, directory))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
