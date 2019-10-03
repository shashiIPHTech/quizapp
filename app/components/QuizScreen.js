import React, {Component} from 'react';
import { StyleSheet, View, Animated, Alert, Text, TouchableOpacity, ImageBackground, Easing, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RadioGroup, RadioButton} from './react-native-flexi-radio-button'
const GLOBAL = require('../../Global');
import SwipeablePanel from './rn-swipeable-panel'
import { Stopwatch, Timer } from './react-native-stopwatch-timer';

const FULL_HEIGHT = Dimensions.get('window').height;
const FULL_WIDTH = Dimensions.get('window').width;
const CONTAINER_HEIGHT = FULL_HEIGHT - 125;
var random_index, correctAnsArray = [], incorrectAnsArray = []
class QuizScreen extends Component {
    static navigationOptions={ header:null }
    constructor(props) {
        super(props);
        this.RotateValueHolder = new Animated.Value(0);
        this.state = {
            timerStart: false,
      stopwatchStart: false,
      totalDuration: 90000,
      timerReset: false,
      stopwatchReset: false,

       hit_next : 0, swipeablePanelActive: false, responseJson: '', total_questions:0, questions:[], skipped : 0, attempt : 0, run_timer : false};
      
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
        
    }  
    testFinished()
      {
        this.toggleStopwatch()
        Alert.alert('Sorry!', 'The time is up.', [{ text: "Cancel", onPress: () => console.log('Cancel Pressed'), style: 'cancel' }, 
        { text: "Show Result", onPress: () => this.openPanel()}], 
        { cancelable: false })
        return;
      }

    scrollSwiper(action)
      {
          if(parseInt(this.state.skipped) + parseInt(this.state.attempt) >= parseInt(this.state.total_questions))
              {
                this.toggleStopwatch()
                Alert.alert('Congratulations!', 'You have successfully completed your quiz.', [{ text: "Cancel", onPress: () => console.log('Cancel Pressed'), style: 'cancel' }, 
                { text: "Show Result", onPress: () => this.openPanel()}], 
                { cancelable: false })
                return;
              }
          if(action == '2')
              {
                this.setState({skipped : parseInt(this.state.skipped) + 1})
                this.swiper.scrollBy(1)
                return;
              }
          if(action == '1' && this.state.hit_next == '1')
              {
                if(this.state.selectedAns == this.state.correctAns)
                    correctAnsArray.push({'qNum': this.state.quesNum, 'correctAns' : this.state.correctAns, 'selectedAns' : this.state.selectedAns})
            
                if(this.state.selectedAns != this.state.correctAns)
                    incorrectAnsArray.push({'qNum': this.state.quesNum, 'correctAns' : this.state.correctAns, 'selectedAns' : this.state.selectedAns})

                  this.setState({attempt : parseInt(this.state.attempt) + 1})
                  this.swiper.scrollBy(1)
                  this.setState({hit_next : 0})
              }
          else
              {
                  this.setState({hit_next : 0})
                  Alert.alert('Warning!', 'Please select atleast one option as answer and try again.')
                  return;
              }

              

          
      }
      openPanel = () => {
        this.setState({ swipeablePanelActive: true });
    };
    closePanel = () => {
        this.setState({ swipeablePanelActive: false });
    };
  toggleTimer() {
    this.setState({timerStart: !this.state.timerStart, timerReset: false});
  }

  resetTimer() {
    this.setState({timerStart: false, timerReset: true});
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }
  
  getFormattedTime(time) {
      this.currentTime = time;
  };
  popToScreen(screenName) { this.props.navigation.pop() }

