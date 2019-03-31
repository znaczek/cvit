import * as React from 'react';
import {connect} from 'react-redux';
import {ApplicationStateInterface} from '../../common/interfaces/application-state.interface';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {Editor} from '../components/editor/Editor';
import {ProjectSelectors} from '../store/selectors/project.selectors';
import {ProjectActions} from '../store/actions/project.actions';
import {Redirect} from 'react-router';

interface Props {
    directory: string,
    content: string,
    getContent: (file: string) => void,
}

export class EditorPage extends React.Component<Props> {
    public props: Props;

    render() {
        const {directory, content, getContent} = this.props;
        if (!directory) {
            return <Redirect to="/"/>
        }
        if (!content) {
            getContent(directory);
        }
        return <Editor
            content={content}
        />;
    }
}

const mapStateToProps = (state: ApplicationStateInterface): Partial<Props> => ({
    directory: ProjectSelectors.getDirectory(state),
    content: ProjectSelectors.getContent(state),
});

const mapDispatchToProps = (dispatch: AppThunkDispatchType) => ({
    getContent: (file: string) => dispatch(ProjectActions.getContent(file))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
