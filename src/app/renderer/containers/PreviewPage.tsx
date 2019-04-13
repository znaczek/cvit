import * as React from 'react';
import {Preview} from '../components/preview/Preview';
import {APP_EVENT, CV_FILE_NAME} from '../../common/constants';
import {FileWatcher} from '../../common/tools/file-watcher';
import {AppEvents} from '../../common/events/app.events';
import {ipcRenderer} from "electron";
import {PreviewEventHandler} from '../service/preview-event-handler';
import {connect} from 'react-redux';
import {ApplicationStateInterface} from '../../common/interfaces/application-state.interface';
import {PreviewSelectors} from '../store/selectors/preview.selectors';
import {PreviewActions} from '../store/actions/preview.actions';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';

interface Props {
    directory: string;
    ts: number;
    loader: boolean;
    dispatch: AppThunkDispatchType;
}

export class PreviewPage extends React.PureComponent {
    public props: Props;

    private lastDirectory: string = null;
    private fileWatcher: FileWatcher;

    public componentDidMount() {
        ipcRenderer.on(APP_EVENT, (e: any, action: AppEvents.types) => PreviewEventHandler.handle(action));
    }

    public componentWillUnmount() {
        this.closeFileWatcher();
    }

    public render() {
        const {directory, ts, loader} = this.props;
        const file = `${directory}/${CV_FILE_NAME}`;
        const fileUrl = `${file}?ts=${ts}`;

        if (directory !== this.lastDirectory) {
            this.setFileWatcher(file);
        }

        this.lastDirectory = directory;
        return <Preview
            file={fileUrl}
            loader={loader}
            onLoad={this.onLoad}
        />
    }

    private onLoad = () => {
        this.props.dispatch(PreviewActions.refreshDone());
    };

    private setFileWatcher(file: string) {
        this.closeFileWatcher();
        this.fileWatcher = new FileWatcher(file, () => {
            this.props.dispatch(PreviewActions.refresh());
        });
    }

    private closeFileWatcher() {
        if (this.fileWatcher) {
            this.fileWatcher.close();
            this.fileWatcher = null;
        }
    }

}

const mapStateToProps = (state: ApplicationStateInterface): Partial<Props> => ({
    ts: PreviewSelectors.getTs(state),
    directory: PreviewSelectors.getDirectory(state),
    loader: PreviewSelectors.getLoader(state),
});

export default connect(mapStateToProps)(PreviewPage);
