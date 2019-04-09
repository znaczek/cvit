import * as React from 'react';
import {RefObject} from 'react';
import styled from 'styled-components';

interface Props {
    file: string;
}

interface State {
    iFrameHeight: string;
}

type IFrameProps = State;

const IFrame = styled.iframe`
    display: block;
    padding: 20px 0;
    width: 215mm;
    margin: 0 auto;
    height: ${(props: IFrameProps) => props.iFrameHeight}
`;

export class Preview extends React.Component {
    public props: Props;
    public state: State;
    public iframeRef: RefObject<HTMLIFrameElement>;

    constructor(props: Props) {
        super(props);
        this.state = {
            iFrameHeight: '100vh',
        };
        this.iframeRef = React.createRef();
    }

    public componentDidMount() {
        this.iframeRef.current.onload = () => {
            this.setState({iFrameHeight: this.iframeRef.current.contentWindow.document.body.scrollHeight + 'px'});
        }
    }

    render() {
        const {file} = this.props;

        return <main>
            <IFrame
                ref={this.iframeRef}
                src={file}
                iFrameHeight={this.state.iFrameHeight}
            />
        </main>
    }
}
