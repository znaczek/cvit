import * as React from 'react';

interface Props {
    title: string,
    children: React.ReactNode,
}

export class EditorTab extends React.Component<Props> {
    public props: Props;

    public render() {
        return this.props.children;
    }
}
