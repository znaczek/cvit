import 'emmet-core';
import * as React from 'react';
import AceEditor from 'react-ace';
import 'brace/ext/emmet';
import 'brace/ext/searchbox';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/idle_fingers';
import {EditorMode} from '../../types/editor-mode.type';
import {RefObject} from 'react';
import {Editor} from 'brace';

const theme = 'idle_fingers';

interface Props {
    value: string;
    mode: EditorMode;
    id: string;
    focus: boolean;
    onChange: (content: string) => void;
}

export class EditorContainer extends React.Component<Props> {
    public props: Props;
    public editorRef: RefObject<AceEditor>;

    public _focus: boolean;

    constructor(props: Props) {
        super(props);
        this.editorRef = React.createRef();
    }
    render() {
        const {value, mode, id, focus, onChange} = this.props;
        // below "if" block for fixing issue
        // with not refreshing value of currently not displayed editor when opening project
        if (this.editorRef.current && focus !== this._focus) {
            //@ts-ignore
            const editor: Editor = this.editorRef.current.editor;
            editor.session.getDocument().setValue(this.props.value);
        }
        this._focus = focus;
        return <AceEditor
            ref={this.editorRef}
            value={value}
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
