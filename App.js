import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import WeatherScreen from './screens/WeatherScreen';

const AppStackNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Weather: WeatherScreen
  }, {
    initialRouteName: 'Login'
  }
)

const AppContainer = createAppContainer(AppStackNavigator)

let autorizationData = {
  login: 'admin',
  password: 'admin'
}

export default class App extends Component {
  constructor() {
    super();
  }

  getAutorization(data) {
    if (data.login === autorizationData.login && data.password === autorizationData.password) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const screenProps = {
      getAutorization: this.getAutorization.bind(this)
    }
    return (
      <AppContainer 
        screenProps = { screenProps }
      />
    )
  }
}