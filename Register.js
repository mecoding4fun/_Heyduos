import routes from "../constants/routes";
import React, { useState, useRef } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomTextInput from "../components/CustomTextInput";
import { IMAGE } from "../constants/image";
import defaultStyles from "../constants/defaultStyles";
import CustomView from "../components/CustomView";
import CustomButton from "../components/CustomButton";
import { signUp } from "../api/FirebaseApi";
import CustomRadioButton from "../components/CustomRadioButton";

const options = [
  {
    key: "male",
    text: "Male",
  },
  {
    key: "female",
    text: "Female",
  },
  {
    key: "other",
    text: "Other",
  },
];

export default function SignUpScreen({ route, navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [checked, setChecked] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { phoneNumber } = route.params;
  let gender = "";

  const onSelect = (item) => {
    if (checked && checked.key === item.key) {
      setChecked(null);
    } else {
      setChecked(item);
      gender = item.text;
    }
  };

  const onSignUpPress = () => {
    if (!firstName) {
      Alert.alert("Name is required");
    } else if (!age) {
      Alert.alert("Age field is required.");
    } else if (!checked) {
      Alert.alert("Gender field is required.");
    } else if (!email) {
      Alert.alert("Email field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
    } else if (!confirmPassword) {
      Alert.alert("Confirm password field is required.");
    } else if (password !== confirmPassword) {
      Alert.alert("Password does not match!");
    } else {
      signUp(email, password, phoneNumber, firstName, lastName, age, gender);
      navigation.navigate(routes.LOADING);
    }
  };

  // const onRegisterPress = () => {
  //   if (password !== confirmPassword) {
  //     alert("Passwords don't match.");
  //     return;
  //   }
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((response) => {
  //       const uid = response.user.uid;
  //       const user = {
  //         id: uid,
  //         email,
  //         fullName,
  //         age,
  //       };
  //       const usersRef = firebase.firestore().collection("users");
  //       usersRef
  //         .doc(uid)
  //         .set(user)
  //         .then(() => {
  //           navigation.navigate(routes.LOADING, { user });
  //         })
  //         .catch((error) => {
  //           alert(error);
  //         });
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <CustomView>
          <View style={defaultStyles.formContainer}>
            <Image style={defaultStyles.logo} source={IMAGE.LOGO} />
            <Text style={defaultStyles.title}>Create Account</Text>
            <CustomTextInput
              icon={IMAGE.NAME}
              placeholder="First Name"
              autoCompleteType="name"
              textContentType="name"
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
              maxLength={25}
            />
            <CustomTextInput
              icon={IMAGE.NAME}
              placeholder="Last Name"
              autoCompleteType="name"
              textContentType="name"
              onChangeText={(text) => setLastName(text)}
              value={lastName}
              maxLength={25}
            />
            <CustomTextInput
              icon={IMAGE.DOB}
              placeholder="Age"
              maxLength={2}
              keyboardType="numeric"
              onChangeText={(no) => setAge(no)}
              value={age}
            />
            <CustomRadioButton
              selectedOption={checked}
              onSelect={onSelect}
              options={options}
            />
            <CustomTextInput
              icon={IMAGE.EMAIL}
              placeholder="E-mail"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={(text) => setEmail(text)}
              value={email}
              maxLength={35}
            />
            <CustomTextInput
              icon={IMAGE.PASSWORD}
              secureTextEntry
              placeholder="Password"
              textContentType="newPassword"
              onChangeText={(text) => setPassword(text)}
              value={password}
              selectTextOnFocus={true}
              maxLength={25}
            />
            <CustomTextInput
              icon={IMAGE.PASSWORD}
              secureTextEntry
              placeholder="Confirm Password"
              textContentType="password"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              selectTextOnFocus={true}
              maxLength={25}
            />
            <CustomButton label="create account" onPress={onSignUpPress} />
            <Text>OR</Text>
            <View style={{ flex: 1, width: "100%" }}>
              <View style={defaultStyles.googleButton}>
                <TouchableOpacity onPress={() => {}}>
                  <Text
                    style={{
                      letterSpacing: 0.5,
                      fontSize: 16,
                      color: "#4285f4",
                    }}
                  >
                    Continue with Google
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={defaultStyles.fbButton}>
                <TouchableOpacity onPress={() => {}}>
                  <Text
                    style={{
                      letterSpacing: 0.5,
                      fontSize: 16,
                      color: "#FFFFFF",
                    }}
                  >
                    Continue with Facebook
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={defaultStyles.footerView}>
              <Text style={defaultStyles.footerText}>
                Already Got An Account?{" "}
                <Text
                  onPress={() => navigation.navigate(routes.LOGIN)}
                  style={defaultStyles.footerLink}
                >
                  Log In
                </Text>
              </Text>
            </View>
          </View>
        </CustomView>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
