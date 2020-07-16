import React, { useState } from "react";
import { StyleSheet, Text, View, Picker, TextInput, SafeAreaView } from "react-native";
import currencyData from "./assets/data";

export default function App() {
  const [currencyFrom, setCurrencyFrom] = useState(currencyData[0]);
  const [currencyTo, setCurrencyTo] = useState(currencyData[1]);
  const [moneyInput, setMoneyInput] = useState(0);
  const [moneyOutput, setMoneyOutput] = useState(0);
  const [rate, setRate] = useState(0);

  const currencyAPI = (moneyInputs) => {
    var from = currencyFrom.code;
    const request = "https://api.ratesapi.io/api/latest?base=" + from;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", request);
    const scope = this;
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var rate = response.rates[currencyTo.code];
        var toValue = rate * moneyInputs;
        var moneyOutputs = toValue.toFixed(2).toString();
        setMoneyInput(moneyInputs);
        setMoneyOutput(moneyOutputs);
        setRate(rate);
      } else {

      }
    };
    xhr.send();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Text style={{fontSize: 24}}>Currency Convertor</Text>
      </View>
      <View style={styles.converterContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.valueContainer}>
            <Text style={styles.textDec}>Input your value</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              autoFocus={true}
              onChangeText={(text) => currencyAPI(text)}
              placeholder={currencyFrom.code}
            />
          </View>
          <View style={styles.currencyContainer}>
            <Picker
              style={styles.currencyPicker}
              selectedValue={currencyFrom}
              onValueChange={(itemValue) => {
                setCurrencyFrom(itemValue);
                currencyAPI(moneyInput);
              }}
            >
              {currencyData.map((item) => {
                return (
                  <Picker.Item
                    label={item.code + " " + item.flag}
                    value={item}
                    key={item.id}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.valueContainer}>
            <Text style={styles.textDec}>Converted Value</Text>
            <TextInput
              editable={false}
              style={styles.textInput}
              keyboardType="number-pad"
              value={moneyOutput}
              placeholder={currencyTo.code}
            />
          </View>
          <View style={styles.currencyContainer}>
            <Picker
              style={styles.currencyPicker}
              selectedValue={currencyTo}
              onValueChange={(itemValue) => {
                setCurrencyTo(itemValue);
                currencyAPI(moneyInput);
              }}
            >
              {currencyData.map((item) => {
                return (
                  <Picker.Item
                    label={item.code + " " + item.flag}
                    value={item}
                    key={item.id}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
      </View>
      <View style={styles.rateContainer}>
        <Text style={{ fontSize: 30 }}>
          {currencyFrom.flag} - {currencyTo.flag}
        </Text>
        <Text style={styles.textRate}>
          current rate: {rate != null ? rate.toFixed(2) : ""}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 60,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  converterContainer: {
    
    padding: 20,
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    marginVertical: 5,
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  valueContainer: {
    justifyContent: "center",
    flex: 2.1,
  },
  textInput: {
    flex: 2,
    backgroundColor: "rgb(240,240,240)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "deepskyblue",
    paddingHorizontal: 15,
    marginRight: 5,
    fontSize: 25,
  },
  textDec: {
    flex: 1,
    fontSize: 15,
  },
  currencyContainer: {
    justifyContent: "center",
    flex: 1,
  },
  currencyPicker: {
    flex: 1,
    marginTop: 10,
  },
  textRate: {
    fontSize: 30,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "deepskyblue",
  },
});
