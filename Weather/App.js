import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get(`window`);

const API_KEY = `784ab24ff2ed5d94d4288abed9e25d13`;

export default function App() {
  const [city, setCity] = useState(`Loading...`);
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => 
          <View key={index} style={styles.day}>
            <Text style={styles.temp}>{day.temp.day}°</Text>
            <Text style={styles.description}>{styles.weather[0].main}</Text>
          </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `skyblue`,
  },
  city: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
  },
  cityName: {
    fontSize: 48,
    fontWeight: `500`,
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: `center`,
  },
  temp: {
    marginTop: 50,
    fontSize: 138,
  },
  description: {
    marginTop: -30,
    fontSize: 38,
  },
});
