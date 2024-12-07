import { StyleSheet, View } from 'react-native';
import WorldCus from '@/components/WorldCus';
import { SelectCountry } from 'react-native-element-dropdown';
import data from '../../lib/data.json'
import { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';


export default function HistoryPage() {
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [fromCurrencySympol, setFromCurrencySympol] = useState<string>("");
  const [fromCountry, setFromCountry] = useState<string>("From");
  const [name, setName] = useState<string[]>([]);

  const getAllCountries = (currencyP: string) => {
    const filteredCountries = data.filter((country) => country.currencies?.some((currency) => currency.code === currencyP)).map((country) => country.name);
    setName((prev) => [...prev, ...filteredCountries]);
  }
  useEffect(() => {
  }, [name, fromCurrencySympol]);

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
          setName([]);
          setFromCurrency(e.currencies![0].code);
          setFromCountry(e.name);
          setFromCurrencySympol(e.currencies![0].symbol)
          getAllCountries(e.currencies![0].code);

        }}
        value={fromCurrency}
      />
      <WorldCus pathIdToChange={name} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100,
    height: 200
  },
  imageStyle: {
    width: 35,
    height: 24,
    marginRight: 10
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

});
