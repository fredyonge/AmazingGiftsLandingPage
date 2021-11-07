import * as React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"

export interface SpacerHorProps {
  /**
   * An optional style override useful for padding & margin.
   */
  size: 4 | 8 | 16 | 24 | 32 | 48
}

/**
 * Describe your component here
 */
export const SpacerHor = observer(function SpacerHor(props: SpacerHorProps) {
  const { size } = props
  let widthStyle
  switch (size) {
    case 4:
      widthStyle = { height: 8 }
      break
    case 8:
      widthStyle = { height: 8 }
      break
    case 16:
      widthStyle = { height: 16 }
      break
    case 24:
      widthStyle = { height: 24 }
      break
    case 32:
      widthStyle = { height: 32 }
      break
    case 48:
      widthStyle = { height: 48 }
      break
  }
  return <View style={widthStyle} />
})
