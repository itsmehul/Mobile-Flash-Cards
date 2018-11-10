import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function MyTextInput({
  onChangeText,
  value,
  placeholder,
  maxLength,
  style = {}
}) {
  return (
    <TextInput
    
      maxLength={maxLength}
      style={[styles.inp, style]}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  inp: {
    height: 60,
    textAlign: "center",
    color: "white",
    fontSize: 26,
    backgroundColor: "black"
  }
});
