import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { getBuilds, deleteBuild } from '../services/storage';
import { MaterialIcons } from '@expo/vector-icons';

const BuildListScreen = ({ route, navigation }) => {
  const [builds, setBuilds] = useState([]);
  const [filteredBuilds, setFilteredBuilds] = useState([]);
  const { jogoId } = route.params || {};

  useEffect(() =>  {
    const unsubscribe = navigation.addListener('focus', () => {
      loadBuilds();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (jogoId) {
      setFilteredBuilds(builds.filter(build => build.jogoId === jogoId));
    } else {
      setFilteredBuilds(builds);
    }
  }, [builds, jogoId]);

  const loadBuilds = async () => {
    try {
      const savedBuilds = await getBuilds();
      setBuilds(savedBuilds);
    } catch (e) {
      console.error('Erro ao carregar', e)
    }
  };

  const handleDelete = (id) => {
    Alert.alert('Confirmar exclusão',
    'Tem certeza que deseja excluir a build?',
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', onPress: () => confirmDelete(id) },
    ]);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteBuild(id);
      loadBuilds();
    } catch (e) {
      console.error('Erro ao apagar', e);
    }
  };

  const renderBuildItem = ({ item }) => (
    <TouchableOpacity
      style={styles.buildCard}
      onPress={() => navigation.navigate('BuildDetails', { buildId: item.id })}
    >
      <Image
        source={getGameImage(item.jogoId)}
        style={styles.buildImage}
      />
      <View style={styles.buildInfo}>
        <Text style={styles.buildName}>{item.name}</Text>
        <Text style={styles.buildGame}>{getGameName(item.jogoId)}</Text>
        <Text style={styles.buildDate}>Criada em {new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <MaterialIcons name="delete" size={24} color="#ff4444" />
      </TouchableOpacity>
    </TouchableOpacity>  
  );

  getGameName = (id) => {
    const games = {
      1: 'Dragon Age: Origins',
      2: 'Dragon Age II',
      3: 'Dragon Age: Inquisition'
    };
    return games[id] || 'Desconhecido';
  };

  getGameImage = (id) => {
    const images = {
      1: require('../assets/dao_icon.png'),
      2: require('../assets/da2_icon.png'),
      3: require('../assets/dai_icon.png')
    };
    return images[id] || require('../assets/default.png');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {route.params?.gameName || 'Minhas Builds'}
      </Text>

      {filteredBuilds.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma build salva</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('NewBuild', { jogoId })}
          >
            <Text style={styles.createButtonText}>Criar Nova Build</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList 
          data={filteredBuilds}
          renderItem={renderBuildItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NewBuild', { 
          jogoId: route.params?.jogoId 
        })}
      >
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f0f0f0',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 80,
  },
  buildCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 3,
  },
  buildImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  buildInfo: {
    flex: 1,
    padding: 15,
  },
  buildName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  buildGame: {
    fontSize: 14,
    color: '#bbbbbb',
    marginBottom: 5,
  },
  buildDate: {
    fontSize: 12,
    color: '#888888',
  },
  deleteButton: {
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#aaaaaa',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#4a6da7',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  createButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4a6da7',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default BuildListScreen;