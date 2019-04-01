import * as React from 'react';
import {connect} from 'react-redux';
import {ApplicationStateInterface} from '../../common/interfaces/application-state.interface';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {Editor} from '../components/editor/Editor';
import {ProjectSelectors} from '../store/selectors/project.selectors';
import {ProjectActions} from '../store/actions/project.actions';
import {Redirect} from 'react-router';
import {compose} from 'redux';
import {withTranslation} from 'react-i18next';
import i18n from 'i18next';

interface Props {
    directory: string,
    content: string,
    getContent: (file: string) => void,
    t: i18n.TFunction,
}

export class EditorPage extends React.Component<Props> {
    public props: Props;

    render() {
        const {directory, content, getContent, t} = this.props;
        if (!directory) {
            return <Redirect to="/"/>
        }
        if (!content) {
            getContent(directory);
        }
        return <Editor
            content={content}
            t={t}
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

export default compose(
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps)
)(EditorPage);
