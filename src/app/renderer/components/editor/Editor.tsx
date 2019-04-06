import * as React from 'react';
import {EditorTab} from './EditorTab';
import {EditorView} from './EditorView';
import i18n from 'i18next';
import {EditorContainer} from './EditorContainer';
import {EditorMode} from '../../types/editor-mode.type';

interface Props {
    t: i18n.TFunction;
    undo: number,
    redo: number,
    html: string;
    styles: string;
    updateHtml: (html: string) => void,
    updateStyles: (styles: string) => void,
}

interface State {
    selected: number;
}

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

    public onContentChange = (content: string, mode: EditorMode) => {
        if (mode === 'html') {
            this.props.updateHtml(content);
        } else if (mode === 'css') {
            this.props.updateStyles(content);
        }
    };

    public render() {
        const {
            t,
            undo,
            redo,
            html,
            styles,
        } = this.props;
        const {selected} = this.state;

        return (
            <EditorView
                selected={selected}
                onChange={this.onTabChange}
            >
                <EditorTab title={t('PROJECT.EDITOR.TABS.CONTENT')}>
                    <EditorContainer
                        value={html}
                        mode='html'
                        id='content'
                        focus={selected === 0}
                        undo={undo}
                        redo={redo}
                        onChange={(content: string) => this.onContentChange(content, 'html')}
                    />
                </EditorTab>
                <EditorTab title={t('PROJECT.EDITOR.TABS.STYLES')}>
                    <EditorContainer
                        value={styles}
                        mode='css'
                        id='styles'
                        focus={selected === 1}
                        undo={undo}
                        redo={redo}
                        onChange={(content: string) => this.onContentChange(content, 'css')}
                    />
                </EditorTab>
            </EditorView>
        );
    }
}
