import * as React from 'react';
import styled from 'styled-components';

interface Props {
    file: string;
}

const IFrame = styled.iframe`
    height: 100vh;
    width: 100vw;
`;

export const Preview = (props: Props) => {
    const {file} = props;

    return <main>
        <IFrame src={file}/>
    </main>
};
