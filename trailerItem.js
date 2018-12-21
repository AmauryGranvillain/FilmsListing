import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';

export default class TrailerItem extends React.Component{
    constructor(props){
        super(props);
        this.state={title: props.title, image: props.image, genre: props.genre}

        this.checkGenres = this.checkGenres.bind(this);
    }
    _onPress = () => {
        this.props.onPressItem(this.props.id);
      };
    

    checkGenres(){
        if(!this.state.genre || this.state.genre.length === 0) {
           return <Text>Genre no inquired</Text>
        }
        return this.state.genre.map((genre) => {
           return <Text key={genre} style={styles.genre}>{genre} </Text>
       });
   }

    render(){
        return(
            <View style={styles.list}>
                <TouchableOpacity style={styles.containerItem} onPress={this._onPress}>
                    <Image style={styles.image} source={{uri: this.state.image}}/>
                    <View style={styles.item}>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <View style={styles.contentGenre}>
                            {this.checkGenres()}
                        </View>
                    </View>
                    <Image style={styles.icon} source={require('./assets/login.png')} />
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    list: {
        borderBottomWidth:3,
        borderBottomColor: '#2B2D42',
    },
    containerItem:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    contentGenre:{
        flex:0.3,
        flexDirection:'row',
    },
    image: {
        width:67,
        height:97
    },
    title:{
        paddingLeft: 10,
        paddingVertical:5,
        color: '#D90429',
        fontSize: 16
    },
    genre:{
        paddingLeft: 10,
        paddingVertical:5,
        color: '#8D99AE',
        fontSize: 13,
        fontStyle:'italic',
        textDecorationLine: 'underline'
    },
    icon: {
        position: 'absolute',
        right:10,
        width:40,
        height:40
    },
});