import * as React from 'react';
import {Preview} from '../components/preview/Preview';
import {APP_EVENT, CV_FILE_NAME} from '../../common/constants';
import {FileWatcher} from '../../common/tools/file-watcher';
import {AppEvents} from '../../common/events/app.events';
import {ipcRenderer} from "electron";
import {EditorEventHandler} from '../service/editor-event-handler';
import {PreviewEventHandler} from '../service/preview-event-handler';

interface Props {
    preview: string;
}

interface State {
    loader: boolean;
    ts: number;
}

export class PreviewPage extends React.Component {
    public props: Props;
    public state: State;

    private fileWatcher: FileWatcher;

    constructor(props: Props) {
        super(props);
        this.state = {
            loader: false,
            ts: new Date().getTime(),
        }
    }

    public onLoad = () => {
        setTimeout(() => {
            this.setState({loader: false});
        });
    };

    public componentDidMount() {
        ipcRenderer.on(APP_EVENT, (e: any, action: AppEvents.types) => PreviewEventHandler.handle(action));
        this.setFileWatcher(this.getFile(this.props.preview));
    }

    public componentWillUnmount() {
        if (this.fileWatcher) {
            this.fileWatcher.close();
        }
    }

    public render() {
        const {preview} = this.props;
        const {ts, loader} = this.state;
        const file = `file://${this.getFile(preview)}?time=${ts}`;

        return <Preview
            file={file}
            loader={loader}
            onLoad={this.onLoad}
        />
    }

    private getFile(preview: string): string {
        return `${preview}/${CV_FILE_NAME}`;
    }

    private setFileWatcher(file: string) {
        this.fileWatcher = new FileWatcher(file, () => {
            this.setState({loader: true});
            setTimeout(() => {
                this.setState({
                    ts: new Date().getTime(),
                });
            }, 250);
        });
    }

}
