import * as React from 'react';
import {RefObject} from 'react';
import styled from 'styled-components';
import {Loader} from '../Loader';

interface Props {
    file: string;
    loader: boolean;
    onLoad: () => void;
}

interface State {
    iFrameHeight: string;
}

type IFrameProps = State;


interface OverlayProps {
    visible: boolean;
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    display: ${(props: OverlayProps) => props.visible ? 'flex' : 'none'};
`;

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
            this.props.onLoad();
            setTimeout(() => {
                this.setState({iFrameHeight: (this.iframeRef.current.contentWindow.document.body.scrollHeight + 40) + 'px'});
            });
        }
    }

    render() {
        const {file, loader} = this.props;

        return <main>
            <Overlay visible={loader}>
                <Loader/>
            </Overlay>
            <IFrame
                ref={this.iframeRef}
                src={file}
                iFrameHeight={this.state.iFrameHeight}
            />
        </main>
    }
}

