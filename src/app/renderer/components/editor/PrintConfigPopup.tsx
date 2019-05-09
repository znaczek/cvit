import * as React from 'react';
import {Popup} from '../common/Popup/Popup';
import {H2} from '../common/styled/Headers';
import {T} from '../T';
import {PrintConfig} from './PrintConfig';


interface Props {
    printConfigVisible: boolean;
    close: () => void;
}

export class NewProjectPopup extends React.Component<Props> {
    props: Props;

    render() {
        const {printConfigVisible, close} = this.props;
        return (
            <Popup
                visible={printConfigVisible}
                width='340px'
            >
                <Popup.Header handleClose={close}>
                    <H2><T>PRINT_CONFIG.HEADER</T></H2>
                </Popup.Header>
                <PrintConfig/>
            </Popup>
        );
    }
}
