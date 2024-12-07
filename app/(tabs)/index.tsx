import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, useColorScheme, Text, View } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import data from '../../lib/data.json'
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';


type PairExchange = {
  base_code: string,
  target_code: string,
  conversion_rate: number,
  conversion_result: number
  time_last_update_utc: string
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [fromCountry, setFromCountry] = useState<string>("From");
  const [toCountry, setToCountry] = useState<string>("To");
  const [fromCurrencySympol, setFromCurrencySympol] = useState<string>("");
  const [toCurrencySympol, setToCurrencySympol] = useState<string>("");
  const [result, setResult] = useState<PairExchange>();
  const [amount, setAmout] = useState<string>("");

  useEffect(() => {
  }, [fromCurrencySympol, toCurrencySympol, result]);

  const exchange = async () => {
    if (fromCurrency && toCurrency) {
      try {
        let response;
        if (amount === "") {
          response = await fetch(`https://v6.exchangerate-api.com/v6/b65d0a8f412fdd2f0f965cb2/pair/${fromCurrency}/${toCurrency}`);
        }
        else {
          response = await fetch(`https://v6.exchangerate-api.com/v6/b65d0a8f412fdd2f0f965cb2/pair/${fromCurrency}/${toCurrency}/${amount}`);
        }

        const jsonData = await response!.json();
        setResult(jsonData);
      } catch (err) {
        console.error(err)
      }
    }
  }

  const change = () => {
    if (fromCountry && toCountry) {
      setFromCountry(toCountry);
      setToCountry(fromCountry);
      setFromCurrencySympol(toCurrencySympol);
      setToCurrencySympol(fromCurrencySympol);
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      exchange();
    }
  }

  return (
    <ParallaxScrollView>
      <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        imageStyle={styles.imageStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        maxHeight={300}
        data={data}
        valueField="alpha2Code"
        labelField="name"
        imageField="flags"
        placeholder={fromCountry + " - " + fromCurrencySympol}
        searchPlaceholder="Search..."
        onChange={e => {
          setFromCurrency(e.currencies![0].code);
          setFromCountry(e.name);
          setFromCurrencySympol(e.currencies![0].symbol)
        }}
        value={fromCurrency}
      />
      <Pressable style={styles.switch} onPress={change}>
        <IconSymbol size={28} name="switch.2" color={colorScheme === 'dark' ? '#fff' : '#000'} />
      </Pressable>
      <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        imageStyle={styles.imageStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        maxHeight={300}
        data={data}
        valueField="alpha2Code"
        labelField="name"
        imageField="flags"
        placeholder={toCountry + " - " + toCurrencySympol}
        searchPlaceholder="Search..."
        onChange={e => {
          setToCurrency(e.currencies![0].code!);
          setToCountry(e.name);
          setToCurrencySympol(e.currencies![0].symbol)
        }}
        value={toCurrency}
      />
      <TextInput
        style={styles.input}
        onChangeText={setAmout}
        value={amount}
        placeholder={"0.0"}
        keyboardType="numeric"
      />

      <Pressable style={styles.btn} onPress={exchange} disabled={false}>
        <Text style={[styles.text, { fontSize: 16, color: colorScheme === 'dark' ? '#000' : '#fff' }]}>Exchange</Text>
      </Pressable>
      <View style={styles.result}>
        <ThemedText style={styles.text}>{result && result.time_last_update_utc}</ThemedText>
        <ThemedText type='subtitle' style={styles.text}>{result && `1 ${result.base_code}  =  ${result.conversion_rate} ${result.target_code}`}</ThemedText>
        <ThemedText type='subtitle' style={styles.text}>{result?.conversion_result && `${amount} ${result.base_code}  =  ${result.conversion_result} ${result.target_code}`}</ThemedText>

      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 35,
    height: 24,
    marginRight: 10
  },
  switch: {
    width: 28,
    alignSelf: "center",
  },
  input: {
    height: 70,
    margin: 12,
    fontSize: 24,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    color: "black",
    textAlign: "center",
    borderRadius: 15,
  },
  dropdown: {
    height: 70,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white"
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#601ba1",
    height: 50,
    borderRadius: 15,
    width: "40%",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
  result: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  }
});
