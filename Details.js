import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ScrollView,LayoutAnimation, PropTypes} from 'react-native';

export default class TrailerDetails extends React.Component {
    constructor(props){
        super(props);
        const {navigation} = this.props
        this.state = {flex : 1.5}
        this.trailer = navigation.getParam('item', {title: ''});

        this.checkActors = this.checkActors.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    static navigationOptions = {
        title: 'Details',
        headerStyle: {
            backgroundColor: '#EF233C',
          },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: '500',
        },
      }; 

    checkActors(){
         if(!this.trailer.actors || this.trailer.actors.length === 0) {
            return <Text>Actors no inquired</Text>
         }

         return this.trailer.actors.map((actor) => {
            return <Text key={actor} style={styles.actor}>{actor} </Text>
        });
    }

    checkGenres(){
        if(!this.trailer.genre || this.trailer.genre.length === 0) {
           return <Text>Genre no inquired</Text>
        }

        return this.trailer.genre.map((genre) => {
           return <Text key={genre}>{genre} </Text>
       });
    }

    handleScroll(event) {
        console.log(event.nativeEvent.contentOffset.y);
        const scrollY = event.nativeEvent.contentOffset.y;
        if(scrollY > 0){
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            this.setState({flex: 0.5})
        } else if(scrollY < 0){
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            this.setState({flex: 1.5})
        }
    }

    render() {
        return (
            <>
                <View style={[styles.container, {flex:this.state.flex}]}>
                    <Image style={styles.image} source={{uri: this.trailer.poster}}/>
                    <Text style={styles.title}>{this.trailer.title}</Text>
                </View>
                <Text style={styles.date}>{this.trailer.releasedate.substring(0,16)}</Text>
                <View style={styles.info}>
                    <ScrollView style={styles.scroll} onScroll={this.handleScroll}>
                        <View style={styles.contentRow}>
                            <View style={styles.contentInfo}>
                                <Text style={styles.category}>Genre</Text>
                                <View style={styles.contentInfo}>
                                    {this.checkGenres()}
                                </View>
                            </View>
                            <View style={styles.contentInfo}>
                                <Text style={styles.category}>Studio</Text>
                                <Text style={styles.genre}>{this.trailer.studio}</Text>
                            </View>
                        </View>
                        <View style={styles.contentInfo}>
                            <Text style={styles.category}>Actors</Text>
                            <View style={styles.contentActor}>
                                {this.checkActors()}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      zIndex: 10,
    },
    info: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    contentInfo: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        padding: 10,
    },
    contentActor: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent:'flex-start',
        flexWrap: 'wrap',
        padding: 10
    },
    contentRow:{
        flex : 1,
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        borderBottomColor: '#EDF2F4',
        borderBottomWidth: 2,
        padding: 10
    },
    date:{
        backgroundColor: '#EF233C',
        color: 'white',
        textAlign:'center',
        padding:10,
        paddingTop: 30,
    },
    scroll:{
        width: '100%'
    },  
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
        opacity: 0.9
    },
    title:{
        paddingHorizontal:30,
        paddingVertical:10,
        position:'absolute',
        bottom:-20,
        backgroundColor: '#FFFFFF',
        color:'#D90429',
        fontSize:20,
        borderBottomWidth:1,
        borderBottomColor: '#D90429',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    category:{
        paddingHorizontal:30,
        paddingVertical:10,
        color:'#EF233C',
        textDecorationLine: 'underline',
        fontSize: 16
    },
    genre:{
        padding:10,
    },
    actor:{
        padding: 5,
        borderWidth: 2,
        borderColor: '#8D99AE',
        margin: 5
    },
  });