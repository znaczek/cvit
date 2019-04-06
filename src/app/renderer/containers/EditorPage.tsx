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
import {UiSelectors} from '../store/selectors/ui.selectors';

interface Props {
    t: i18n.TFunction,
    undo: number,
    redo: number,
    directory: string,
    html: string,
    styles: string,
    getContent: (file: string) => void,
    updateHtml: (html: string) => void,
    updateStyles: (styles: string) => void,
}

export class EditorPage extends React.Component<Props> {
    public props: Props;

    render() {
        const {
            t,
            undo,
            redo,
            directory,
            html,
            styles,
            getContent,
            updateHtml,
            updateStyles
        } = this.props;
        if (!directory) {
            return <Redirect to="/"/>
        }

        if (html === null && styles === null) {
            getContent(directory);
            return null;
        }
        if (html === null || styles === null) {
            return null;
        }
        return <Editor
            html={html}
            styles={styles}
            undo={undo}
            redo={redo}
            updateHtml={updateHtml}
            updateStyles={updateStyles}
            t={t}
        />;
    }
}

const mapStateToProps = (state: ApplicationStateInterface): Partial<Props> => ({
    directory: ProjectSelectors.getDirectory(state),
    html: ProjectSelectors.getHtml(state),
    styles: ProjectSelectors.getStyles(state),
    undo: UiSelectors.getUndo(state),
    redo: UiSelectors.getRedo(state),
});

const mapDispatchToProps = (dispatch: AppThunkDispatchType) => ({
    getContent: (file: string) => dispatch(ProjectActions.getContent(file)),
    updateHtml: (html: string) => dispatch(ProjectActions.updateHtml(html)),
    updateStyles: (styles: string) => dispatch(ProjectActions.updateStyles(styles))
});

export default compose(
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps)
)(EditorPage);
