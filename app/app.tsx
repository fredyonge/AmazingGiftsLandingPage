/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect } from "react"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts" // expo
import * as storage from "./utils/storage"
import { useBackButtonHandler, AppNavigator, canExit, useNavigationPersistence } from "./navigators"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import { ErrorBoundary } from "./screens/error/error-boundary"
import { Logs } from "expo"

/**
 * This is the root component of our app.
 */
import { Platform } from "react-native"

import { initializeApp } from "firebase/app"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

const firebaseConfig = {
  apiKey: "AIzaSyDnYjlo6qoXwhQH8FyMGe8qkLwnxQCJYN0",
  authDomain: "amazing-gifts-314f9.firebaseapp.com",
  projectId: "amazing-gifts-314f9",
  storageBucket: "amazing-gifts-314f9.appspot.com",
  messagingSenderId: "971722556677",
  appId: "1:971722556677:web:4b43f48a6afb0ce402a36c",
  measurementId: "G-6KXLC4CPX0",
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

const noGlow = `
 textarea, select, input, button {
   -webkit-appearance: none;
   outline: none!important;
 }
 textarea:focus, select:focus, input:focus, button:focus {
   -webkit-appearance: none;
   outline: none!important;
 }
 `

export const injectWebCss = () => {
  // Only on web
  if (!Platform.OS == "web") return

  // Inject style
  const style = document.createElement("style")
  style.textContent = `textarea, select, input, button { outline: none!important; }`
  return document.head.append(style)
}

// 👉 And this in the App.js file
injectWebCss()
function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  useBackButtonHandler(canExit)
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      await initFonts() // expo
      setupRootStore().then(setRootStore)
    })()
  }, [])

  // random try
  Logs.enableExpoCliLogging()
  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rootStore || !isNavigationStateRestored) return null

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ErrorBoundary catchErrors={"always"}>
          <AppNavigator
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </ErrorBoundary>
      </SafeAreaProvider>
    </RootStoreProvider>
  )
}

export default App