  StartImageRotateFunction()
      {
          this.RotateValueHolder.setValue(0)
          Animated.timing(this.RotateValueHolder,
            {
              toValue: 1,
              duration: 3000,
              easing: Easing.linear
            }
          ).start(() => this.StartImageRotateFunction())
      }

      
    goToScreem(screenName) { this.props.navigation.navigate(screenName) }
    async componentDidMount()
        {
            this.StartImageRotateFunction()
            correctAnsArray.length = 0
            incorrectAnsArray.length = 0

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
                 this.toggleStopwatch()
                  this.setState({questions:results,total_questions:results.length})
               })
              .catch((error) => {
                Alert.alert(error)
                console.log(error);
              });
        }
    option_selected(index, selectedAns, quesNum, correctAns)
        {
            this.setState({'qNum': quesNum, 'correctAns' : correctAns, 'selectedAns' : selectedAns})
            this.setState({hit_next : 1})
        }

    render() {
      const {navigate} = this.props.navigation;
      const RotateData = this.RotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
      return (
          
       <View style={{flex : 1}}>
         <ImageBackground source={require('../assets/images/top-wave-header.png')} style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center',}}>
            <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center',  justifyContent: 'center', fontSize: wp('5.8%'), color : 'white', fontWeight : '600'}}>{(this.state.total_questions) ? this.state.questions[0].category : 'Quiz 001'} </Text>
            </View>
        </ImageBackground>
            <View style={{flex : 1, flexDirection: 'row'}}>
                <View style={{justifyContent: 'center', width : wp('50%'), alignItems: 'center'}}>
                    <View style={{borderColor : '#f9f9f9', borderWidth : 2, borderRadius : 10, width : '80%', height : '70%'}}>
                        <Stopwatch style={{width : '100%'}} laps={false} msecs={false} start={this.state.stopwatchStart} reset={this.state.stopwatchReset} options={options} getTime={this.getFormattedTime} />
                    </View>
                </View>
                <View style={{justifyContent: 'center', width : wp('50%'), alignItems: 'center'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', borderColor : '#f9f9f9', borderWidth : 2, borderRadius : 10, width : '80%', height : '70%'}}>
                        <Text style={{fontSize : wp('4.2%')}}>Attempt : {this.state.attempt}</Text>
                        <Text style={{fontSize : wp('4.2%'), paddingTop : 5, paddingBottom : 5}}>Skipped : {this.state.skipped}</Text>
                        <Text style={{fontSize : wp('4.2%')}}># Que. : { (this.state.attempt + this.state.skipped)}/{this.state.total_questions}</Text>
                    </View>
                </View>
            </View>
            <View style={{flex : 5}}>
            {(this.state.total_questions) ?
                <Swiper showsButtons={false} scrollEnabled={false} loop={false} ref={(component) => { this.swiper = component; }}>
                  {this.state.questions.map((prop, key) => {
                    return (
                      <View style={{flex: 1}} key={key}>
                          <View style={{flex: 3, justifyContent: 'flex-start',alignItems: 'center'}}>
                              <View style={{width:wp('88%')}}>
                                  <Text style={{fontSize:wp('5.2%'), paddingTop : '10%'}}>Q.{key + 1} {prop.question}</Text>
                                  <RadioGroup style={{paddingTop : 30}} onSelect={(index, value) => this.option_selected(index, value, key, prop.correct_answer)} size={24} thickness={2} color='#f9f9f9' highlightColor='#f9f9f9' buttonStyle="outline">
                                      { prop.incorrect_answers.map((prop_in_ans, index) => {
                                        return(
                                            
                                          <RadioButton style={{borderColor : '#e8e8e8', borderRadius : 8, borderWidth : 1, marginBottom : 10}} value={prop_in_ans} onPress={() => { this.setState({ color: 'red' }); }}>
                                              <Text style={{fontSize:wp('4.8%'), fontWeight : '600', color : '#777'}}>{prop_in_ans}</Text>
                                          </RadioButton>
                                        )
                                      }) }
                                  </RadioGroup>
                              </View>
                          </View>
                          <View style={{flex: 1, width : wp('88%'), marginRight :'auto', marginLeft : 'auto', justifyContent: 'center', alignItems: 'center'}}>
                              <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                  <View style={{justifyContent: 'center', width : '75%', alignItems: 'center'}}>
                                      <TouchableOpacity  style={{justifyContent: 'center', alignItems: 'center', backgroundColor : '#2f8fff', borderColor : '#0b7cff',  borderWidth : 1, borderRadius : 6, width : '100%'}} onPress={() => this.scrollSwiper('1', key)}>
                                          <Text style={{color: '#fff', fontSize:wp('5%'), padding : 12}}>NEXT</Text>
                                      </TouchableOpacity>
                                  </View>
                                  <View style={{width : '25%', alignItems: 'flex-end'}}>
                                      <TouchableOpacity  style={{justifyContent: 'center', alignItems: 'center', backgroundColor : '#fd9835', borderColor : '#ff7e00',  borderWidth : 1, borderRadius : 6}} onPress={() => this.scrollSwiper('2', '')}>
                                          <Text style={{color: '#fff', fontSize:wp('5%'), padding : 12}}>Skip</Text>
                                      </TouchableOpacity>
                                  </View>
                              </View>
                          </View>
                      </View>
                      );
                  })}
                </Swiper>
                 :  <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize : wp('5%'), textAlign : "center"}}>Please wait. We are preparing your test</Text>
                        <Animated.Image 
  style={{transform: [{rotate: RotateData}], width:wp('25%'), height : wp('25%') / 2, marginTop: 30}} resizeMode="contain" 
  source={require('../assets/images/loading_arrow.png')} />
                    </View> }
            </View>
            <SwipeablePanel openLarge={true} fullWidth isActive={this.state.swipeablePanelActive} onClose={this.closePanel} onPressCloseButton={this.closePanel}>
              <View style={{flex : 1, backgroundColor :'white', margin: 3, height : CONTAINER_HEIGHT, borderRadius : 16}}>
                <View style={{flex : 1, justifyContent: 'flex-start', width : '100%', height : CONTAINER_HEIGHT, alignItems: 'center'}}>
                    <Text style={{color: '#000', fontSize:wp('5.8%'), padding : 12}}>Result</Text>
                    <Text style={{color: '#000', fontSize:wp('5%')}}>Score : {correctAnsArray.length} Out Of {this.state.total_questions}</Text>
                    <View style={{flex : 1, justifyContent: 'flex-start', marginTop : 20, padding : 10, alignItems: 'center', borderColor : '#f9f9f9', borderWidth : 2, borderRadius : 10, width : '96%'}}>
                        <View style={{flexDirection: 'row', paddingTop : 14}}>
                            <View style={{justifyContent: 'center', width : '50%', alignItems: 'flex-start'}}>
                                <Text style={{fontSize : wp('5%')}}># Questions</Text>
                            </View>
                            <View style={{justifyContent: 'center', width : '50%', alignItems: 'flex-end'}}>
                                <Text style={{fontSize : wp('5%')}}>{this.state.total_questions}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', paddingTop : 14}}>
                            <View style={{justifyContent: 'center', width : '50%', alignItems: 'flex-start'}}>
                                <Text style={{fontSize : wp('5%')}}>Attempt</Text>
                            </View>
                            <View style={{justifyContent: 'center', width : '50%', alignItems: 'flex-end'}}>
                                <Text style={{fontSize : wp('5%')}}>{this.state.attempt}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', paddingTop : 14}}>
                            <View style={{justifyContent: 'center', width : '50%', alignItems: 'flex-start'}}>
                                <Text style={{fontSize : wp('5%')}}>Skipped</Text>
                            </View>
                            <View style={{justifyContent: 'center', width : '50%', alignItems: 'flex-end'}}>
                                <Text style={{fontSize : wp('5%')}}>{this.state.skipped}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', paddingTop : 14}}>
                            <View style={{justifyContent: 'center', width : '50%', alignItems: 'flex-start'}}>
                                <Text style={{fontSize : wp('5%')}}>Right Answers</Text>
                            </View>
                            <View style={{justifyContent: 'center', width : '50%', alignItems: 'flex-end'}}>
                                <Text style={{fontSize : wp('5%')}}>{correctAnsArray.length}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', paddingTop : 14}}>
                            <View style={{justifyContent: 'center', width : '50%', alignItems: 'flex-start'}}>
                                <Text style={{fontSize : wp('5%')}}>Wrong Answers</Text>
                            </View>
                            <View style={{justifyContent: 'center', width : '50%', alignItems: 'flex-end'}}>
                                <Text style={{fontSize : wp('5%')}}>{incorrectAnsArray.length}</Text>
                            </View>
                        </View>
                    
                    
                        <View style={{flex : 1, justifyContent: 'flex-end', alignItems: 'flex-end',}}>
                        <View style={{paddingBottom : 26, flexDirection: 'row'}}>
                            <View style={{width : '100%', alignItems: 'center'}}>
                                <TouchableOpacity  style={{justifyContent: 'center', alignItems: 'center', backgroundColor : '#2f8fff', borderColor : '#0b7cff',  borderWidth : 1, borderRadius : 6}} onPress={() => this.popToScreen('Home')}>
                                    <Text style={{color: '#fff', fontSize:wp('5%'), padding : 12}}>Play Again</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
              
                    </View>
                
                  </View>
              </View>
				</SwipeablePanel>
         </View>
      );
    }
  }
  const options = {
    container: {
      backgroundColor: '#000',
      padding: 5,
      borderRadius: 5,
      width: 220,
    },
    text: {
      fontSize: 30,
      color: '#FFF',
      marginLeft: 7,
    }
  };
export default QuizScreen;