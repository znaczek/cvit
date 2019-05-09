import styled from 'styled-components';
import {STYLES} from '../../../styles/variables';

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    margin-left: -${STYLES.gutter/4}px;
    margin-right: -${STYLES.gutter/4}px;
`;

interface ColProps {
    col: number;
}

export const Col = styled.div`
    width: ${(props: ColProps) => !props.col ? 0 : props.col / 12 * 100}%;
    padding: ${STYLES.gutter/4}px
`;
