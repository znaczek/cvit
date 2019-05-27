import * as React from 'react';
import {Popup} from '../common/Popup/Popup';
import {T} from '../T';
import {PrintConfig} from './PrintConfig';
import {PrintConfigStateInterface} from '../../interfaces/state/print-config-state.interface';
import {H2} from '../common/html-styled/Headers';


interface Props {
    config: PrintConfigStateInterface;
    saveConfig: (config: PrintConfigStateInterface) => void;
    printConfigVisible: boolean;
    close: () => void;
}

export const PrintConfigPopup = (props: Props) => {
    const {config, saveConfig, printConfigVisible, close} = props;

    return (
        <Popup
            visible={printConfigVisible}
            width='340px'
        >
            <Popup.Header handleClose={close}>
                <H2><T>PRINT_CONFIG.HEADER</T></H2>
            </Popup.Header>
            {printConfigVisible && <PrintConfig
                config={config}
                saveConfig={saveConfig}
            />}
        </Popup>
    );
};
