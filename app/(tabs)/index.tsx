import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Home() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Home</ThemedText>
            </ThemedView>
            <ThemedText>This app is to exchange currency and see which countries use the same currency by select the country.</ThemedText>
            <Collapsible title="Exchange">
                <ThemedText>
                    In this section you can select :
                    <ThemedText type="defaultSemiBold">From which country</ThemedText> and
                    <ThemedText type="defaultSemiBold"> To which country</ThemedText>
                    and it will automaticlly show you the currenc sympol and the value.
                </ThemedText>
            </Collapsible>
            <Collapsible title="Map">
                <ThemedText>
                    You can open a map on this project. The map show you the whole world map. When the user select a country it will show you the country currency and all countries which has the same currency.
                </ThemedText>
            </Collapsible>
            <Collapsible title="API">
                <ThemedText>
                    In this app I use <ThemedText type="defaultSemiBold">ExchangeRate-API </ThemedText>
                </ThemedText>
                <Collapsible title="Excahnge">
                    <ThemedText>
                        <ThemedText type="defaultSemiBold">GET https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP</ThemedText>
                    </ThemedText>
                </Collapsible>
                <Collapsible title="Excahnge with anount">
                    <ThemedText>
                        <ThemedText type="defaultSemiBold">GET https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP/AMOUNT</ThemedText>
                    </ThemedText>
                </Collapsible>
            </Collapsible>
        </ParallaxScrollView >
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
