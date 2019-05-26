import * as React from 'react';
import {Popup} from '../common/Popup/Popup';
import {H2, H3} from '../common/styled/Headers';
import {T} from '../T';
import {StatusEnum} from '../../../common/enums/status.enum';
import {Button} from '../common/styled/Button';
import styled from 'styled-components';
import {STYLES} from '../../styles/variables';
import {RenderLoader} from '../common/loaders/RenderLoader';
import {P} from '../common/styled/Layout';
import {Themes} from '../common/styled/themes';

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
                    <RenderLoader color={STYLES.colors.gray3}/>
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
