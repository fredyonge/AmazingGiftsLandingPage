import { Platform, StyleSheet } from "react-native"
import { color } from "./color"

/**
 * You can find a list of available fonts on both iOS and Android here:
 * https://github.com/react-native-training/react-native-fonts
 *
 * If you're interested in adding a custom font to your project,
 * check out the readme file in ./assets/fonts/ then come back here
 * and enter your new font name. Remember the Android font name
 * is probably different than iOS.
 * More on that here:
 * https://github.com/lendup/react-native-cross-platform-text
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
export const typography = {
  /**
   * The primary font.  Used in most places.
   */
  primary: Platform.select({ ios: "Helvetica", android: "normal" }),

  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: "Arial", android: "sans-serif" }),

  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: "Courier", android: "monospace" }),
}

export const txtWb = StyleSheet.create({
  bigClaim: {
    color: color.palette.black,
    fontFamily: "Montserrat-Bold",
    fontSize: 48,
  },
  body: {
    color: color.dim,
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
  },
  button: {
    color: color.palette.white,
    fontFamily: "Montserrat-Bold",
  },
  clickable: {
    color: color.palette.black,
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
  },
  header: {
    color: color.palette.black,
    fontFamily: "Garamond-Bold",
    fontSize: 36,
  },
  secondary: {
    fontFamily: "Montserrat-Regular",
    fontSize: 15,
    letterSpacing: 5,
  },
  subClaimText: {
    color: color.palette.black,
    fontFamily: "Montserrat-Medium",
    fontSize: 36,
  },
})
