import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherOptions = {
  Haze: {
    iconName: "day-haze",
    gradient: ["#363636", "#dbdbdb"],
    title: "Haze",
    subtitle: "흐린 날씨에요.",
    statusBar: "light-content",
  },
  Thunderstorm: {
    iconName: "thunderstorm-outline",
    gradient: ["#010B15", "#048BE5"],
    title: "Thunderstorm",
    subtitle: "천둥번개가 치고 있어요.",
    statusBar: "light-content",
  },
  Drizzle: {
    iconName: "cloud-drizzle",
    gradient: ["#E1E400", "#279FAF"],
    title: "Drizzle",
    subtitle: "이슬비가 내리고 있어요.",
    statusBar: "dark-content",
  },
  Rain: {
    iconName: "rainy-outline",
    gradient: ["#008AA8", "#003B8D"],
    title: "Rain",
    subtitle: "우산을 챙기세요.",
    statusBar: "light-content",
  },
  Snow: {
    iconName: "cloud-snow",
    gradient: ["#B5BDE2", "#41A4FF"],
    title: "Snow",
    subtitle: "눈사람을 만들어요.",
    statusBar: "light-content",
  },
  Clear: {
    iconName: "sun",
    gradient: ["#FF9C08", "#FFF3D4"],
    title: "Clear",
    subtitle: "맑은 날씨에요.",
    statusBar: "light-content",
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#8e9eab", "#eef2f3"],
    title: "Clouds",
    subtitle: "구름이 많아요.",
    statusBar: "light-content",
  },
  Mist: {
    iconName: "weather-fog",
    gradient: ["#5A585F", "#B8B8B8"],
    title: "Mist",
    subtitle: "안개가 껴있어요.",
    statusBar: "light-content",
  },
  Dust: {
    iconName: "face-mask-outline",
    gradient: ["#304352", "#d7d2cc"],
    title: "Dust",
    subtitle: "먼지가 많아요.",
    statusBar: "light-content",
  },
};

export default function Weather({ temp, condition }) {
  return (
    <LinearGradient
      style={styles.container}
      colors={[
        weatherOptions[condition].gradient[0],
        weatherOptions[condition].gradient[1],
      ]}
    >
      <StatusBar barStyle={weatherOptions[condition].statusBar} />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
          name={weatherOptions[condition].iconName}
          size={150}
          color="white"
        />
      </View>
      <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
        <Text style={styles.temp}>{temp}°</Text>
        <Text style={styles.title}>{weatherOptions[condition].title}</Text>
        <Text style={styles.subtitle}>
          {weatherOptions[condition].subtitle}
        </Text>
      </View>
    </LinearGradient>
  );
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Clear",
    "Clouds",
    "Haze",
    "Mist",
    "Dust",
  ]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  temp: {
    fontSize: 66,
    color: "white",
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 24,
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
});
