import {Input} from './Input';
import {STYLES} from '../../../styles/variables';
import styled from 'styled-components';

export const Form = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    
    .submit {
        margin-top: ${STYLES.gutter * 2/3}px;
    }
`;

export const Group = styled.div`
    position: relative;
    &:not(:last-child) {
        margin-bottom: ${STYLES.gutter}px
    }
    ${Input} {
        width: 100%;
    }
`;

export const Error = styled.span`
    position: absolute;
    line-height: 1;
    bottom: -${STYLES.fontSizes.basic + 3}px;
    left: 0;
    color: ${STYLES.colors.red};
`;

export const Label = styled.label`
    display: block;
    margin-bottom: ${STYLES.gutter / 3}px;
    font-weight: ${STYLES.fontWeight.bold}
`;
