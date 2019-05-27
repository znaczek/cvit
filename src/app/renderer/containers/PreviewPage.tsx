import * as React from 'react';
import {Preview} from '../components/preview/Preview';
import {APP_EVENT, CV_FILENAME, FOOTER_FILENAME, HEADER_FILENAME, STYLES_FILENAME} from '../../common/constants';
import {FileWatcherService} from '../../common/services/file-watcher.service';
import {AppEvents} from '../../common/events/app.events';
import {ipcRenderer} from "electron";
import {connect} from 'react-redux';
import {ApplicationStateInterface} from '../../common/interfaces/application-state.interface';
import {PreviewSelectors} from '../store/selectors/preview.selectors';
import {PreviewActions} from '../store/actions/preview.actions';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {PrintConfigSelectors} from '../store/selectors/print-config.selectors';
import {PrintConfigModel} from '../models/print-config.model';
import {PreviewEventHandler} from '../event-bus-handlers/preview-event-handler';

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
    private fileWatchers: FileWatcherService[] = [];

    public componentDidMount() {
        ipcRenderer.on(APP_EVENT, (e: any, action: AppEvents.types) => PreviewEventHandler.handle(action));
    }

    public componentWillUnmount() {
        this.closeFileWatchers();
    }

    public render() {
        const {directory, printConfig, ts, loader} = this.props;

        if (directory !== this.lastDirectory) {
            this.setFileWatchers(directory);
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

    private setFileWatchers(directory: string) {
        this.closeFileWatchers();
        [CV_FILENAME, STYLES_FILENAME, HEADER_FILENAME, FOOTER_FILENAME].forEach((file) => {
            this.fileWatchers.push(new FileWatcherService(directory + '/' + file, () => {
                this.props.dispatch(PreviewActions.refreshDebounced());
            }));
        });
    }

    private closeFileWatchers() {
        if (this.fileWatchers && this.fileWatchers.length) {
            this.fileWatchers.forEach((fw) => {
                fw.close();
                fw = null;
            })
        }
        this.fileWatchers = [];
    }

}

const mapStateToProps = (state: ApplicationStateInterface): Partial<Props> => ({
    ts: PreviewSelectors.getTs(state),
    directory: PreviewSelectors.getDirectory(state),
    loader: PreviewSelectors.getLoader(state),
    printConfig: PrintConfigSelectors.getConfig(state),
});

export default connect(mapStateToProps)(PreviewPage);
