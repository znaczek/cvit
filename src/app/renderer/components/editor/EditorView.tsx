import * as React from 'react';
import {EditorTab} from './EditorTab';
import styled from 'styled-components';

interface Props {
    children: React.ReactNodeArray;
}

const TabList = styled.ul`
`;

const TabListItem = styled.li`
`;

const TabContent = styled.section`
`;

const TabPane = styled.article`
`;

export class EditorView extends React.Component<Props> {
    public props: Props;

    public render() {
        const {children} = this.props;

        return (
            <main>
                <TabList>
                    {React.Children.map(children, (child: EditorTab) => (
                        <TabListItem><h3>{child.props.title}</h3></TabListItem>
                    ))}
                </TabList>
                <TabContent>
                    {React.Children.map(children, (child: EditorTab) => (
                        <TabPane>{child}</TabPane>
                    ))}
                </TabContent>
            </main>
        );
    }
}
