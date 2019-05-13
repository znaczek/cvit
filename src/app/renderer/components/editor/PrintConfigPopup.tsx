import * as React from 'react';
import {Popup} from '../common/Popup/Popup';
import {H2} from '../common/styled/Headers';
import {T} from '../T';
import {PrintConfig} from './PrintConfig';
import {PrintConfigStateInterface} from '../../interfaces/state/print-config-state.interface';


interface Props {
    config: PrintConfigStateInterface;
    saveConfig: (config: PrintConfigStateInterface) => void;
    printConfigVisible: boolean;
    close: () => void;
}

export class PrintConfigPopup extends React.Component<Props> {
    props: Props;

    render() {
        const {config, saveConfig, printConfigVisible, close} = this.props;
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
    }
}
