import * as React from 'react';
import {EditorTab} from './EditorTab';
import {EditorView} from './EditorView';
import i18n from 'i18next';
import {EditorContainer} from './EditorContainer';
import styled from 'styled-components';
import {STYLES} from '../../styles/variables';
import {PrintConfigModel} from '../../models/print-config.model';

interface Props {
    t: i18n.TFunction;
    undo: number;
    redo: number;
    printConfig: PrintConfigModel;
    title: string;
    html: string;
    styles: string;
    header: string;
    footer: string;
    updateHtml: (html: string) => void;
    updateStyles: (styles: string) => void;
    updateHeader: (header: string) => void;
    updateFooter: (footer: string) => void;
}

interface State {
    selected: number;
}

const Title = styled.h1`
    font-size: 24px;
    line-height: 1;
    padding: ${STYLES.gutter/4}px
    text-align: center;
`;

export class Editor extends React.Component<Props> {
    public props: Props;
    public state: State;

    constructor(props: Props) {
        super(props);
        this.state = {selected: 0};
    }

    public onTabChange = (index: number) => {
        this.setState({selected: index})
    };

    public render() {
        const {
            t,
            undo,
            redo,
            printConfig,
            title,
            html,
            styles,
            header,
            footer,
            updateHtml,
            updateStyles,
            updateHeader,
            updateFooter,
        } = this.props;
        const {selected} = this.state;

        return (
            <React.Fragment>
                <Title>{title}</Title>
                <EditorView
                    selected={selected}
                    onChange={this.onTabChange}
                >
                    <EditorTab title={t('EDITOR.TABS.CONTENT')}>
                        <EditorContainer
                            value={html}
                            mode='html'
                            id='content'
                            focus={selected === 0}
                            undo={undo}
                            redo={redo}
                            onChange={(content: string) => updateHtml(content)}
                        />
                    </EditorTab>
                    <EditorTab title={t('EDITOR.TABS.STYLES')}>
                        <EditorContainer
                            value={styles}
                            mode='css'
                            id='styles'
                            focus={selected === 1}
                            undo={undo}
                            redo={redo}
                            onChange={(content: string) => updateStyles(content)}
                        />
                    </EditorTab>
                    {printConfig.hasHeader && <EditorTab title={t('EDITOR.TABS.HEADER')}>
                        <EditorContainer
                        value={header}
                        mode='html'
                        id='header'
                        focus={selected === 2}
                        undo={undo}
                        redo={redo}
                        onChange={(content: string) => updateHeader(content)}
                        />
                        </EditorTab>}
                    {printConfig.hasFooter && <EditorTab title={t('EDITOR.TABS.FOOTER')}>
                        <EditorContainer
                        value={footer}
                        mode='html'
                        id='footer'
                        focus={selected === 3}
                        undo={undo}
                        redo={redo}
                        onChange={(content: string) => updateFooter(content)}
                        />
                        </EditorTab>}
                </EditorView>
            </React.Fragment>
        );
    }
}
