import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, PanResponder, TouchableOpacity, ImageBackground, Text } from 'react-native';
import GameOver from './GameOver'
// import Sound from 'react-native-sound';


const { width, height } = Dimensions.get('window');

const BRICK_WIDTH = 10;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 5;
const PADDLE_WIDTH = 80;
const PADDLE_HEIGHT = 10;
const BALL_RADIUS = 10;
const GAME_HEIGHT = height - 100;
const BALL_SPEED = 10

const BrickBreakerGame = ({ dificultyLevel }) => {
  const [ballPosition, setBallPosition] = useState({ x: width / 2, y: GAME_HEIGHT - 50 });
  const [ballDirection, setBallDirection] = useState({ x: dificultyLevel, y: -dificultyLevel });
  const [paddlePosition, setPaddlePosition] = useState(width / 2 - PADDLE_WIDTH / 2);
  const [bricks, setBricks] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Sound.setCategory("Playback");
  // const brickHitSound = useRef(new Sound('brick_hit.mp3', Sound.MAIN_BUNDLE, (error) => {
  //   if (error) {
  //     console.log("failed to load the song", error)
  //   }
  // }))

  useEffect(() => {
    // Initialize bricks
    const initialBricks = [];
    const rows = 4;
    const cols = Math.floor(width / (BRICK_WIDTH + BRICK_GAP)) - 1;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        initialBricks.push({
          x: j * (BRICK_WIDTH + BRICK_GAP),
          y: i * (BRICK_HEIGHT + BRICK_GAP) + 50,
          width: BRICK_WIDTH,
          height: BRICK_HEIGHT,
          isVisible: true,
        });
      }
    }
    setBricks(initialBricks);
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const newPaddlePosition = gestureState.moveX - PADDLE_WIDTH / 2;
        if (newPaddlePosition >= 0 && newPaddlePosition <= width - PADDLE_WIDTH) {
          setPaddlePosition(newPaddlePosition);
        }
      },
    })
  ).current;

  const gameLoop = () => {
    if (gameOver) return; // Stop game loop if game is over

    const { x, y } = ballPosition;
    const { x: dx, y: dy } = ballDirection;

    const nextX = x + dx;
    const nextY = y + dy;

    if (nextX >= width - BALL_RADIUS || nextX <= BALL_RADIUS) {
      setBallDirection({ ...ballDirection, x: -dx });
    }
    if (nextY <= BALL_RADIUS) {
      setBallDirection({ ...ballDirection, y: -dy });
    }
    if (nextY >= GAME_HEIGHT - BALL_RADIUS) {
      // Check if ball hits the paddle
      if (nextX >= paddlePosition && nextX <= paddlePosition + PADDLE_WIDTH) {
        setBallDirection({ ...ballDirection, y: -dy });
      } else {
        // Game over condition: Ball falls below the paddle
        setGameOver(true);
        return;
      }
    }

    const collidedBrickIndex = bricks.findIndex((brick) => {
      return (
        brick.isVisible &&
        nextX >= brick.x &&
        nextX <= brick.x + BRICK_WIDTH &&
        nextY >= brick.y &&
        nextY <= brick.y + BRICK_HEIGHT
      );
    });

    if (collidedBrickIndex !== -1) {
      const updatedBricks = [...bricks];
      updatedBricks[collidedBrickIndex].isVisible = false;
      setBricks(updatedBricks);
      setBallDirection({ ...ballDirection, y: -dy });
      setScore(score + 5)
      // brickHitSound.current.play();
    }

    setBallPosition({ x: nextX, y: nextY });
  };

  useEffect(() => {
    const gameInterval = setInterval(gameLoop, 16);
    return () => clearInterval(gameInterval);
  }, [ballPosition, gameOver]);

  // const image = {uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tynker.com%2Fcommunity%2Fprojects%2Fremixes%2F5ee61d932fcef42b0f786cb5%2F&psig=AOvVaw2kphbBj86dvgfNmhD2CZVz&ust=1715299003678000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJCV3o_C_oUDFQAAAAAdAAAAABAD'};


  // <ImageBackground source={image} resizeMode="cover" style={styles.image}>
  return (
    <View style={styles.container}>
        <Text style={styles.scoreText}>Score: {score}</Text>
          {bricks.map((brick, index) => (
            brick.isVisible && (
              <View
                key={index}
                style={[
                  styles.brick,
                  { left: brick.x, top: brick.y, width: brick.width, height: brick.height },
                ]}
              />
            )
          ))}

          {gameOver && <GameOver setBallDirection={setBallDirection} setBallPosition={setBallPosition} setBricks={setBricks} bricks={bricks} setGameOver={setGameOver} BALL_SPEED={dificultyLevel} setPaddlePosition={setPaddlePosition} setScore={setScore} score={score} />}

        <View style={[styles.paddle, { left: paddlePosition, top: GAME_HEIGHT }]} {...panResponder.panHandlers} />
        <View style={[styles.ball, { left: ballPosition.x - BALL_RADIUS, top: ballPosition.y - BALL_RADIUS }]} />
        </View>
      );
    };
    
    // </ImageBackground>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  brick: {
    position: 'absolute',
    backgroundColor: 'green',
    margin: 10,
  },
  paddle: {
    position: 'absolute',
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    backgroundColor: 'blue',
  },
  ball: {
    position: 'absolute',
    width: BALL_RADIUS * 2,
    height: BALL_RADIUS * 2,
    borderRadius: BALL_RADIUS,
    backgroundColor: 'red',
    
  },
  scoreText: {
    position: "absolute",
    fontSize: 24
  }
  
});

export default BrickBreakerGame;
