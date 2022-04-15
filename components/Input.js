import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';

class Input extends Component {
    handleTextChange = (text) => {
        this.props.handleTextChange(text);
    }
    render() {
        return (
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="useless placeholder"
                    onChangeText={this.handleTextChange}
                    value={this.props.text}
                />
                <Text style={styles.button} onPress={this.props.addItem}>
                    Add
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    formGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    input: {
        height: 40,
        borderColor: '#0384fc',
        borderWidth: 1,
        padding: 10,
        borderRightWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderRightWidth: 0,
        width: '70%',

    },
    button: {
        height: 40,
        borderColor: '#0384fc',
        borderWidth: 1,
        padding: 10,
        width: '30%',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#0384fc',
        color: 'white',
    }
  });
  

export default Input;