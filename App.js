import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';

import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {

    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);


     const configureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
      };
    const [loaded] = useFonts({
                    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
                    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
                    });
    if (!loaded) {
        return null;
    }
      const startGameHandler = selectedNumber => {
        setUserNumber(selectedNumber);
      };

      const gameOverHandler = numOfRounds => {
        setGuessRounds(numOfRounds);
      };

      let content = <StartGameScreen onStartGame={startGameHandler} />;

      if (userNumber && guessRounds <= 0) {
        content = (
          <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
        );
      } else if (guessRounds > 0) {
        content = (
          <GameOverScreen
            roundsNumber={guessRounds}
            userNumber={userNumber}
            onRestart={configureNewGameHandler}
          />
        );
      }
    return (
    <SafeAreaView style={styles.screen}>
          <Header title="Guess a Number" />
          {content}
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  screen: {
      flex: 1
  }
});
