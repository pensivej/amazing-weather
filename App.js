import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar } from 'react-native';
import Weather from "./Weather";

const API_KEY = "8042367a40d903407a2eee2c0cfa759a";

export default class App extends React.Component {
  state = {
    isLoaded: false,
    error: null,
  };

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: error,
        })
      }
    )
  };

  _getWeather = (lat, long) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      console.log(json);
    })
  }

  render() {
    const { isLoaded, error } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" hidden={true}/>
        {isLoaded? <Weather/> : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the Amazing Weather</Text>
            {error? <Text style={styles.errorText}>{error}</Text>:null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 24,
  },
  errorText: {
    color: 'red',
    marginBottom: 40,
  }
});
