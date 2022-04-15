import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Keyboard, ScrollView, Alert } from 'react-native';
import Input from './Input';
import ItemContainer from './ItemContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';



class Body extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            text: '',
        }
    }

    handleTextChange = (text) => {
        this.setState({ text });
    }

    addItem = async () => {
        const { text } = this.state
        if (text.length > 0) {
            let allItems = await AsyncStorage.getItem('items');
            if (allItems !== null) {
                allItems = JSON.parse(allItems);
                allItems.push(text);
                try {
                    await AsyncStorage.setItem('items', JSON.stringify(allItems));
                    this.setState({
                        items: [...this.state.items, text],
                        text: '',
                    });
                } catch (error) {
                    alert(error);
                }
            } else {
                try {
                    await AsyncStorage.setItem('items', JSON.stringify([text]));
                    this.setState({
                        items: [text],
                        text: '',
                    });
                } catch (error) {
                    alert(error);
                }
            }
            // Keyboard dismiss
            Keyboard.dismiss();

        } else {
            alert('Please enter a value');
        }
    }

    deleteItem = (index) => {
        Alert.alert(
            "Delete Item",
            "Are you sure you want to delete this item?",
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "OK", onPress: () => { 
                    const newItems = [...this.state.items];
                    newItems.splice(index, 1);
                    this.setState({
                        items: newItems,
                    });
                    try {
                        AsyncStorage.setItem('items', JSON.stringify(this.state.items));
                    } catch (error) {
                        alert('Something went wrong');
                    }
                }}
            ]
        );
    }

    getItem = async () => {
        try {
            let items = await AsyncStorage.getItem('items');
            if (items !== null) {
                this.setState({
                    items: JSON.parse(items),
                });
            }

        } catch (error) {
            alert(error);
        }
    };

    componentDidMount() {
        this.getItem();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar/>
                <Text style={styles.title}>ToDo List</Text>
                <Input handleTextChange={this.handleTextChange} addItem={this.addItem} text={this.state.text} />
                
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {this.state.items.map((item, index) => {
                    return <ItemContainer text={item} key={index} index={index} deleteItem={this.deleteItem} />
                })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgb(235, 235, 235)',
      padding: 10,
      height: '100%',
    },
    title: {
      fontSize: 30,
      marginBottom: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#0384fc'
    },
  });

export default Body;