import React, { Component } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Box, Checkbox, IconButton, Icon } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ItemContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textStyles: [styles.text],
        }
    }

    todoDone = () => {
        
        console.log(this.props.index);
    }

    handlePress = async () => {
        if (this.state.textStyles.includes(styles.lineThrough)) {
            this.setState({
                textStyles: [styles.text],
            });
        } else {
            this.setState({
                textStyles: [styles.text, styles.lineThrough],
            })
        }

        try {
            let items = await AsyncStorage.getItem('items');
            if (items !== null) {
                items = JSON.parse(items);
                const text = this.props.text
                if (items.includes(text)) {
                    items = items.filter(item => item !== text);
                    try {
                        await AsyncStorage.setItem('items', JSON.stringify(items));
                    } catch (error) {
                        alert(error);
                    }

                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flex}>
                    <View style={styles.checkbox}>
                        <Checkbox size="lg" value="test" accessibilityLabel="This is a dummy checkbox" onPress={this.handlePress} />
                    </View>
                    <Text ref={this.myRef} style={this.state.textStyles}>{this.props.text}</Text>
                    <Pressable style={styles.delete} onPress={this.props.deleteItem.bind(this, this.props.index)}>
                        <MaterialCommunityIcons name="delete-restore" size={32} color="#0384fc" />
                    </Pressable>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
    },

    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    checkbox: {
        width: '10%',
    },

    text: {
        width: '80%',
        fontSize: 24,
        marginTop: -4,
    },

    delete: {
        width: '10%',
    },

    lineThrough: {
        textDecorationLine: 'line-through',
    },
  });


export default ItemContainer;