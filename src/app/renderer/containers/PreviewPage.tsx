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

interface Props {
    directory: string;
}

interface State {
    loader: boolean;
    ts: number;
}

export class PreviewPage extends React.Component {
    public props: Props;
    public state: State;

    private lastDirectory: string = null;
    private fileWatcher: FileWatcher;

    constructor(props: Props) {
        super(props);
        this.state = {
            loader: false,
            ts: new Date().getTime(),
        }
    }

    public componentDidMount() {
        ipcRenderer.on(APP_EVENT, (e: any, action: AppEvents.types) => PreviewEventHandler.handle(action));
    }

    public componentWillUnmount() {
        this.closeFileWatcher();
    }

    public render() {
        const {directory} = this.props;
        const {ts, loader} = this.state;
        const file = `file://${this.getFile(directory)}?time=${ts}`;

        if (directory !== this.lastDirectory) {
            this.setState({loader: true});
            this.setFileWatcher(this.getFile(directory));
            this.onLoad(250);
        }
        this.lastDirectory = directory;
        return <Preview
            file={file}
            loader={loader}
            onLoad={this.onLoad}
        />
    }

    private getFile(directory: string): string {
        return `${directory}/${CV_FILE_NAME}`;
    }

    private onLoad = (delay: number = 100) => {
        setTimeout(() => {
            if (this && this.state) {
                this.setState({loader: false});
            }
        }, delay);
    };

    private setFileWatcher(file: string) {
        this.closeFileWatcher();
        this.fileWatcher = new FileWatcher(file, () => {
            this.setState({loader: true});
            setTimeout(() => {
                if (this && this.state) {
                    this.setState({
                        ts: new Date().getTime(),
                    });
                }
            }, 250);
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
    directory: PreviewSelectors.getDirectory(state),
});

export default connect(mapStateToProps)(PreviewPage);
