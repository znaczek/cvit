import * as React from 'react';
import styled from 'styled-components';
import {STYLES} from '../../../styles/variables';
import {Template} from '../../../models/template.model';
import {SelectBoxItem} from './SelectBoxItem';

const Col = styled.ul`
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    padding: ${STYLES.gutter / 4}px
`;

interface Props {
    templates: Template[];
}

interface State {
    selected: number;
}

export class SelectBox extends React.Component {
    public props: Props;
    public state: State;

    private handleClick = (index: number): void => {
        if (this.state.selected !== index) {
            this.setState({selected: index});
        }
    };

    constructor(props: Props) {
        super(props);
        this.state = {selected: 0};
    }

    public render() {
        const {templates} = this.props;
        return (
            <Col>
                {templates.map((template, index) =>
                    <SelectBoxItem
                        key={index}
                        name={template.name}
                        selected={this.state.selected === index}
                        handleClick={this.handleClick.bind(this, index)}
                    />)
                }
            </Col>
        );
    }
}
