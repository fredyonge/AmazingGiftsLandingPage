import * as React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"

export interface SpacerVertProps {
  /**
   * An optional style override useful for padding & margin.
   */
  size: 4 | 8 | 16 | 24 | 32 | 48
}

/**
 * Describe your component here
 */
export const SpacerVert = observer(function SpacerVert(props: SpacerVertProps) {
  const { size } = props
  let heightStyle
  switch (size) {
    case 4:
      heightStyle = { height: 8 }
      break
    case 8:
      heightStyle = { height: 8 }
      break
    case 16:
      heightStyle = { height: 16 }
      break
    case 24:
      heightStyle = { height: 24 }
      break
    case 32:
      heightStyle = { height: 32 }
      break
    case 48:
      heightStyle = { height: 48 }
      break
  }
  return <View style={heightStyle} />
})
