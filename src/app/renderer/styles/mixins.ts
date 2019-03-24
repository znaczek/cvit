import {css} from 'styled-components';

export const MIXINS = {
    focusable: css`
        transition: outline-color 0.3s ease-out
        outline-width: 2px;
        outline-style: solid;
        outline-color: rgba(0, 0, 0, 0);
        &:focus {
            outline-color: rgba(32, 51, 144, 0.5);
        }
    `
};
