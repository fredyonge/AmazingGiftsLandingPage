import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../text/text"
import { s } from "../../theme/styles"
import { EdgeMargins, SpacerVert } from ".."
import { color } from "../../theme"
import { txtWb } from "../../theme/typography"

export interface HeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  text: string
}

/**
 * Describe your component here
 */
export const Header = observer(function Header(props: HeaderProps) {
  const { style, text = "" } = props

  return (
    <View style={[s.rowDirection, { backgroundColor: color.palette.white }]}>
      <EdgeMargins />
      <View>
        <SpacerVert size={16} />
        <Text style={txtWb.header}>{text}</Text>
        <SpacerVert size={16} />
      </View>
      <EdgeMargins />
    </View>
  )
})
