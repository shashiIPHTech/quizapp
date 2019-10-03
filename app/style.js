import  {StyleSheet,Platform} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default StyleSheet.create({
    container: {
        flex: 1,
      },
    flex_container_1: {flex : 1, justifyContent: 'center', alignItems: 'center', backgroundColor : 'green'},
    flex_container_2: {flex : 1, justifyContent: 'center', alignItems: 'center', backgroundColor : 'red'},
    flex_container_3: {flex : 1, justifyContent: 'center', alignItems: 'center', backgroundColor : 'blue'},
      containerHalf: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
      },
      signupContent: {
        height: hp('80%'),
        marginTop:hp('5%'),
        justifyContent: 'flex-start',
        paddingLeft:wp('15%'),
        paddingRight:wp('15%'),
       
      },
      emailVerifiedSuccessContent: {
        height: hp('60%'),
        marginTop:hp('10%'),
        justifyContent: 'flex-start',
        alignItems: 'center',
         
      },
      settingContent:{
        height: hp('80%'),
        marginTop:hp('10%'),
        justifyContent: 'flex-start',
        paddingLeft:30,
        paddingRight:30,
        
      },
      menuItems:{
        borderBottomWidth: 1,
        borderColor:'#e8e8e8',
        paddingTop: hp('2%'),
        paddingBottom: hp('2%'),
      },
      menuItemsText:
      {
        fontSize : wp('4.8%'),
        color : '#777',
      },
      settingContainer:{
       
        borderBottomWidth: 1,
        borderColor:'#d7e3ef9c',
        paddingTop: hp('3%'),
        paddingBottom: hp('1%'),
     
      },
      personalizationContainer:{
       fontWeight : '700',
        borderColor:'rgb(190, 190, 190)',
        paddingTop: 16,
        paddingBottom: 16,
        borderWidth: 1.5,
        borderRadius:8,
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
        width : wp('85%'),
      },
      container1fourth: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },


      inputContainer: {
          borderRadius:30,
          borderBottomWidth: 1,
          width:250,
          height:45,
          marginBottom:20,
          flexDirection: 'row',
          alignItems:'center',
          borderColor:'black'
      },
      input:{
        width: '100%',
         marginBottom: 24,
         borderBottomWidth:1,
         borderColor:'#d6e5f8',
         paddingTop: 14,
         paddingBottom: 14,
        color: 'black',
        fontSize : hp('2.8%'),
        
    },
      inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
      },
      buttonContainer: {
        height:hp('7%'),
        minHeight : 55,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        width:wp('82%'),
        borderRadius:30,
        shadowColor: '#2f8fff',
       shadowOffset: { width: 0, height: 7 },
       shadowOpacity: .1,
       shadowRadius: 2,
      },

      default_btn_container: {
        height:hp('7%'),
        minHeight : 55,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        width:wp('82%'),
      },

      default_container: {
        width:wp('82%'),
      },



      homescreen_section_2:
      {
        justifyContent: 'flex-end',
        paddingBottom: 26,
        backgroundColor : 'yellow',
      },
      createAccountbtnContainer:{
         height:hp('7%'),
         minHeight : 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderColor:'#c8c8c8',
        borderWidth: 1,
        shadowColor: '#2f8fff',
       shadowOffset: { width: 0, height: 7 },
       marginTop:hp('5%'),
       shadowOpacity: .1,
       shadowRadius: 2,
      },
      loginButton: {
        backgroundColor: "white",
        borderWidth : 1,
        borderColor : 'rgb(151, 151, 151)',
      },
      loginText: {
        
         fontSize:wp('5%'),
         fontWeight:'600'
      },
      textBlack: {
        color: 'black',
      },
      textWhite: {
        color: 'white',
      },
      blackText: {
        color: 'black',
      },
      
      heading:{
        color: 'black',
        fontWeight: 'bold',
         fontSize:hp('3%')
      },
      msgText:{
        color: '#4a9dff',
        fontWeight: '400',
         fontSize:hp('3%')
      },
      lable:{
        marginTop:hp('2%'),
         color: 'black',
         fontWeight: '400',
         fontSize:hp('3%'),
         textAlign:'left'
      },
      signupButton:{
        backgroundColor: "#2f8fff",
      },
      tryakimboButton:{
        backgroundColor: "#4c4552",
      },
      signupHeaderBg:{
        width: 400,
        height:100,
        
      },
      headerImg:{
        height: hp('19%'),
        width: wp('100%'),
          
      },
      header:{
        height: hp('20%'),
        width: wp('100%'),
    
         borderBottomWidth:1,
        borderColor:'#d6e5f8'
      },
      backbtn:{
          width: 22,
      },
      pad30left:{
        paddingLeft:30
      },
      pad30right:{
        paddingRight:30
      },
      pad20left:{
        paddingLeft:20
      },
      pad20right:{
        paddingRight:20
      },
      pad10left:{
        paddingLeft:10
      },
      pad10right:{
        paddingRight:10
      },
      margin30left:{
        marginLeft:30
      },
      margin30right:{
        marginRight:30
      },
      marginTopBottom80:{
        marginBottom:hp('8%'),
        marginTop:hp('8%')
      },
      marginBottom5:{
        marginBottom:hp('10%'),
       },
      marginTopBottom40:{
        marginBottom:hp('5%'),
        marginTop:hp('5%')
      },

      hint:{
        color:'#adadad',
        fontSize:hp('2%')
      },


