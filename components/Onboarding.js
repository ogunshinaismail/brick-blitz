import React, { useState } from 'react'
import { StyleSheet, Pressable, Text, View, SafeAreaView } from 'react-native'

const Onboarding = ({ setDificultyLevel }) => {
    
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.logoText}>Block Blitz</Text>
        
        <View style={styles.levelContainer}>
            <Text style={styles.subTitle}>Choose level</Text>

            <Pressable style={styles.btn} onPress={ () => setDificultyLevel(5)}>
                <Text style={styles.btnText}>Easy</Text>
            </Pressable>
            <Pressable style={styles.btn}  onPress={ () => setDificultyLevel(7)}>
                <Text style={styles.btnText}>Medium</Text>
            </Pressable>
            <Pressable style={styles.btn}  onPress={ () => setDificultyLevel(10)}>
                <Text style={styles.btnText}>Hard</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center'
    },
    logoText: {
        fontSize: 50,
        fontWeight: 'bold',
        paddingTop: 60,
        textAlign: 'center'
        // marginTop: 60,
    },
    levelContainer: {
        gap: 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
  // I might not be active for a while, i want to eat
    
    subTitle: {
        fontSize: 24,
        fontWeight: 'light',
        marginBottom: 20,
    },
    btn: {
        padding: 15,
        width: 200,
        backgroundColor: 'black',
        borderRadius: 5,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
  });
export default Onboarding