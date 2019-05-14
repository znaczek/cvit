import * as React from 'react';
import {Preview} from '../components/preview/Preview';
import {APP_EVENT, CV_FILENAME, FOOTER_FILENAME, HEADER_FILENAME} from '../../common/constants';
import {FileWatcher} from '../../common/tools/file-watcher';
import {AppEvents} from '../../common/events/app.events';
import {ipcRenderer} from "electron";
import {PreviewEventHandler} from '../service/preview-event-handler';
import {connect} from 'react-redux';
import {ApplicationStateInterface} from '../../common/interfaces/application-state.interface';
import {PreviewSelectors} from '../store/selectors/preview.selectors';
import {PreviewActions} from '../store/actions/preview.actions';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {PrintConfigSelectors} from '../store/selectors/print-config.selectors';
import {PrintConfigModel} from '../models/print-config.model';

interface Props {
    ts: number;
    loader: boolean;
    directory: string;
    printConfig: PrintConfigModel,
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
        const {directory, printConfig, ts, loader} = this.props;

        if (directory !== this.lastDirectory) {
            // this.setFileWatcher(directory);
        }

        this.lastDirectory = directory;
        return <Preview
            directory={directory}
            printConfig={printConfig}
            ts={ts}
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
    printConfig: PrintConfigSelectors.getConfig(state),
});

export default connect(mapStateToProps)(PreviewPage);
