import React from 'react';
import { Button, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';

class MyBackButton extends React.Component {
  render() {
    return <Button title="Back" onPress={async() => { console.log(await AsyncStorage.getItem('_token'));
    ;this.props.navigation.navigate('Login'); }} />;
  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(MyBackButton);