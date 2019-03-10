import * as React from 'react';
import styled from 'styled-components';

interface Props {
}

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export default class Home extends React.Component {
    public props: Props;

    public render() {
        return (
            <Div>
                <h1>No project open. Use existing project or create new one...</h1>
            </Div>
        );
    }
}
