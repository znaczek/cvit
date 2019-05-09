import * as React from 'react';
import {Themes} from '../common/styled/themes';
import {Form, Group, Label} from '../common/styled/Form';
import {T} from '../T';
import {Input} from '../common/styled/Input';
import {Button} from '../common/styled/Button';
import {Col, Row} from '../common/styled/Layout';

interface Props {
}

export class PrintConfig extends React.Component<Props> {
    props: Props;

    render() {
        return (
                <Form>
                    <Row>
                        <Col col={6}>
                            <Group>
                                <Label><T>PRINT_CONFIG.HAS_HEADER</T></Label>
                                <Input value={name} onChange={() => {}}/>
                            </Group>
                        </Col>
                        <Col col={6}>
                            <Group>
                                <Label><T>PRINT_CONFIG.HAS_FOOTER</T></Label>
                                <Input value={name} onChange={() => {}}/>
                            </Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col col={6}>
                            <Group>
                                <Label><T>PRINT_CONFIG.MARGIN_TOP</T></Label>
                                <Input value={name} onChange={() => {}}/>
                            </Group>
                        </Col>
                        <Col col={6}>
                            <Group>
                                <Label><T>PRINT_CONFIG.MARGIN_BOTTOM</T></Label>
                                <Input value={name} onChange={() => {}}/>
                            </Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col col={6}>
                            <Group>
                                <Label><T>PRINT_CONFIG.MARGIN_LEFT</T></Label>
                                <Input value={name} onChange={() => {}}/>
                            </Group>
                        </Col>
                        <Col col={6}>
                            <Group>
                                <Label><T>PRINT_CONFIG.MARGIN_RIGHT</T></Label>
                                <Input value={name} onChange={() => {}}/>
                            </Group>
                        </Col>
                    </Row>
                    <Group className={'submit'}>
                        <Button
                            theme={Themes.primary}
                            onClick={() => {}}
                            stretched
                        ><T>ACTIONS.CREATE</T></Button>
                    </Group>
                </Form>
        );
    }
}
