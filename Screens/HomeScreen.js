import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const listaJogos = [
    {
      id: 1,
      nome: 'Mass Effect',
      imagem: require('../assets/me.jpg'),
      descricao: 'Monte seu Comandante Shepard'
    },
    {
      id: 2,
      nome: 'Dragon Age: Origins',
      imagem: require('../assets/dao.png'),
      descricao: 'Monte seu Grey Warden'
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Build Planner</Text>
      <Text style={styles.subheader}>Selecione um jogo:</Text>

      {listaJogos.map((jogo) => (
        <TouchableOpacity
          key={jogo.id}
          style={styles.gameCard}
          onPress={() => navigation.navigate('Builds', { jogoId: jogo.id })}
        >
        <Image source={jogo.imagem} style={styles.gameImage} />
        <View style={styles.gameInfo}>
          <Text style={styles.gameTitle}>{jogo.nome}</Text>
          <Text style={styles.gameDescription}>{jogo.descricao}</Text>
        </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.myBuildsButton}
        onPress={() => navigation.navigate('Builds')}
      >
      <Text style={styles.myBuildsText}>Minhas Builds</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f0f0f0',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    color: '#aaaaaa',
    marginBottom: 30,
    textAlign: 'center',
  },
  gameCard: {
    width: '100%',
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
  },
  gameImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  gameInfo: {
    padding: 15,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  gameDescription: {
    fontSize: 14,
    color: '#bbbbbb',
  },
  myBuildsButton: {
    width: '100%',
    backgroundColor: '#4a6da7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  myBuildsText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;