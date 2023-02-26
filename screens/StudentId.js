import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  
 } from 'react-native';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';
 import firebase from "firebase"
 import { RFValue } from 'react-native-responsive-fontsize';
 import { MaterialIcons } from '@expo/vector-icons';
 const screenheight = Dimensions.get("window").height;
 import { ScreenWidth, ScreenHeight } from 'react-native-elements/dist/helpers';
export default class StudentId extends Component {
  constructor(){
    super()
    this.state={
     sdetails:""
    }
  }
  handleSearch = async (name,classGrade) =>{
      let searchkey=name.toUpperCase()+classGrade;
      console.log(searchkey)

      let studentname;
      await firebase
            .database()
            .ref( "reports/"+searchkey)
            .on("value",(snapshot)=>{
              studentname=snapshot.val()
              this.setState({sdetails:studentname})          
            }
            )
  }
  logOut=()=>{
    firebase.auth().signOut().then(() => {
      alert('Logged out');
      this.props.navigation.navigate('Home')
    }).catch((error) => {
      alert(error.message)
    });
  }

  



  render() {
    return (

    <KeyboardAwareScrollView style={{flex:1}}>
      <ImageBackground
style={styles.container}
        source={require('../assets/bg4.jpg')}
        >
        <SafeAreaView style={styles.androidView} />

           <View style={{marginRight: 15,alignSelf:'flex-end'}}>
                 <AntDesign name="logout" size={24} color="white" onPress={()=>firebase.auth().signOut().then(() => {
       alert('Logged Out!!');
       this.props.navigation.navigate("Home")
      }).catch((error) => {
       
       alert("Oops something went wrong! Try again later.")
      })} /></View>
        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/logo2.png')}
            style={styles.iconImage}></Image>
          <Text style={styles.titletext}>𝙰𝚌𝚑𝚒𝚎𝚟𝚎𝚛𝚜</Text>


        </View>
        <Image
            source={require('../assets/student2.jpg')}
            style={styles.bookImage}></Image>
       <View style={{alignItems:'center' ,alignContent:'center',marginTop:10}}>
        
       <TextInput
            style={styles.input1}
            onChangeText={(name) => this.setState({ name })}
            placeholder={'Student Name'}
            placeholderTextColor={'white'}
            placeholderColor={'#FAAB78'}
          />
          <TextInput
            style={styles.input1}
            onChangeText={(classGrade) => this.setState({ classGrade})}
            placeholder={'Student Class'}
            placeholderTextColor={'white'}
            placeholderColor={'#FAAB78'}
          />

<TouchableOpacity
          style={styles.routeButton} 
          onPress={()=>this.props.navigation.navigate("Search",{name:this.state.name,
          classGrade:this.state.classGrade
          
          })}>
          <Text style={styles.routeText}>Submit</Text>
        </TouchableOpacity>
       </View>
        
       
      </ImageBackground>
      </KeyboardAwareScrollView>

    )
    }
  }

const styles = StyleSheet.create({
  container: {
   flex:1,
    height:ScreenHeight,
    alignContent:'center',
    //alignItems:'center',

   },
   bookImage: {
    width: 250,
    height: 260,
    marginRight: RFValue(50),
    marginTop: RFValue(50),
    marginLeft: RFValue(60),
    borderRadius:90
  },
   androidView: {
     marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
   },
   titletext: {
    textAlign: 'center',
    color: '#FAAB78',
    fontSize: 50,
    fontWeight: 'bold',
   
    marginLeft: 10,
  },

iconImage: {
    width: 80,
    height: 80,
   
   // marginLeft: RFValue(-325),
   // marginRight:RFValue(290),
    borderRadius:60
  },
  input1: {
    width:  "50%",
  alignSelf:'center',
  height:'18%',
    backgroundcolor: '#ECF9FF',
    color: 'white',
    borderWidth: RFValue(3),
    borderRadius: RFValue(25),
    borderColor: '#E6BA95',
    textAlign:"center",
    marginTop: RFValue(25),
     marginLeft:RFValue(1)
  },

  routeButton: {
    width: "50%",
    height: 50,
    backgroundColor:"white",
    alignSelf:"center",
    marginTop: RFValue(40),
    //borderRadius: RFValue(24),
    alignItems:"center",
    alignContent:"center",
    borderWidth: RFValue(3),
    borderRadius: RFValue(25),
    borderColor: '#E6BA95',
  },
  routeText: {
    //marginTop: 5,
    alignSelf:'center',
    //marginLeft: RFValue(30),
    fontSize:RFValue(23),
   
    color: '',

  },
});
