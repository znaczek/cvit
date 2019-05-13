import * as React from 'react';
import {connect} from 'react-redux';
import {ApplicationStateInterface} from '../../common/interfaces/application-state.interface';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {Editor} from '../components/editor/Editor';
import {ProjectSelectors} from '../store/selectors/project.selectors';
import {ProjectActions} from '../store/actions/project.actions';
import {compose, Dispatch} from 'redux';
import {withTranslation} from 'react-i18next';
import i18n from 'i18next';
import {UiSelectors} from '../store/selectors/ui.selectors';
import Home from '../components/editor/Home';
import {AppEvents} from '../../common/events/app.events';
import {APP_EVENT} from '../../common/constants';
import {ipcRenderer} from "electron";
import {NewProjectPopup} from '../components/editor/PrintConfigPopup';
import {UiActions} from '../store/actions/ui.actions';

interface Props {
    t: i18n.TFunction,
    undo: number,
    redo: number,
    printConfigVisible: boolean,
    directory: string,
    html: string,
    styles: string,
    header: string,
    footer: string,
    openProject: (file: string) => void,
    updateHtml: (html: string) => void,
    updateStyles: (styles: string) => void,
    updateHeader: (html: string) => void,
    updateFooter: (styles: string) => void,
    closePrintConfigPopup: () => void,
}

export class EditorPage extends React.Component<Props> {
    public props: Props;

    public componentDidMount() {
        const {directory} = this.props;
        if (directory) {
            ipcRenderer.send(APP_EVENT, new AppEvents.ProjectOpen(this.props.directory));
        }
    }

    render() {
        const {
            t,
            undo,
            redo,
            printConfigVisible,
            directory,
            html,
            styles,
            header,
            footer,
            openProject,
            updateHtml,
            updateStyles,
            updateHeader,
            updateFooter,
            closePrintConfigPopup,
        } = this.props;
        if (!directory) {
            return <Home/>
        }

        if (html === null && styles === null) {
            openProject(directory);
            return null;
        }
        if (html === null || styles === null) {
            return null;
        }
        return <React.Fragment>
            <NewProjectPopup
                printConfigVisible={printConfigVisible}
                close={closePrintConfigPopup}
            />
            <Editor
                title={directory}
                html={html}
                styles={styles}
                header={header}
                footer={footer}
                undo={undo}
                redo={redo}
                updateHtml={updateHtml}
                updateStyles={updateStyles}
                updateHeader={updateHeader}
                updateFooter={updateFooter}
                t={t}
            />
        </React.Fragment>;
    }
}

const mapStateToProps = (state: ApplicationStateInterface): Partial<Props> => ({
    undo: UiSelectors.getUndo(state),
    redo: UiSelectors.getRedo(state),
    printConfigVisible: UiSelectors.getPrintConfigPopupVisible(state),
    directory: ProjectSelectors.getDirectory(state),
    html: ProjectSelectors.getHtml(state),
    styles: ProjectSelectors.getStyles(state),
    header: ProjectSelectors.getHeader(state),
    footer: ProjectSelectors.getFooter(state),
});

const mapDispatchToProps = (dispatch: AppThunkDispatchType) => ({
    openProject: (file: string) => dispatch(ProjectActions.openProject(file)),
    updateHtml: (html: string) => dispatch(ProjectActions.updateHtml(html)),
    updateStyles: (styles: string) => dispatch(ProjectActions.updateStyles(styles)),
    updateHeader: (header: string) => dispatch(ProjectActions.updateHeader(header)),
    updateFooter: (footer: string) => dispatch(ProjectActions.updateFooter(footer)),
    closePrintConfigPopup: () => dispatch(UiActions.closePrintConfigPopup()),
});

export default compose(
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps)
)(EditorPage);
