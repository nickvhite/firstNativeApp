import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet, 
  Text, 
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  Dimensions
} from 'react-native';

import Error from '../Components/Error';

import logo from '../images/logo.png';
import Icon from 'react-native-vector-icons/Ionicons';

const authorizationErrorText = 'Wrong login or password. Try again.'

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const keyBoardOptions = {
  placeholderTextColor: 'rgba(255, 255, 255, 0.7)',
  underlineColorAndroid: 'transparent',
  autoCorrect: false,
  autoCapitalize: 'none',
  keyboardType: 'default'
}

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: true,
      authorizationError: false,
      loginValue: '',
      loginValid: true,
      passwordValue: '',
      passwordValid: true
    }
  }

  static navigationOptions = {
    header: null
  };

  showError() {
    this.setState({ authorizationError: true })
  }

  hideError() {
    this.setState({ authorizationError: false })
  }

  showPassword() {
    this.setState({ showPassword: !this.state.showPassword })
  }

  validLogin() {
    if (!this.state.loginValue) {
      this.setState({loginValid: false});
      return false;
    }
    return true;
  }

  validPassword() {
    if (!this.state.passwordValue) {
      this.setState({passwordValid: false});
      return false;
    }
    return true;
  }

  validateData() {
    let login = this.validLogin();
    let password = this.validPassword();
    return (login && password);
  }

  getUserData() {
    return {
      login: this.state.loginValue,
      password: this.state.passwordValue
    }
  }

  authorizedUser() {
    this.setState({ loginValue: '', passwordValue: '' })
    this.props.navigation.navigate('Weather');
  }

  submitLoginForm() {
    if (!this.validateData()) {
      return;
    }
    Keyboard.dismiss();
    this.hideError();
    let userData = this.getUserData();
    let result = this.props.screenProps.getAutorization(userData);
    result ? this.authorizedUser() : this.showError();
  }

  render() {
    return (
      <LinearGradient colors={['#0e0d1f', '#258aab']} style={styles.gradientContainer}>
          <StatusBar 
            barStyle={'light-content'}
          />
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logoImage}/>
            <Text style={styles.logoText} >WEATHER APP</Text>
          </View>
          {
            this.state.authorizationError ? 
            <Error text={authorizationErrorText} /> :
            null 
          }
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Icon 
                name={'ios-person'} 
                size={HEIGHT / 20} 
                color={this.state.loginValid ? 'rgba(255, 255, 255, 0.7)' : 'red'} 
                style={styles.inputIcon}
              />
              <TextInput 
                {...keyBoardOptions}
                style={styles.input}
                placeholder='Username'
                returnKeyType='next'
                onSubmitEditing={() => this.passwordInput.focus()}
                value={this.state.loginValue}
                onChangeText={loginValue => this.setState({loginValue, loginValid: true})}
                maxLength={100}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon 
                name={'ios-lock'} 
                size={HEIGHT / 20} 
                color={this.state.passwordValid ? 'rgba(255, 255, 255, 0.7)' : 'red'} 
                style={styles.inputIcon}
              />
              <TextInput 
                {...keyBoardOptions}
                style={styles.input}
                placeholder='Password'
                keyBoardType='default'
                secureTextEntry={this.state.showPassword}
                returnKeyType='go'
                onSubmitEditing={this.submitLoginForm.bind(this)}
                value={this.state.passwordValue}
                onChangeText={passwordValue => this.setState({passwordValue, passwordValid: true})}
                ref={input => this.passwordInput = input}
                maxLength={100}
              />
              <TouchableOpacity style={styles.btnEye}
                onPress={this.showPassword.bind(this)}
              >
                <Icon 
                  name={this.state.showPassword ? 'ios-eye' : 'ios-eye-off'} 
                  size={HEIGHT / 20} 
                  color={'rgba(255, 255, 255, 0.7)'} 
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={this.submitLoginForm.bind(this)}
            >
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex:1,
    width: null,
    height: null,
    padding: HEIGHT / 60
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },  
  logoImage: {
    width: HEIGHT / 5,
    height: HEIGHT / 5
  },
  logoText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    marginTop: HEIGHT / 120,
    opacity: 0.7
  },
  input: {
    height: HEIGHT / 15,
    fontSize: 16,
    paddingLeft: 45,
    fontWeight: '500',
    marginBottom: HEIGHT / 60,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)'
  },
  inputIcon: {
    position: 'absolute',
    top: HEIGHT / 120,
    left: 10
  },
  btnEye: {
    position: 'absolute',
    top: HEIGHT / 120,
    right: 10
  },
  btnLogin: {
    height: HEIGHT / 15,
    backgroundColor: 'rgba(33, 38, 50, 0.7)',
    justifyContent: 'center',
    marginBottom: HEIGHT / 60
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500'
  }
});
