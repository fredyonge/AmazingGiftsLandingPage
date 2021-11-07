import * as React from "react"
import { useWindowDimensions, View } from "react-native"
import { observer } from "mobx-react-lite"
export interface EdgeMarginsProps {
  /**
   * An optional style override useful for padding & margin.
   */
}

/**
 * Describe your component here
 */
export const EdgeMargins = observer(function EdgeMargins(props: EdgeMarginsProps) {
  const { width, height } = useWindowDimensions()

  const minWidth = { minWidth: width > 800 ? 48 : 24 }

  return <View style={minWidth} />
})
