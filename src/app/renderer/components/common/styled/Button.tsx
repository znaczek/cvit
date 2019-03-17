import styled from 'styled-components';
import {ThemeInterface, Themes} from './themes';

interface Props {
    theme: ThemeInterface,
}

export const Button = styled.button`
    color: ${(props: Props) => props.theme.fg || Themes.default.fg};
    background: ${(props: Props) => props.theme.bg || Themes.default.bg};
    border: none;
    font-size: 20px;
    padding: 5px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.6);
`;
