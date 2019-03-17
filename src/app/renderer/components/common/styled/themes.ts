import {STYLES} from '../../../styles/variables';

export interface ThemeInterface {
    fg: string,
    bg: string,
}

export const Themes: {[index: string]: ThemeInterface} = {
    default: {
        fg: STYLES.colors.black,
        bg: STYLES.colors.gray2,
    },
    primary: {
        fg: STYLES.colors.white,
        bg: STYLES.colors.primary,
    }
};
