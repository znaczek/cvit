import * as React from 'react';
import {T} from '../T';
import {PrintConfigStateInterface} from '../../interfaces/state/print-config-state.interface';
import {RadioGroup} from '../common/form/RadioGroup';
import {Translation} from 'react-i18next';
import {strToBool} from '../../../common/utils/converters.utils';
import {PrintConfigModel} from '../../models/print-config.model';
import {Form, Group, Label} from '../common/html-styled/Form';
import {Row, Col} from '../common/html-styled/Layout';
import {Input} from '../common/html-styled/Input';
import {Button} from '../common/html-styled/Button';
import {Themes} from '../themes';

interface Props {
    config: PrintConfigStateInterface,
    saveConfig: (config: PrintConfigStateInterface) => void,
}

type State = PrintConfigStateInterface;

type stateKey = keyof PrintConfigStateInterface;

export class PrintConfig extends React.Component<Props> {
    props: Props;
    state: State;

    private static headerFooterOptions = [
        {label: 'YES', value: true},
        {label: 'NO', value: false}
    ];

    constructor(props: Props) {
        super(props);
        this.state = {
            ...props.config
        };
    }

    public handleOnChange(key: stateKey, value: string | boolean) {
        if (key === 'hasHeader' || key === 'hasFooter') {
            value = strToBool(value.toString());
        } else {
            if (value && !/^\d+(\.\d*)?$/.test(value.toString())) {
                return;
            }
        }

        this.setState({
            [key]: value,
        })
    }

    public save = (): void => {
        this.props.saveConfig(new PrintConfigModel(this.state));
    };

    render() {
        const {hasHeader, hasFooter, marginTop, marginBottom, marginLeft, marginRight} = this.state;
        return (
            <Form>
                <Row>
                    <Col col={6}>
                        <Translation>{(t) => (
                            <RadioGroup
                                name='hasHeader'
                                label={t('PRINT_CONFIG.HAS_HEADER')}
                                options={PrintConfig.headerFooterOptions.map((item) => ({
                                    value: item.value,
                                    label: t(item.label),
                                }))}
                                value={hasHeader}
                                onChange={(e) => this.handleOnChange('hasHeader', e.target.value)}
                            />
                        )}
                        </Translation>
                    </Col>
                    <Col col={6}>
                        <Translation>{(t) => (
                            <RadioGroup
                                name='hasFooter'
                                label={t('PRINT_CONFIG.HAS_FOOTER')}
                                options={PrintConfig.headerFooterOptions.map((item) => ({
                                    value: item.value,
                                    label: t(item.label),
                                }))}
                                value={hasFooter}
                                onChange={(e) => this.handleOnChange('hasFooter', e.target.value)}
                            />
                        )}
                        </Translation>
                    </Col>
                </Row>
                <Row>
                    <Col col={6}>
                        <Group>
                            <Label><T>PRINT_CONFIG.MARGIN_TOP</T></Label>
                            <Input
                                value={marginTop}
                                min='0'
                                onChange={(e) => this.handleOnChange('marginTop', e.target.value)}
                            />
                        </Group>
                    </Col>
                    <Col col={6}>
                        <Group>
                            <Label><T>PRINT_CONFIG.MARGIN_BOTTOM</T></Label>
                            <Input
                                value={marginBottom}
                                min='0'
                                onChange={(e) => this.handleOnChange('marginBottom', e.target.value)}
                            />
                        </Group>
                    </Col>
                </Row>
                <Row>
                    <Col col={6}>
                        <Group>
                            <Label><T>PRINT_CONFIG.MARGIN_LEFT</T></Label>
                            <Input
                                value={marginLeft}
                                min='0'
                                onChange={(e) => this.handleOnChange('marginLeft', e.target.value)}
                            />
                        </Group>
                    </Col>
                    <Col col={6}>
                        <Group>
                            <Label><T>PRINT_CONFIG.MARGIN_RIGHT</T></Label>
                            <Input
                                value={marginRight}
                                min='0'
                                onChange={(e) => this.handleOnChange('marginRight', e.target.value)}
                            />
                        </Group>
                    </Col>
                </Row>
                <Group className={'submit'}>
                    <Button
                        theme={Themes.primary}
                        onClick={this.save}
                        stretched
                    ><T>ACTIONS.CREATE</T></Button>
                </Group>
            </Form>
        );
    }
}
