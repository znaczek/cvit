import * as React from 'react';
import {RefObject} from 'react';
import styled from 'styled-components';
import {Loader} from '../Loader';
import {PrintConfigModel} from '../../models/print-config.model';
import {CV_FILENAME, FOOTER_FILENAME, HEADER_FILENAME} from '../../../common/constants';

interface Props {
    directory: string;
    ts: number;
    printConfig: PrintConfigModel;
    loader: boolean;
    onLoad: () => void;
}

interface State {
    cvFrameHeight: string;
    headerFrameHeight: string;
    footerFrameHeight: string;
}

type IFrameProps = {
    frameHeight: string;
}


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
    width: 215mm;
    margin: 0 auto;
    height: ${(props: IFrameProps) => props.frameHeight}
    &:nth-child(2) {
        padding-top: 20px;
    }
    &:last-child {
        padding-bottom: 20px;
    }
`;

export class Preview extends React.Component {
    public static getFrameHeight(ref: RefObject<HTMLIFrameElement>) {
        return (ref && ref.current) ? (ref.current.contentWindow.document.body.scrollHeight + 40) + 'px' : '0';
    }

    public props: Props;
    public state: State;
    public cvFrameRef: RefObject<HTMLIFrameElement>;
    public headerFrameRef: RefObject<HTMLIFrameElement>;
    public footerFrameRef: RefObject<HTMLIFrameElement>;

    constructor(props: Props) {
        super(props);
        this.state = {
            headerFrameHeight: '10vh',
            cvFrameHeight: '80vh',
            footerFrameHeight: '10vh',
        };
        this.cvFrameRef = React.createRef();
        this.headerFrameRef = React.createRef();
        this.footerFrameRef = React.createRef();
    }

    public componentDidMount() {
        const {printConfig, onLoad} = this.props;

        Promise.all([
            new Promise((resolve) => {
                this.cvFrameRef.current.onload = () => {
                    onLoad();
                    resolve()
                }
            }),
            new Promise((resolve) => {
                if (printConfig.hasHeader) {
                    this.headerFrameRef.current.onload = () => {
                        onLoad();
                        resolve()
                    }
                } else {
                    resolve();
                }
            }),
            new Promise((resolve) => {
                if (printConfig.hasFooter) {
                    this.footerFrameRef.current.onload = () => {
                        onLoad();
                        resolve();
                    }
                } else {
                    resolve();
                }
            }),
        ]).then(() => {
            onLoad();
            setTimeout(() => {
                this.setState({
                    cvFrameHeight: Preview.getFrameHeight(this.cvFrameRef),
                    headerFrameHeight: Preview.getFrameHeight(this.headerFrameRef),
                    footerFrameHeight: Preview.getFrameHeight(this.footerFrameRef),
            });
            });
        });
    }

    public render() {
        const {printConfig, loader} = this.props;
        const {cvFrameHeight, headerFrameHeight, footerFrameHeight} = this.state;
        return <main>
            <Overlay visible={loader}>
                <Loader/>
            </Overlay>
            {printConfig.hasHeader && <IFrame
                ref={this.headerFrameRef}
                src={this.getFileName(HEADER_FILENAME)}
                frameHeight={headerFrameHeight}
            />}
            <IFrame
                ref={this.cvFrameRef}
                src={this.getFileName(CV_FILENAME)}
                frameHeight={cvFrameHeight}
            />
            {printConfig.hasFooter && <IFrame
                ref={this.footerFrameRef}
                src={this.getFileName(FOOTER_FILENAME)}
                frameHeight={footerFrameHeight}
            />}
        </main>
    }

    private getFileName(name: string) {
        const {directory, ts} = this.props;
        return `${directory}/${name}?ts=${ts}`;
    }
}

