import * as React from 'react';
import {RefObject} from 'react';
import styled from 'styled-components';
import {RefreshLoader} from '../common/loaders/RefreshLoader';
import {PrintConfigModel} from '../../../common/model/print-config.model';
import {CV_FILENAME, FOOTER_FILENAME, HEADER_FILENAME} from '../../../common/constants';
import {STYLES} from '../../styles/variables';

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

enum IFrameEnum {
    HEADER,
    CV,
    FOOTER,
}

type IFrameProps = {
    type: IFrameEnum;
    frameHeight: string;
    marginTop?: number;
    marginBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    cvFrameHeight?: string;
}

interface OverlayProps {
    visible: boolean;
}

const Main = styled.main`
    padding: 20px;
    overflow: hidden;
`;

const Wrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 210mm;
    background: ${STYLES.colors.white};
    margin: 0 auto;
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
    position: relative;
    z-index: 2;
    width: 100%;
    height: ${(props: IFrameProps) => props.frameHeight};
    margin-top: ${(props: IFrameProps) => props.type === IFrameEnum.CV ? props.marginTop : 0}mm;
    margin-bottom: ${(props: IFrameProps) => props.type === IFrameEnum.CV ? props.marginBottom : 0}mm;
    padding-left: ${(props: IFrameProps) => props.paddingLeft}mm;
    padding-right: ${(props: IFrameProps) => props.paddingRight}mm;
    top: ${(props: IFrameProps) => {
        if(props.type === IFrameEnum.FOOTER) {
            return `calc(${props.cvFrameHeight} + ${props.marginTop}mm)`;
        } else {
            return 0;
        }
    }};
    ${(props: IFrameProps) => props.type !== IFrameEnum.CV && `
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    `}
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
        return (
            <Main>
                <Wrapper>
                    <Overlay visible={loader}>
                        <RefreshLoader/>
                    </Overlay>
                    {printConfig.hasHeader && <IFrame
                        type={IFrameEnum.HEADER}
                        ref={this.headerFrameRef}
                        src={this.getFileName(HEADER_FILENAME)}
                        frameHeight={headerFrameHeight}
                        paddingLeft={printConfig.marginLeft}
                        paddingRight={printConfig.marginRight}
                    />}
                    <IFrame
                        type={IFrameEnum.CV}
                        ref={this.cvFrameRef}
                        src={this.getFileName(CV_FILENAME)}
                        frameHeight={cvFrameHeight}
                        marginTop={printConfig.marginTop}
                        marginBottom={printConfig.marginBottom}
                        paddingLeft={printConfig.marginLeft}
                        paddingRight={printConfig.marginRight}
                    />
                    {printConfig.hasFooter && <IFrame
                        type={IFrameEnum.FOOTER}
                        ref={this.footerFrameRef}
                        src={this.getFileName(FOOTER_FILENAME)}
                        frameHeight={footerFrameHeight}
                        paddingLeft={printConfig.marginLeft}
                        paddingRight={printConfig.marginRight}
                        marginTop={printConfig.marginTop}
                        cvFrameHeight={cvFrameHeight}
                    />}
                </Wrapper>
            </Main>
        )
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
        if (parseInt(cvFrameHeight) !== currentCvFrameHeight && !isNaN(currentCvFrameHeight)) {
            state.cvFrameHeight = Preview.getFrameHeight(this.cvFrameRef) + 'px';
        }
        if (printConfig.hasHeader && parseInt(headerFrameHeight) !== currentHeaderFrameHeight && !isNaN(currentHeaderFrameHeight)) {
            state.headerFrameHeight = Preview.getFrameHeight(this.headerFrameRef) + 'px';
        }
        if (printConfig.hasFooter && parseInt(footerFrameHeight) !== currentFooterFrameHeight && !isNaN(currentFooterFrameHeight)) {
            state.footerFrameHeight = Preview.getFrameHeight(this.footerFrameRef) + 'px';
        }

        if (Object.keys(state).length) {
            this.setState(state);
        }
    }
}

