import React, {Component} from 'react';
import { StyleSheet, View, SafeAreaView, Alert, Text, TouchableOpacity, ImageBackground, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CountDown from 'react-native-countdown-component';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
const GLOBAL = require('../../Global');
import SwipeablePanel from 'rn-swipeable-panel'
const FULL_HEIGHT = Dimensions.get('window').height;
const FULL_WIDTH = Dimensions.get('window').width;
const CONTAINER_HEIGHT = FULL_HEIGHT - 125;
var random_index, correctAnsArray = [], incorrectAnsArray = []
class HomeScreen extends Component {
    static navigationOptions={ header:null }
    constructor(props) {
        super(props);
        this.state = {hit_next : 0, swipeablePanelActive: false, responseJson: '', total_questions:0, questions:[], skipped : 0, attempt : 0, run_timer : false};
      }  
   
    scrollSwiper(action)
      {
          if(parseInt(this.state.skipped) + parseInt(this.state.attempt) >= parseInt(this.state.total_questions))
              {
                this.setState({run_timer : false})
                Alert.alert('Congratulations!', 'You have successfully completed your quiz.', [{ text: "Cancel", onPress: () => console.log('Cancel Pressed'), style: 'cancel' }, 
                { text: "Show Result", onPress: () => this.openPanel()}], 
                { cancelable: false })
                return;
              }
          if(action == '2')
              this.setState({skipped : parseInt(this.state.skipped) + 1})

          if(action == '1' && this.state.hit_next == '1')
              {
                  this.setState({attempt : parseInt(this.state.attempt) + 1})
              }
          else
              {
                  this.setState({hit_next : 0})
                  Alert.alert('Warning!', 'Please select atleast one option as answer and try again.')
                  return;
              }

              

          this.swiper.scrollBy(1)
      }
      openPanel = () => {
        this.setState({ swipeablePanelActive: true });
    };
    closePanel = () => {
        this.setState({ swipeablePanelActive: false });
    };
    goToScreem(screenName) { this.props.navigation.navigate(screenName) }
    componentDidMount()
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
    option_selected(index, selectedAns, quesNum, correctAns)
      {
        if(selectedAns == correctAns)
            correctAnsArray.push({'qNum': quesNum, 'correctAns' : correctAns, 'selectedAns' : selectedAns})
        else
            incorrectAnsArray.push({'qNum': quesNum, 'correctAns' : correctAns, 'selectedAns' : selectedAns})
        
            this.setState({hit_next : 1})
      }

    render() {
      const {navigate} = this.props.navigation;
      return (
       <View style={{flex : 1}}>
         <ImageBackground source={require('../assets/images/top-wave-header.png')} style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center',}}>
            <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', }}>
                <Text style={{ textAlign: 'center',  justifyContent: 'center', fontSize: wp('5.8%'), color : 'white', fontWeight : '600'}}> {(this.state.total_questions) ? this.state.questions[0].category : 'Quiz 001'} </Text>
            </View>
            {/* <View style={{justifyContent: 'center', alignItems: 'flex-start', position: 'absolute', top: 0, left: 0, paddingLeft:15, width: '100%', height: '100%', }}>
                <TouchableOpacity style={{flex: 1,justifyContent: 'center', alignItems: 'center'}} onPress={() => this.GoPrivacy()}>
                    <Image style={{width:wp('6%')}}  resizeMode="contain"  source={require('../assets/images/back-icon-grey.png')} />
                </TouchableOpacity>
            /</View> */}
        </ImageBackground>
            <View style={{flex : 1, flexDirection: 'row'}}>
                <View style={{justifyContent: 'center', width : wp('50%'), alignItems: 'center'}}>
                    <View style={{borderColor : '#f9f9f9', borderWidth : 2, borderRadius : 10, width : '80%', height : '70%'}}>
                        <CountDown running={this.state.run_timer} timeLabelStyle={{color : '#000', fontSize : wp('4%'), fontWeight : '500'}} until={60 * 10 + 30} size={20} onFinish={() => alert('Finished')} digitStyle={{backgroundColor: '#FFF', height : '90%'}} digitTxtStyle={{color: '#1CC625', backgroundColor: '#FFF', fontSize : wp('6%')}} timeToShow={['M', 'S']} timeLabels={{m: 'MM', s: 'SS'}}/>
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
                                      <TouchableOpacity  style={{justifyContent: 'center', alignItems: 'center', backgroundColor : '#2f8fff', borderColor : '#0b7cff',  borderWidth : 1, borderRadius : 6, width : '100%'}} disabled={(this.state.hit_next == '1') ? true : false} onPress={() => this.scrollSwiper('1')}>
                                          <Text style={{color: '#fff', fontSize:wp('5%'), padding : 12}}>NEXT</Text>
                                      </TouchableOpacity>
                                  </View>
                                  <View style={{width : '25%', alignItems: 'flex-end'}}>
                                      <TouchableOpacity  style={{justifyContent: 'center', alignItems: 'center', backgroundColor : '#fd9835', borderColor : '#ff7e00',  borderWidth : 1, borderRadius : 6}} onPress={() => this.scrollSwiper('2')}>
                                          <Text style={{color: '#fff', fontSize:wp('5%'), padding : 12}}>Skip</Text>
                                      </TouchableOpacity>
                                  </View>
                              </View>
                          </View>
                      </View>
                      );
                  })}
                </Swiper>
                 :  <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize : wp('5%'), textAlign : "center"}}>Please wait. We are preparing your test</Text></View> }
            </View>
            <SwipeablePanel fullWidth isActive={this.state.swipeablePanelActive} onClose={this.closePanel} onPressCloseButton={this.closePanel}>
              <View style={{flex : 1, backgroundColor :'white', margin: 3, height : CONTAINER_HEIGHT, borderRadius : 16}}>
                <View style={{flex : 1, justifyContent: 'flex-start', width : '100%', height : CONTAINER_HEIGHT, alignItems: 'center'}}>
                    <Text style={{color: '#000', fontSize:wp('5.8%'), padding : 12}}>Result</Text>
                    <Text style={{color: '#000', fontSize:wp('5%')}}>{(this.state.total_questions) ? this.state.questions[0].category : 'Quiz 001'}</Text>
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
                            <View style={{justifyContent: 'center', width : '70%', alignItems: 'center'}}>
                                <TouchableOpacity  style={{justifyContent: 'center', alignItems: 'center', backgroundColor : '#2f8fff', borderColor : '#0b7cff',  borderWidth : 1, borderRadius : 6, width : '100%'}} onPress={() => this.goToScreem('HomeScreen')}>
                                    <Text style={{color: '#fff', fontSize:wp('5%'), padding : 12}}>Take a new quiz</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width : '30%', alignItems: 'flex-end'}}>
                                <TouchableOpacity  style={{justifyContent: 'center', alignItems: 'center', backgroundColor : '#fd9835', borderColor : '#ff7e00',  borderWidth : 1, borderRadius : 6}} onPress={() => this.goToScreem('HomeScreen')}>
                                    <Text style={{color: '#fff', fontSize:wp('5%'), padding : 12}}>Restart</Text>
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
  const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  })
export default HomeScreen;