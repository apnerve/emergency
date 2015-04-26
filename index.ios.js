/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';

 var mock = [
 {
  name: 'Madivala Police Station',
  distance: 4.7,
  phone: '08022942568',
  place: 'Madivala Road',
  address: 'Madivala Police Station Stop, Madiwala Mandi, Madivala Road, Koramangala 1st Block, Madiwala, Venkatapura, Koramangala, Bengaluru, Karnataka 560034'
},
{
  name: 'Parappana Agrahara Police Station',
  distance: '5.2',
  phone: '08022943468',
  place: 'Madivala'
},
{
  name: 'Mico Layout Police Station',
  distance: '6.1',
  phone: '08022942569',
  place: 'Mico Layout'
},
{
  name: 'Hulimavu Police Station',
  distance: '6.8',
  phone: '08022943470',
  place: 'Hulimavu'
}
];

var api_key = 'AIzaSyCo-HerV6cQ7RtHPYdCRWLm1HfdH0l-y_A';
var api_url = 'https://maps.googleapis.com/maps/api/';
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  MapView,
  ListView
} = React;

var emergency = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['a']),
      position: {
        latitude: 12.892129599999999,
        longitude: 77.6419987
      },
      places: []
    };
  },

  componentDidMount: function() {
    var that = this;
    navigator.geolocation.getCurrentPosition(function(data) {
      console.log(data.coords);
      that.setState({position: data.coords});
    });
    var places = this.fetchPlaces('police',this.state.position);
    // console.log(places);
    // this.setState({dataSource: ds.cloneWithRows(places)});
  },

  renderRow: function(data) {
    return (
      <View style={styles.ListView}>
        <View style={styles.media_bd}>
          <Text style={styles.headers}>{data.name}</Text>
          <Text style={styles.light}>{data.place} - {data.distance}KM</Text>
        </View>
        <View style={styles.media_hd} onPress={this.call}><Text>Call</Text></View>
      </View>
      );
  },

  call: function(number) {
    //console.log();
  },

  fetchPlaces: function(type, origin) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // var that = this;
    // var url = api_url + 'place/nearbysearch/json?location=' + origin.latitude + ',' + origin.longitude + '&radius=5000&types=' + type + '&key=' + api_key;
    // console.log(url);
    // fetch(url)
    // .then(function(response) {
    //   return response.text();
    // })
    // .then(function(responseText) {
    //   var places = [];
    //   var responseJSON = JSON.parse(responseText);
    //   responseJSON.results.map(function(result) {
    //     if(result.name.contains('Police Station')) {
    //       places.push({
    //         station: result.name,
    //         latitude: result.geometry.location.lat,
    //         longitude: result.geometry.location.lng
    //       });
    //     }
    //   });
      // that.getDistance(places);
      // that.setState({dataSource: ds.cloneWithRows(places)});
    // });
this.setState({dataSource: ds.cloneWithRows(mock)});
},

getDistance: function(destinations) {
  var dests = [];
  destinations.map(function(dest) {
    dests.push(dest.latitude + ',' + dest.longitude);
  });
  dests = dests.join('|');

    // dests = '12.9210319,77.6206811|12.8772911,77.6673532|12.90845,77.6105745|12.8766241,77.6000511'

    var url = api_url + 'distancematrix/json?origins=' + this.state.position.latitude + ',' + this.state.position.longitude + '&destinations=' + dests + '&mode=driving&key=' + api_key;
    console.log(url);
    fetch(url)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.error(error);
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Emergency</Text>

        <MapView
        style={styles.map}
        region={{latitude: this.state.position.latitude, longitude:this.state.position.longitude,latitudeDelta:0.001,longitudeDelta:0.001}}
        showsUserLocation={true}
        rotateEnabled={true}/>

        <View style={styles.listContainer}>
        <ListView style={styles.list} dataSource={this.state.dataSource} renderRow={this.renderRow} />
        </View>

      </View>
      );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#1B2B32',
    marginTop: 20,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  list: {
    margin: 10
  },
  listItem: {
    margin: 10,
    fontSize: 20,
  },
  ListView: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6'
  },
  welcome: {
    width: 375,
    height: 42,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: '#ffffff',
  },
  headers: {
    fontSize: 20
  },
  light: {
    color: '#999999'
  },
  instructions: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
  },
  map: {
    width: 375,
    height: 240
  },
  media_bd: {
    flex:1,
  },
  media_hd: {
    flex: 1,
  }
});

AppRegistry.registerComponent('emergency', () => emergency);
