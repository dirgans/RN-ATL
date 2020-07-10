import React, { PureComponent } from 'react';
import { View, AsyncStorage, Button, StyleSheet } from 'react-native';

class Step extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.root}>
        {this.props.children({
          onChangeValue: this.props.onChangeValue,
          values: this.props.values,
        })}
        <View style={styles.buttonWrapper}>
          <View style={{width: '50%'}}>
            <Button
              title="< Prev"
              disabled={this.props.currentIndex === 0}
              onPress={this.props.prevStep}
            />
          </View>
          <View style={{width: '50%'}}>
            {this.props.isLast ? (
              <Button title="Submit" color='red' onPress={this.props.onSubmit} />
            ) : (
              <Button title="Next >" onPress={this.props.nextStep} />
            )}
          </View>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  buttonWrapper: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Step;
