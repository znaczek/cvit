import * as React from 'react';
import styled from 'styled-components';

interface Props {
    file: string;
}

const IFrame = styled.iframe`
    display: block;
    padding: 20px 0;
    height: 300vh;
    width: 215mm;
    margin: 0 auto;
`;

export const Preview = (props: Props) => {
    const {file} = props;

    return <main>
        <IFrame src={file}/>
    </main>
};
