import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Share
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getBuilds } from '../services/storage';
import {
  ATTRIBUTES,
  JOGOS,
  CLASSES,
  SPECIALIZATIONS,
  SKILLS,
} from '../src/constants';

const BuildDetailScreen = ({ route, navigation }) => {
  const [build, setBuild] = useState(null);
  const { buildId } = route.params;

  useEffect(() => {
    const loadBuild = async () => {
      const builds = await getBuilds();
      const selectedBuild = builds.find(b => b.id === buildId);
      setBuild(selectedBuild);
    };

    loadBuild();
  }, [buildId]);

  const handleShare = async = () => {
    try {
      const message = `Confira minha build ${build.nome} para ${JOGOS.find(j => j.id === build.jogoId).nome}:\n\n` +
        `Classe: ${build.classe}\n` +
        `Especialização: ${build.specialization}\n` +
        `Atributos:\n${Object.entries(build.attributes)
          .map(([attr, value]) => `- ${ATTRIBUTES[attr]}: ${value}`)
          .join('\n')}\n\n` +
        `Habilidades: ${build.skills.join(', ')}`;

      Share.share({
        message,
        title: `Build ${build.nome}`,
      }).catch(error => {
        console.error('Erro ao compartilhar:', error);        
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  }; 

  if (!build) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
    
      <View style={styles.header}>
        <Text style={styles.title}>{build.nome}</Text>
        <Text style={styles.subtitle}>
          {JOGOS.find(j => j.id === build.jogoId).nome} • {build.classe}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Especialização</Text>
        <Text style={styles.sectionContent}>
          {build.specialization || 'Nenhuma selecionada'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Atributos</Text>
        <View style={styles.attributesContainer}>
          {Object.entries(build.attributes).map(([attr, value]) => (
            <View key={attr} style={styles.attributeRow}>
              <Text style={styles.attributeName}>{ATTRIBUTES[attr]}:</Text>
              <Text style={styles.attributeValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades ({build.skills.length}/5)</Text>
        <View style={styles.skillsContainer}>
          {build.skills.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <MaterialIcons name="share" size={24} color="white" />
          <Text style={styles.shareButtonText}>Compartilhar Build</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#bbbbbb',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f0f0f0',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#ffffff',
  },
  attributesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  attributeRow: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#333333',
    borderRadius: 5,
  },
  attributeName: {
    color: '#bbbbbb',
    fontSize: 14,
  },
  attributeValue: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#4a6da7',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: '#ffffff',
    fontSize: 14,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#6a1b9a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default BuildDetailScreen;