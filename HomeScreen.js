import React, {Component} from 'react';
import TrailerContainer from './trailerContainer';
import {StyleSheet, View, Button, NetInfo} from 'react-native';

export default class HomeScreen extends React.Component {    
    constructor(props){
      super(props)

      this.navigateDetail = this.navigateDetail.bind(this);
    }
    
    static navigationOptions = {
      title: 'Home',
      headerStyle: {
        backgroundColor: '#EF233C',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '500',
      },
    }; 

    navigateDetail(nameParam, defaultValue){
      this.props.navigation.navigate(nameParam, defaultValue)
    }
    
    render() {
      return (
        <View style={styles.container}>
          <TrailerContainer navigateDetail={this.navigateDetail}/>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    }
  });