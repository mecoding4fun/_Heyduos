import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import defaultStyles from "../constants/defaultStyles";
import { IMAGE } from "../constants/image";
import routes from "../constants/routes";

export default class WelcomeScreen extends React.Component {
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: defaultStyles.colors.pink,
        }}
      >
        <SafeAreaView style={styles.slide}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.text}>{item.text}</Text>
        </SafeAreaView>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <AppIntroSlider
          keyExtractor={(item) => item.text}
          renderItem={this._renderItem}
          onDone={() => this.props.navigation.navigate(routes.PHONE)}
          onSkip={() => this.props.navigation.navigate(routes.PHONE)}
          data={data}
          showSkipButton
        />
      </SafeAreaView>
    );
  }
}

const data = [
  {
    text: "Join & Invite Friends For Networking",
    image: IMAGE.SLIDE1,
  },
  {
    text: "Create & Participate In Activities",
    image: IMAGE.SLIDE2,
  },
  {
    text: "Meet Like-Minded People",
    image: IMAGE.SLIDE3,
  },
];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    marginVertical: 35,
  },
  image: {
    marginTop: 20,
    width: 245,
    height: 360,
  },
  title: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginVertical: 25,
  },
  text: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});
