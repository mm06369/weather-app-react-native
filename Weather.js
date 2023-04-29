import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal} from 'react-native';
import React, { useState, useEffect } from "react";
import { Input, Button, Card} from "react-native-elements";
import axios from "axios";

export default function Weather() {
  
  // All variables intialized to be used 
  const [city, setcity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [weatherData, setweatherData] = useState(null);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  
  //API Key from open weather
  const API_KEY = "edd691f4086082afe73c6e053bdf54aa";

 // Shows the history modal, when button is pressed
  const handlePress = () => {
    setModalVisible(true);
  };

  // Hides the modal that shows the history
  const handleHide = () => {
    setModalVisible(false);
  };

  // Clears the weather data shown on the screen.
  const handleClear = () =>{
    setweatherData(null);
    setError(null);
  }

  // Fetching the API, on the submit button click.
  const handleSubmit = () => {
    setIsLoading(true);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((response) => {
        setCities([...cities, city]);
        setweatherData(response.data);
        setcity("");
        setError(null);
        setIsLoading(false);
        Keyboard.dismiss();
      })
      .catch(() => {
        setIsLoading(false);
        setcity("");
        setError("Error getting the information, type in the city name correctly.");
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
    <View style={styles.container}>

      {/* Weather App Image */}
      <Image
        source={require('./assets/cloud_logo.png')}
        style={styles.image}
      />

      {/* Weather App Header */}
      <Text style = {styles.text}>Weather App</Text>
      
      {/* Sub Heading */}
      <Text style = {styles.subText}>Now get weather for any city!</Text>
      
      {/* Enter City Input Field */}
      <Input
          placeholder="Enter city: "
          value={city}
          onChangeText={setcity}
          inputStyle={styles.input}
          containerStyle={styles.inputBoxStyle}
        />

      {/* Enter Button */}
      <Button 
      title = 'Enter' 
      onPress={handleSubmit}
      disabled={isLoading || !city}
      loading={isLoading}
      buttonStyle = {styles.enterBtn} 
      titleStyle = {styles.titleSty} 
      />
      
      {/* History Button */}
      <TouchableOpacity onPress={handlePress} style={styles.enterBtn}>
        <Text style={styles.titleSty}>Show History</Text>
      </TouchableOpacity>
      
      {/* Modal Container showing history */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleHide}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleHide} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cities you searched</Text>
            {cities.map((item, index) => (
              <Text key = {index} styles = {styles.citiesList}> {item} </Text>
            ))}
          </View>
        </View>
      </Modal>

    {weatherData ? (
      <>
      {/* Black Line */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black', marginTop: 15}} />
      </View>

      {/* City Name */}
      <Text style = {styles.cityData}>City: {weatherData.name}</Text>
          
      {/*Card */}
      <Card styles = {styles.card}>
        <View style={styles.cardHeader}>
          
      {/* Temperature */}
        <View style={styles.tempInfo}>
          <Text style={styles.titleSty}>
            Temp:   {weatherData.main.temp.toFixed(1)}°C`  
          </Text>
          </View>
          
          {/* Pressure */}
          <View style={styles.tempInfo}>
          <Text style={styles.titleSty}>
          Pressure: 
          {weatherData.main.pressure} hPa
        </Text>
        </View>
  
          {/* Humidity */}
          <View style={styles.tempInfo}>
            <Text style={styles.titleSty}>Humidity: {weatherData.main.humidity}% </Text>
          </View>

          {/* Feels Like */}
            <View style={styles.tempInfo}>
            <Text style={styles.titleSty}>
              Feels Like:  {weatherData.main.feels_like.toFixed(1)}°C`
            </Text>
          </View>


          {/* Max Temp */}
          <View style={styles.tempInfo}>
            <Text style={styles.titleSty}>Max Temp: {weatherData.main.temp_max.toFixed(1)}°C</Text>
          </View>

          {/* Min Temp */}
          <View style={styles.tempInfo}>
            <Text style={styles.titleSty}>Min Temp:  {weatherData.main.temp_min.toFixed(1)}°C</Text>
          </View>
          
          </View>

          {/* Clear Button */}
          <Button 
            title = 'Clear' 
            buttonStyle = {styles.enterBtn} 
            titleStyle = {styles.titleSty} 
            onPress={handleClear}
          />

        </Card>
      </>
    ) : error && <Text style={styles.error}>{error}</Text>}
    
    </View>
    </ScrollView>
 
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    alignItems: 'center',
  },
  inputBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginRight:20,
    marginLeft: 20,
  },
  input: {
    fontSize: 18,
  },
  text:{
    fontSize: 25,
    fontWeight: 'condensed',
    marginTop: 15,
    marginBottom: 25,
    color: 'blue',
  },
  subText:{
    fontSize: 18,
    marginBottom: 20,
  },
  enterBtn:{
    backgroundColor: 'blue',
    width: 200,
    height: 50,
    marginTop: 10,
    justifyContent: 'center'
  },
  titleSty:{
    color: 'white',
  },
  cityData:{
    marginTop:10,
    fontSize: 22,
    color: 'darkblue',
    fontWeight: 'condensed',
  },
  tempInfo: {
    width: 350,
    backgroundColor: "darkblue",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    color: "#fff",
    marginBottom: 2
  },
  titleSty: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  cardHeader:{
    backgroundColor: 'lightblue',
  },
  card:{
    backgroundColor: 'darkblue',
    color: 'blue',
  },
  image:{
    width: 100,
    height: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    color: 'white',
    backgroundColor: 'blue',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  citiesList:{
    marginBottom: 2, 
    fontSize: 15,
    fontWeight: 'condensed',
  }

});
