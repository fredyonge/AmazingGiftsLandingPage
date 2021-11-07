import React, { FC, useState } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  SafeAreaView,
  ScrollView,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  GradientBackground,
  AutoImage as Image,
  SpacerVert,
  EdgeMargins,
  SpacerHor,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { txtWb } from "../../theme/typography"
import { s } from "../../theme/styles"
import { IMAGE } from "../../../assets/images/index"
import { TextInput } from "react-native-gesture-handler"
import { getAuth, signInAnonymously } from "firebase/auth"
import { getFirestore, setDoc, doc } from "firebase/firestore"

const bowserLogo = require("./bowser.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  fontFamily: "Garamond-Bold",
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
  width: 343,
  height: 230,
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const { width, height } = useWindowDimensions()
    // const nextScreen = () => navigation.navigate("demo")
    const [loading, setLoading] = useState("idle")
    const [email, setEmail] = useState("")

    const [log, setLog] = useState("")
    const onPress = async () => {
      setLoading("pending")
      try {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          const firestore = getFirestore()
          await setDoc(doc(firestore, "Nutzer", "protoypeEmailAdresses"), {
            email: email,
          })
          setEmail("")
          setLoading("finished")
        } else {
          signInAnonymously(auth)
            .then(async () => {
              const firestore = getFirestore()
              await setDoc(doc(firestore, "Nutzer", "protoypeEmailAdresses"), {
                email: email,
              })
              setEmail("")
              setLoading("finished")
              // Signed in..
            })
            .catch((error) => {
              const errorCode = error.code
              const errorMessage = error.message
              // ...
            })
        }
      } catch (e) {
        // setLog(e)
      }
    }

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={(s.justifyCenter, s.flex1)}>
          <Header text={"amazing.gifts"} />
          <View style={[s.rowDirection, s.flex1, { backgroundColor: color.background }]}>
            <EdgeMargins />
            <View style={s.flex1}>
              <View style={[s.rowDirection, s.flex1]}>
                <View style={[s.flex1, s.justifyCenter]}>
                  <SpacerVert size={24} />
                  <Text style={txtWb.bigClaim}>Großartige Geschenke</Text>
                  <Text style={txtWb.subClaimText}>Bei uns findest du für jeden was</Text>
                  <SpacerVert size={32} />
                  <Text style={[txtWb.body, s.flexWrap]}>
                    amazing.gifts betreibt keinen eigenen Shop. Wir sammeln die besten Geschenkideen
                    aus dem Internet. Hier findest du für jeden ein grossartiges Geschenk
                  </Text>
                  <SpacerVert size={16} />
                  <View
                    style={{
                      backgroundColor: color.palette.white,
                      flexDirection: "row",
                    }}
                  >
                    <TextInput
                      style={{ marginHorizontal: 16, alignSelf: "center", flex: 1 }}
                      placeholder={"Gib mir bescheid sobald ich Geschenke finden kann"}
                      onChangeText={(e) => setEmail(e)}
                      value={email}
                    />
                    <TouchableOpacity
                      style={{
                        marginLeft: "auto",
                        height: "100%",
                        backgroundColor: "green",
                        paddingVertical: 16,
                        paddingHorizontal: 16,
                      }}
                      onPress={onPress}
                    >
                      {loading === "pending" ? (
                        <ActivityIndicator size={"small"} color={color.palette.white} />
                      ) : (
                        <Text style={txtWb.button}>Benachrichtigen</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <SpacerVert size={32} />
                </View>
                {width > 800 ? (
                  <>
                    <SpacerHor size={24} />
                    <View style={{ flex: 1 }}>
                      <Image source={IMAGE.gift} style={{ width: "100%", height: "100%" }} />
                    </View>
                  </>
                ) : null}
              </View>
              <SpacerVert size={32} />
              <View style={{ borderWidth: 1, borderColor: color.palette.black }} />
              <SpacerVert size={32} />
              <Text style={txtWb.body}>Deine Geschenke auf amazing.gifts?</Text>
              <SpacerVert size={24} />
              <Text style={[txtWb.body, { color: color.palette.lighterGrey }]}>email:</Text>
              <SpacerVert size={16} />
              <Text style={txtWb.clickable}>partner@amazing.gifts</Text>
              <SpacerVert size={48} />
            </View>
            <EdgeMargins />
          </View>
        </View>
      </ScrollView>
    )
  },
)
