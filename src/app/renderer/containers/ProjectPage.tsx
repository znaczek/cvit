import * as React from 'react';
import Project from '../components/project/Project';
import {connect} from 'react-redux';
import {ProjectSelectors} from '../store/selectors/project.selectors';
import {ApplicationStateInterface} from '../../common/interfaces/application-state.interface';
import {Template} from '../models/template.model';

type Props = {
    templates: Template[];
};

export class ProjectPage extends React.Component<Props> {
    props: Props;

    render() {
        return <Project templates={this.props.templates}/>;
    }
}

const mapStateToProps = (state: ApplicationStateInterface) => ({
    templates: ProjectSelectors.getTemplates(state),
});

export default connect(mapStateToProps)(ProjectPage);
