import * as React from 'react';
import {EditorTab} from './EditorTab';
import {ProjectService} from '../../service/project-service';
import {EditorView} from './EditorView';
import i18n from 'i18next';
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/idle_fingers';

const theme = 'idle_fingers';

interface Props {
    content: string,
    t: i18n.TFunction,
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

    public onContentChange = (e: any) => {
        console.log(e);
    };

    public render() {
        const {content, t} = this.props;
        const {selected} = this.state;
        const html = ProjectService.getHTML(content);
        const styles = ProjectService.getStyles(content);

        return (
            <EditorView
                selected={selected}
                onChange={this.onTabChange}
            >
                <EditorTab title={t('PROJECT.EDITOR.TABS.CONTENT')}>
                    <AceEditor
                        value={html}
                        mode='html'
                        theme={theme}
                        onChange={this.onContentChange}
                        name='content'
                    />
                </EditorTab>
                <EditorTab title={t('PROJECT.EDITOR.TABS.STYLES')}>
                    <AceEditor
                        value={styles}
                        mode='css'
                        theme={theme}
                        onChange={this.onContentChange}
                        name='styles'
                    />
                </EditorTab>
            </EditorView>
        );
    }
}
