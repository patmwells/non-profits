import React from 'react';
import type { AppConfig } from '@client/App';
import { Card, Container, View } from './presentation';

/**
 *
 */
interface AppProps {
    app: AppConfig;
}

/**
 *
 * @param app
 */
export function AppContainer({ app }: AppProps): JSX.Element {
    return (
        <View>
            <Card>
                <Container>
                    <app.GeocoderStepper.Component app={app} />
                </Container>
            </Card>
        </View>
    );
}
