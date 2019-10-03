import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ImageBackground, SafeAreaView, Alert, Dimensions, BackHandler, AsyncStorage} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const GLOBAL = require('../../Global');
import styles from '../style';

class HomeScreen extends Component{ 
    static navigationOptions={  header:null }   
    constructor(props) {
        super(props);
        this.state = {  startBtnAction : '', loading: false  };
      }  
 
    hide_loader() {  this.setState({  loading: false,  }); }
    
    async componentDidMount()
        {
               fetch(GLOBAL.QuizUrl + '?amount=10&category=18', {
                  method: 'GET',
                  headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data' 
                  }
               })
              .then((response) => response.json())
               .then((responseJson) => {
                 var results = responseJson.results;
                 results.map((prop, key) => {
                    random_index = (Math.floor(Math.random() * (+prop.incorrect_answers.length - +0)) + +0),
                    prop.incorrect_answers.splice(random_index, 0, prop.correct_answer)
                 })
                  this.setState({questions:results,total_questions:results.length, run_timer : true})
               })
              .catch((error) => {
                Alert.alert(error)
                console.log(error);
              });
        }
    GoToScreen(screenName) { this.props.navigation.navigate(screenName) }
 render(){
     return(
      <View style={{flex: 1,}}>
          <ImageBackground source={require('../assets/images/blue-gradient-background.png')} style={{flex: 1,}}>
              <View style={{justifyContent: 'flex-end', flex: 1}}>
                  <View style={{width:wp('90%'), justifyContent: 'flex-end', padding : 20, }}>
                      <Text style={{color: 'white', fontSize:wp('6.5%'), paddingTop : 0, fontWeight : "600"}}>Quiz</Text>
                      <Text style={{color: 'white', fontSize:wp('8.2%'), paddingTop : 0, paddingBottom : 10, fontWeight : "600"}}>{(this.state.total_questions) ? this.state.questions[0].category : 'Quiz 001'} </Text>
                      <Text style={{color: 'white', fontSize:wp('5%'), paddingBottom : 2, fontWeight : "600"}}># Questions : {this.state.total_questions}</Text>
                      <TouchableOpacity style={[styles.startBtnContainer]} onPress={() => this.GoToScreen('Quiz')}>
                          <Text style={{color: '#000', fontSize:20,}}>Start Quiz</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </ImageBackground>
          <View style={{flex : 1.5}}>
              <View style={{flex: 8.5,  justifyContent: 'flex-start', alignItems: 'flex-start', padding :20}}>
                  <Text style={[styles.font15normal,styles.marginTop1per, {fontSize : wp('5.5%')}]}>Instructions : </Text>
                  <Text style={[styles.font15normal,styles.marginTop1per, {fontSize : wp('4.6%'), paddingTop : 20}]}>1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
                  <Text style={[styles.font15normal,styles.marginTop1per, {fontSize : wp('4.6%')}]}>2. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
                  <Text style={[styles.font15normal,styles.marginTop1per, {fontSize : wp('4.6%')}]}>3. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
              </View>
          </View>
            
        </View>
     )
  }
}
export default HomeScreen