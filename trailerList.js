import React, {Component} from 'react';
import TrailerItem from './trailerItem';
import {ScrollView, FlatList} from 'react-native';
import {_storeData, _retrieveData} from './storage/localStorage';

export default class TrailerList extends React.Component{
    constructor(props){
        super(props);
        this.state= {trailerList: [], selected: (new Map())};
        this.navigateDetail = props.navigateDetail
    }
    
    componentDidMount(){
        fetch('http://localhost:8080/trailers')
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Something went wrong on api server!');
            }
        })
        .then(responseJson => {
            responseJson.sort(function(a, b){
                if(a.title < b.title) { return -1; }
                if(a.title > b.title) { return 1; }
                return 0;
            })
            _storeData(responseJson);
            this.setState({trailerList: responseJson});
        }).catch(error => {
            console.error(error);
        });

        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });
        function handleFirstConnectivityChange(isConnected) {
            console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
            NetInfo.isConnected.removeEventListener(
                'connectionChange',
                handleFirstConnectivityChange
            );
        }
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            handleFirstConnectivityChange
        );    
    }
  
    _onPressItem = (id) => {
      // updater functions are preferred for transactional updates
      this.setState((state) => {
        // copy the map rather than modifying state.
        const selected = new Map(state.selected);
        selected.set(id, !selected.get(id)); // toggle
        return {selected};
      });
      this.navigateDetail('Details', {item: id});
    };
  
    _renderItem = ({item}) => (
      <TrailerItem
        id={item}
        key={item}
        onPressItem={this._onPressItem}
        selected={!!this.state.selected.get(item.id)}
        title={item.title}
        image={item.poster}
        genre={item.genre}
      />
    );
    render(){
        return( 
            <ScrollView>
                <FlatList data={this.state.trailerList} extraData={this.state} renderItem={this._renderItem}/>
            </ScrollView>
        ) 
    }
}