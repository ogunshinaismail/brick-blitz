import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Pressable,  Dimensions, PanResponder } from 'react-native';
import BrickBreakerGame from './GameInterface'
const { width, height } = Dimensions.get('window');

const BRICK_WIDTH = 10;
const BRICK_HEIGHT = 20;
const PADDLE_WIDTH = 80;
const PADDLE_HEIGHT = 10;
const BALL_RADIUS = 10;
const GAME_HEIGHT = height - 100;

const GameOver = ({setGameOver, setBallPosition, setPaddlePosition, setBallDirection, setBricks, bricks, BALL_SPEED, setScore, score}) => {
  const handleRestartGame = () => {
    setBallPosition({ x: width / 2, y: GAME_HEIGHT - 50 });
    setBallDirection({ x: BALL_SPEED, y: -BALL_SPEED });
    setPaddlePosition(width / 2 - PADDLE_WIDTH / 2);
    setBricks(bricks.map((brick) => ({ ...brick, isVisible: true })));
    setGameOver(false);
    setScore(0);
    
  };
  return (
    <View style={styles.gameOverContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <TouchableOpacity style={styles.restartButton} onPress={handleRestartGame}>
            <Text style={styles.restartButtonText}>Restart Game</Text>
          </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
  gameOverContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: width,
    height: height,
  },
  gameOverText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  restartButton: {
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  restartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
});

export default GameOver;