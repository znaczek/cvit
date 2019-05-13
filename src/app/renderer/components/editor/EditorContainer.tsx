import 'emmet-core';
import * as React from 'react';
import {RefObject} from 'react';
import AceEditor from 'react-ace';
import 'brace/ext/emmet';
import 'brace/ext/searchbox';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/idle_fingers';
import {EditorMode} from '../../types/editor-mode.type';
import {Editor} from 'brace';

const theme = 'idle_fingers';

interface Props {
    undo: number,
    redo: number,
    value: string;
    mode: EditorMode;
    id: string;
    focus: boolean;
    onChange: (content: string) => void;
}

export class EditorContainer extends React.Component<Props> {
    public props: Props;
    public editorRef: RefObject<AceEditor>;

    public lastFocus: boolean;
    public lastUndo: number = null;
    public lastRedo: number = null;

    constructor(props: Props) {
        super(props);
        this.editorRef = React.createRef();
    }

    render() {
        const {
            undo,
            redo,
            value,
            mode,
            id,
            focus,
            onChange
        } = this.props;

        if (this.editorRef.current) {
            //@ts-ignore
            const editor: Editor = this.editorRef.current.editor;

            // below "if" block for fixing issue
            // with not refreshing value of currently not displayed editor when opening project
            if (focus !== this.lastFocus) {
                editor.session.getDocument().setValue(this.props.value);
            }

            if (undo !== this.lastUndo && focus) {
                setTimeout(() => {
                    editor.undo();
                });
            }

            if (redo!== this.lastRedo && focus) {
                setTimeout(() => {
                    editor.redo();
                });
            }
        }

        this.lastUndo = undo;
        this.lastRedo= redo;
        this.lastFocus = focus;
        return <AceEditor
            ref={this.editorRef}
            value={value || ''}
            mode={mode}
            theme={theme}
            height={null}
            width={null}
            focus={focus}
            setOptions={{enableEmmet: true}}
            onChange={onChange}
            name={id}
        />
    }
}
