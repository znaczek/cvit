import 'emmet-core';
import * as React from 'react';
import AceEditor from 'react-ace';
import 'brace/ext/emmet';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/idle_fingers';
import {EditorMode} from '../../types/editor-mode.type';

const theme = 'idle_fingers';

interface Props {
    value: string;
    mode: EditorMode;
    id: string;
    onChange: (content: string) => void;
}

export const EditorContainer = (props: Props) => {
    const {value, mode, id, onChange} = props;

    return <AceEditor
        value={value}
        mode={mode}
        theme={theme}
        height={null}
        width={null}
        setOptions={{enableEmmet: true}}
        onChange={onChange}
        name={id}
    />
};
