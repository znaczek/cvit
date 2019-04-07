import * as React from 'react';
import {Preview} from '../components/preview/Preview';
import {ApplicationStateInterface} from '../../common/interfaces/application-state.interface';
import {connect} from 'react-redux';
import {ProjectSelectors} from '../store/selectors/project.selectors';
import {CV_FILE_NAME} from '../../common/constants';

interface Props {
    preview: string;
}

interface State {
    ts: number;
}

export class PreviewPage extends React.Component {
    public props: Props;
    public state: State;
    public timer: number;

    constructor(props: Props) {
        super(props);
        this.state = {
            ts: new Date().getTime(),
        }
    }

    public componentDidMount() {
        this.timer = setInterval(() => {
            // this.setState({
            //     ts: new Date().getTime(),
            // });
        }, 2000);
    }

    public componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        const {preview} = this.props;
        const {ts} = this.state;
        const file = `file://${preview}/${CV_FILE_NAME}?time=${ts}`;

        return <Preview file={file}/>
    }

}
