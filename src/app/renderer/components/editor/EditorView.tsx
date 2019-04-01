import * as React from 'react';
import {EditorTab} from './EditorTab';
import styled from 'styled-components';
import {STYLES} from '../../styles/variables';

interface Props {
    children: React.ReactNodeArray;
    selected: number;
    onChange: (index: number) => void;
}

const TabList = styled.ul`
    display: flex;
    justify-content: space-around;
`;

interface TabListItemProps {
    selected: boolean;
}
const TabListItem = styled.li`
    padding: ${STYLES.gutter/2}px;
    width: 50%;
    text-align: center;
    font-weight: ${STYLES.fontWeight.bold};
    color: ${({selected}: TabListItemProps) => selected ? STYLES.colors.white : STYLES.colors.black};
    background: ${({selected}: TabListItemProps) => selected ? STYLES.colors.aceGray : STYLES.colors.background}
    cursor: pointer;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
`;

const TabContent = styled.section`
`;

interface TabPaneProps {
    selected: boolean;
}
const TabPane = styled.article<TabPaneProps>`
    display: ${({selected}: TabPaneProps) => selected ? 'block' : 'none'}
    width: 100%;
    #content, #styles {
        width: 100% !important;
    }
`;

export class EditorView extends React.Component<Props> {
    public props: Props;

    public render() {
        const {children, selected, onChange} = this.props;

        return (
            <main>
                <TabList>
                    {React.Children.map(children, (child: EditorTab, index: number) => (
                        <TabListItem
                            selected={selected === index}
                            onClick={() => onChange(index)}
                        ><h3>{child.props.title}</h3></TabListItem>
                    ))}
                </TabList>
                <TabContent>
                    {React.Children.map(children, (child: EditorTab, index: number) => (
                        <TabPane selected={selected === index}>{child}</TabPane>
                    ))}
                </TabContent>
            </main>
        );
    }
}