///////CSS after login
    
    floatRight:{
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    floatLeft:{
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
     alignItemsRight:{
       alignItems: 'flex-end'
    },
   alignItemsLeft:{
       alignItems: 'flex-start'
    },

    flexOne:{
      flex:1,
      flexDirection: 'row',
     },
      height15per:{
        height: hp('15%'),
        
      },
      height35per:{
        height: hp('35%'),
        paddingLeft:wp('15%'),
        paddingRight:wp('15%'),
      },

      height70per:{
        height: hp('70%'),
        paddingLeft:wp('15%'),
        paddingRight:wp('15%'),
      },
        height70perPadding30:{
        height: hp('70%'),
        paddingLeft:30,
        paddingRight:30,
      },
       height30per:{
        height: hp('30%'),
        paddingLeft:wp('15%'),
        paddingRight:wp('15%'),
      },
       height60per:{
        height: hp('60%'),
        paddingLeft:wp('15%'),
        paddingRight:wp('15%'),
      },

      bgBlue:{
        backgroundColor:'#5ea0e8'
      },
      userMenuIcon:{
        marginTop:44,
        marginLeft:15,
        marginRight:15,
        width:hp('4%'),
        height:hp('4%')
      },
      marginTop44:{
       //  marginTop:44,
      },
      userBottomIcon:{
         marginLeft:15,
        marginRight:15,
        width:hp('4%'),
        height:hp('4%'),
        marginTop:hp('4%'),
      },

      font20normal:{
        fontSize:hp('3%'),
        fontWeight:'400'
      },
      font15normal:{
        fontSize:wp('5.2%'),
        fontWeight:'400'
      },
      font10normal:{
        fontSize:hp('2.2%'),
        fontWeight:'400'
      },


  font10Bold:{
        fontSize:hp('2.3%'),
        fontWeight:'800'
      },
      font20Boldest:{
        fontSize:hp('4%'),
        fontWeight:'800'
      },
      font20Bold:{
        fontSize:hp('3%'),
        fontWeight:'600'
      },
      marginTop1per:{
        marginTop:hp('1%')
      },
      contentCenter:{
        justifyContent: 'center',
        alignItems: 'center',
      },
      startBtnContainer:{
        minHeight : 52,
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       width : wp('40%'),
       shadowColor: '#2f8fff',
      shadowOffset: { width: 0, height: 7 },
      marginTop:hp('2%'),
      shadowOpacity: .1,
      backgroundColor:'white',
      shadowRadius: 2,
      borderRadius : 4,
     },
       endBtnContainer:{
         height:hp('8%'),
         
       width: '90%',
       borderColor:'#c8c8c8',
       borderWidth: 1,
       shadowColor: '#2f8fff',
      shadowOffset: { width: 0, height: 7 },
      marginTop:hp('2%'),
      shadowOpacity: .1,
      backgroundColor:'white',
      shadowRadius: 2,
       justifyContent: 'center',
        alignItems: 'center',
        marginBottom:hp('4%')
      
      
     },
      checkinBtnContainer:{
         height:hp('8%'),
       width: '100%',
       borderColor:'#c8c8c8',
       borderWidth: 1,
       shadowColor: '#2f8fff',
      shadowOffset: { width: 0, height: 7 },
      marginTop:hp('2%'),
      shadowOpacity: .1,
      backgroundColor:'white',
      shadowRadius: 2,
       justifyContent: 'center',
        alignItems: 'center',
        marginBottom:hp('4%'),
        borderRadius:30
      
      
     },
     ListforwordIcon:{
     marginLeft:wp('77%'),
     marginTop:hp('-2%')
     },
     textAlignCenter:{
        textAlign:'center'
     },
     marginMinus15:{
       marginTop:hp('-3.5%')
     },
     
     marginLeft15:{
       marginLeft:wp('15%')
     },
     ListTickIcon:{
       marginBottom:hp('-2%')
     },
     bgWhite:{
      backgroundColor:'white',
      height:10
     },

      flexDirectionRow: {
        flexDirection: 'row',
      },
     width33per:{
      width:wp('33.33%'),
     },
     width15per:{
      width:wp('15%'),
     },
    width70per:{
      width:wp('65%'),
     },


     imgWidth120px:{
      width:120,
      height:120
     },
     imgWidth140px:{
      width:120,
      height:120
     },
 imgWidth80px:{
      width:80,
      height:80
     },
      imgWidth60px:{
      width:60,
      height:60
     },
      imgWidth50px:{
      width:50,
      height:50
     },
    overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.7,
    backgroundColor: 'black',
    width: wp('100%'),
  }  ,
textAreaContainer: {
      paddingLeft: 30 ,
      paddingRight: 30 
  },
  textArea: {
    height: hp('20%'),
    width:wp('80%'),
    justifyContent: "flex-start",
    borderColor: '#d7e3ef9c',
    borderWidth: 3,
         paddingLeft: 10 ,
      paddingRight: 10 ,
        paddingTop: 10 ,
 
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  personalizationContainer:{
    fontWeight : '700',
     borderColor:'rgb(190, 190, 190)',
     padding: 16,
     borderWidth: 1.5,
     borderRadius:8,
     marginTop: hp('1%'),
     marginBottom: hp('1%'),
     width : wp('85%'),
   },
  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 25,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  row: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,

    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },
      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },

  msg_text:{
    color: '#4a9dff',
    fontWeight: '700',
     fontSize:wp('5%'),
     textAlign:'center'
  },
})