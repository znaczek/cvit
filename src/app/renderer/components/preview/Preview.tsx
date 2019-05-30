import * as React from 'react';
import {RefObject} from 'react';
import styled from 'styled-components';
import {RefreshLoader} from '../common/loaders/RefreshLoader';
import {PrintConfigModel} from '../../../common/model/print-config.model';
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

const Main = styled.main`
    padding: 20px;
`;

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
`;

export class Preview extends React.Component {
    public static getFrameHeight(ref: RefObject<HTMLIFrameElement>): number {
        if (!ref || !ref.current) {
            return 0;
        }
        const computedStyle = window.getComputedStyle(ref.current.contentWindow.document.documentElement);
        return Math.ceil(parseFloat(computedStyle.getPropertyValue('height')));
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
        const {onLoad} = this.props;

        this.cvFrameRef.current.onload = () => {
            this.refreshHeights();
            onLoad();
        };
    }

    public render() {
        const {printConfig, loader} = this.props;
        const {cvFrameHeight, headerFrameHeight, footerFrameHeight} = this.state;
        return <Main>
            <Overlay visible={loader}>
                <RefreshLoader/>
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
        </Main>
    }

    public componentDidUpdate() {
        this.refreshHeights();
    }

    private getFileName(name: string) {
        const {directory, ts} = this.props;
        return `${directory}/${name}?ts=${ts}`;
    }

    private refreshHeights() {
        const {printConfig} = this.props;
        const {cvFrameHeight, headerFrameHeight, footerFrameHeight} = this.state;

        const currentCvFrameHeight = Preview.getFrameHeight(this.cvFrameRef);
        const currentHeaderFrameHeight = Preview.getFrameHeight(this.headerFrameRef);
        const currentFooterFrameHeight = Preview.getFrameHeight(this.footerFrameRef);

        const state: Partial<State> = {};
        if (parseInt(cvFrameHeight) !== currentCvFrameHeight) {
            state.cvFrameHeight = Preview.getFrameHeight(this.cvFrameRef) + 'px';
        }
        if (printConfig.hasHeader && parseInt(headerFrameHeight) !== currentHeaderFrameHeight) {
            state.headerFrameHeight = Preview.getFrameHeight(this.headerFrameRef) + 'px';
        }
        if (printConfig.hasFooter && parseInt(footerFrameHeight) !== currentFooterFrameHeight) {
            state.footerFrameHeight = Preview.getFrameHeight(this.footerFrameRef) + 'px';
        }

        if (Object.keys(state).length) {
            this.setState(state);
        }
    }
}

