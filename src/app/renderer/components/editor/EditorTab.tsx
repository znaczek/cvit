import * as React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/idle_fingers';

type modes = 'css' | 'html';

const theme = 'idle_fingers';

interface Props {
    mode: modes,
    id: string,
    value: string,
}

export class EditorTab extends React.Component<Props> {
    public props: Props;

    public onChange(e: any) {
        console.log(e);
    }

    public render() {
        const {mode, id, value} = this.props;
        return (
            <div>
                <AceEditor
                    value={value}
                    mode={mode}
                    theme={theme}
                    onChange={this.onChange}
                    name={id}
                />
            </div>
        );
    }
}
