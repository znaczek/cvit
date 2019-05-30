import * as React from 'react';
import styled from 'styled-components';

interface Props {
    size?: string;
    color?: string;
}

const Loader = styled.div`
    display: inline-block;
    width: ${(props: Props) => props.size};
    height: ${(props: Props) => props.size};
    vertical-align: bottom;

    & > div {
        width: 100%;
        height: 100%;
        animation: spin steps(8) 800ms infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg)
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;


export const SimpleLoader = (props: Props) => {
    return (
        <Loader {...props}>
            <div>
                <svg viewBox="-10 -10 140 140">
                    <circle fill={props.color} cx="60" cy="10" r="7" opacity="0.2"/>
                    <circle fill={props.color} cx="95" cy="25" r="8" opacity="0.3"/>
                    <circle fill={props.color} cx="110" cy="60" r="9" opacity="0.4"/>
                    <circle fill={props.color} cx="95" cy="95" r="10" opacity="0.5"/>
                    <circle fill={props.color} cx="60" cy="110" r="11" opacity="0.6"/>
                    <circle fill={props.color} cx="25" cy="95" r="12" opacity="0.7"/>
                    <circle fill={props.color} cx="10" cy="60" r="13" opacity="0.8"/>
                    <circle fill={props.color} cx="25" cy="25" r="15" opacity="1.0"/>
                </svg>
            </div>
        </Loader>
    );
};

