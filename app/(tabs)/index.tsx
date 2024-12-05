import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, TextInput, useColorScheme, Text, View } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import data from '../../lib/data.json'
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';


type PairExchange = {
  base_code: string,
  target_code: string,
  conversion_rate: number,
  conversion_result: number
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [fromCountry, setFromCountry] = useState<string>("Select country");
  const [toCountry, setToCountry] = useState<string>("Select country");


  const [reservFrom, setReservFrom] = useState<string>("");
  const [reservTo, setReservTo] = useState<string>("");
  const [result, setResult] = useState<PairExchange>();
  const [amount, setAmout] = useState<string>("1");

  const exchange = async () => {
    console.log(amount)
    try {
      let response;
      if (amount === "1") {
        response = await fetch(`https://v6.exchangerate-api.com/v6/b65d0a8f412fdd2f0f965cb2/pair/${from}/${to}`);
      }
      else {
        response = await fetch(`https://v6.exchangerate-api.com/v6/b65d0a8f412fdd2f0f965cb2/pair/${from}/${to}/${amount}`);
      }

      const jsonData = await response!.json();
      setResult(jsonData);
    } catch (err) {
      console.error(err)
    }


  }

  /* const change = () => {
     setReservFrom(from);
     setReservTo(to);
     setFrom(reservTo);
     setTo(reservFrom);
   }*/

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
        placeholder={fromCountry}
        searchPlaceholder="Search..."
        onChange={e => {
          setFrom(e.currencies![0].code!);
          setFromCountry(e.name);

        }}
        value={from}
      />
      <Pressable style={styles.switch}>
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
        placeholder={toCountry}
        searchPlaceholder="Search..."
        onChange={e => {
          setTo(e.currencies![0].code!);
          setToCountry(e.name);
        }}
        value={to}
      />
      <TextInput
        style={styles.input}
        onChangeText={setAmout}
        value={amount}
        placeholder={`${amount}`}
        keyboardType="numeric"
      />
      <ThemedText>{result && result.base_code}</ThemedText>
      <ThemedText>{result && result.target_code}</ThemedText>
      <ThemedText>{amount == "1" && result ? result!.conversion_rate : amount != "1" && result && result!.conversion_result}</ThemedText>



      <Button
        onPress={exchange}
        title="Exchange"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

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
    fontSize: 16,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    color: "black",
    textAlign: "center"
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
});
