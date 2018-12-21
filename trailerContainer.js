import React, { Component } from 'react';
import TrailerList from './trailerList';
import {StyleSheet, View, Button} from 'react-native';

export default class TrailerContainer extends React.Component{
    constructor(props){
         super(props);

         this.navigateDetail = props.navigateDetail
    }
    render() {
        return (
            <>
                <TrailerList navigateDetail={this.navigateDetail}/>
            </>
        );
      }
}