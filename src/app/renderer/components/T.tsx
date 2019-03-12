import {useTranslation} from 'react-i18next';
import * as React from 'react';

export function T(props: {children: string}) {
    const {t} = useTranslation();
    return <React.Fragment>{t(props.children)}</React.Fragment>
}