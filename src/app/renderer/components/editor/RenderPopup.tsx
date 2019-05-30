import * as React from 'react';
import {Popup} from '../common/Popup/Popup';
import {T} from '../T';
import {StatusEnum} from '../../../common/enums/status.enum';
import styled from 'styled-components';
import {STYLES} from '../../styles/variables';
import {SimpleLoader} from '../common/loaders/RenderLoader';
import {H2, H3} from '../common/html-styled/Headers';
import {Button} from '../common/html-styled/Button';
import {Themes} from '../themes';
import {P} from '../common/html-styled/Layout';

interface Props {
    visible: boolean;
    close: () => void;
    message: string;
    status: StatusEnum;
    rerun: () => void;
    openFile: () => void;
}

const Header = styled(H3)`
    text-align: center;
    margin-bottom: ${STYLES.gutter}px
`;

export const RenderPopup = (props: Props) => {
    const {visible, close, message, status, rerun, openFile} = props;

    return (
        <Popup
            visible={visible}
        >
            <Popup.Header handleClose={close}>
                <H2><T>RENDER.HEADER</T></H2>
            </Popup.Header>
            {status === StatusEnum.PENDING ?
                <Header>
                    <SimpleLoader color={STYLES.colors.gray3} size='1em'/>
                    <T>RENDER.LOADING</T>
                </Header> : status === StatusEnum.SUCCESS ?
                    <div>
                        <Header><span style={{color: STYLES.colors.green}}>&#10004;</span><T>RENDER.SUCCESS</T></Header>
                        <Button onClick={rerun}><T>RENDER.RERUN</T></Button>
                        <Button
                            onClick={openFile}
                            theme={Themes.primary}
                        ><T>RENDER.OPEN_PDF</T></Button>
                    </div> : <div>
                        <Header><span style={{color: STYLES.colors.red}}>&#10006;</span><T>RENDER.FAILURE</T></Header>
                        <P>{message}</P>
                        <Button onClick={rerun}><T>RENDER.RERUN</T></Button>
                    </div>
            }
        </Popup>
    );
};
