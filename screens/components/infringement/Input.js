import React, { useState ,PureComponent } from 'react';
import { TextInput, StyleSheet, Text, View, Button, TouchableOpacity, AsyncStorage } from 'react-native';


class SuratPerintah extends PureComponent {
  _onChangeText = (text) => {

    AsyncStorage.setItem(this.props.name, text);
    this.props.onChangeValue(this.props.name, text);
    

  };

  

  render() {
    const { onChangeValue, name, ...rest } = this.props;
    // const [nomorSP, setNomorSP] = useState('');
    
    return (
      
        <View style={{  width: '80%', paddingHorizontal: 5}}>
          <TextInput
            style={styles.root}
            {...rest}
            onChangeText={this._onChangeText}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f4f9f4',
    width: '100%',
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
});

export default SuratPerintah;
