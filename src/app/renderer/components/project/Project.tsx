import * as React from 'react';
import {T} from '../T';
import styled from 'styled-components';
import {STYLES} from '../../styles/variables';
import {Template} from '../../models/template.model';

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const H1 = styled.h1`
    font-size: 36px;
    margin-bottom: ${STYLES.gutter}px;
`;

const OptionsWrapper = styled.div`
    flex-grow: 1;
    display: flex;
`;

const Col = styled.ul`
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    padding: ${STYLES.gutter / 2}px
`;

const Item = styled.li`
    margin-bottom: ${STYLES.gutter / 4}px;
`;

interface Props {
    templates: Template[];
}

export default class Project extends React.Component {
    public props: Props;

    public render() {
        const {templates} = this.props;
        return (
            <Wrapper>
                <H1><T>PROJECT.NEW.HEADER</T></H1>
                <OptionsWrapper>
                    <Col>
                        {templates.map((template, index) => <Item key={index}>{template.name}</Item>)}
                    </Col>
                </OptionsWrapper>
            </Wrapper>
        );
    }
}
