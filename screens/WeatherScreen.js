import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet, 
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import Error from '../Components/Error';

import Icon from 'react-native-vector-icons/Feather';

const date = new Date();

const connectingErrorText = 'Problems connecting to the Internet. check the connection.'

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

let monthArray = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
]

let daysArray = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

let iconsNames = {
  '01d': 'sun',
  '01n': 'moon',
  '02d': 'cloud',
  '02n': 'cloud',
  '03d': 'cloud',
  '03n': 'cloud',
  '04d': 'cloud',
  '04n': 'cloud',
  '50d': 'cloud',
  '50n': 'cloud',
  '09d': 'cloud-rain',
  '09n': 'cloud-rain',
  '10d': 'cloud-rain',
  '10n': 'cloud-rain',
  '11d': 'cloud-lightning',
  '11n': 'cloud-lightning',
  '13d': 'cloud-snow',
  '13n': 'cloud-snow'
}

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectingError: false,
      weatherLoaded: false,
      calendarData: {
        month: monthArray[date.getMonth()],
        day: date.getDate(),
        weekDay: daysArray[date.getDay()],
      },
      weatherData: {}
    };
    this.getWeather();
  }

  static navigationOptions = {
    header: null
  }

  showError() {
    this.setState({ connectingError: true })
  }

  hideError() {
    this.setState({ connectingError: false })
  }

  getMM(gpa) {
    return (gpa * 0.750062).toFixed(0);
  }

  getC(k) {
    return (k - 273.15).toFixed(0);
  }

  weatherLoaded = async (response) => {
    const json = await response.json();
    await this.getWeatherData(json);
    await this.setState({weatherLoaded: true});
  }

  getWeather = async () => {
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Kharkiv&APPID=4846bebd169eb33d9d98d04ee0adf400')
    await response ? this.weatherLoaded(response) : this.showError();
  }

  getWeatherData(res) {
    this.setState({weatherData: {
      city: res.name,
      temp: this.getC(res.main.temp),
      windSpeed: res.wind.speed.toFixed(1) + ' m/s',
      humidity: res.main.humidity + ' %',
      pressure: this.getMM(res.main.pressure) + ' mm',
      description: res.weather[0].description,
      iconName: iconsNames[res.weather[0].icon]
    }})
  }

  render() {
    return (
      <LinearGradient colors={['#0e0d1f', '#258aab']} style={styles.container}>
        {
          this.state.connectingError ? 
          <Error text={connectingErrorText} /> :
          null 
        }
        <View style={styles.dateContainer}>
          <View style={styles.dayContainer}>
            <Text style={styles.text}>{this.state.calendarData.month}</Text>
            <Text style={styles.text}>{this.state.calendarData.day}</Text>
          </View>
          <Text style={styles.text}>{this.state.calendarData.weekDay}</Text>
        </View>
        <View style={styles.weatherContainer}>
          <View style={styles.weatherIcon}>
            {this.state.weatherLoaded ?
            <Icon name={this.state.weatherData.iconName} size={HEIGHT / 3.5} color='#fff' /> :
            null}
          </View>
          <Text style={styles.weatherDescription}>{this.state.weatherData.description}</Text>
          <View style={styles.cityWeather}>
              <Text style={styles.cityText}>{this.state.weatherData.city}</Text>
              <View style={styles.cityTemp}>
                <Text style={styles.tempText}>{this.state.weatherData.temp}</Text>
                <Icon name='circle' size={HEIGHT / 50} color='#fff' />
              </View>
          </View>
          <View style={styles.weatherParam}>
              <View style={styles.weatherParamElem}>
                <Icon name='wind' size={HEIGHT / 20} color='#fff'></Icon>
                <Text style={styles.weatherParamElemText}>{this.state.weatherData.windSpeed}</Text>
              </View>
              <View style={styles.weatherParamElem}>
                <Icon name='droplet' size={HEIGHT / 20} color='#fff'></Icon>
                <Text style={styles.weatherParamElemText}>{this.state.weatherData.humidity}</Text>
              </View>
              <View style={styles.weatherParamElem}>
                <Icon name='thermometer' size={HEIGHT / 20} color='#fff'></Icon>
                <Text style={styles.weatherParamElemText}>{this.state.weatherData.pressure}</Text>
              </View>
          </View>
        </View>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.logOutButton}
        >
          <Text style={styles.logOutButtonText}>LogOut</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  logOutButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: HEIGHT / 30,
    textAlign: 'center',
    fontWeight: '500'
  },
  container: {
    height: null,
    width: null,
    flex: 1
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: HEIGHT / 30,
    opacity: 0.7,
    fontWeight: '100'
  },
  dayContainer: {
    flexDirection: 'row'
  },
  weatherContainer: {
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: HEIGHT / 30,
    marginHorizontal: HEIGHT / 100
  },
  weatherIcon: {
    alignItems: 'center'
  },
  weatherDescription: {
    color: '#fff',
    fontSize: HEIGHT / 20,
    textAlign: 'center',
    marginBottom: HEIGHT / 10,
    fontWeight: '100'
  },
  cityWeather: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: HEIGHT / 30,
    marginBottom: HEIGHT / 30
  },
  cityText: {
    color: '#fff',
    fontSize: HEIGHT / 12
  },
  cityTemp: {
    flexDirection: 'row'
  },
  tempText: {
    color: '#fff',
    fontSize: HEIGHT / 12,
    marginHorizontal: WIDTH / 100
  },
  weatherParam: {
    height: HEIGHT / 15,
    paddingHorizontal: HEIGHT / 30,
    backgroundColor: '#0e0d1f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 0.8
  },
  weatherParamElem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  weatherParamElemText: {
    color: '#fff',
    fontSize: HEIGHT / 40,
    marginHorizontal: WIDTH / 100
  },
  logOutButton: {
    height: HEIGHT / 15,
    backgroundColor: '#0e0d1f',
    justifyContent: 'center'
  }
});
