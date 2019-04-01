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

export class Editor extends React.Component<Props> {
    public props: Props;

    public onChange(e: any) {
        console.log(e);
    }

    public render() {
        const {content, t} = this.props;
        const html = ProjectService.getHTML(content);
        const styles = ProjectService.getStyles(content);

        return (
            <EditorView>
                <EditorTab title={t('PROJECT.EDITOR.TABS.CONTENT')}>
                    <AceEditor
                        value={html}
                        mode='html'
                        theme={theme}
                        onChange={this.onChange}
                        name='content'
                    />
                </EditorTab>
                <EditorTab title={t('PROJECT.EDITOR.TABS.STYLES')}>
                    <AceEditor
                        value={styles}
                        mode='css'
                        theme={theme}
                        onChange={this.onChange}
                        name='styles'
                    />
                </EditorTab>
            </EditorView>
        );
    }
}
