import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
  Vibration,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
//import { accelerometer, SensorTypes, setUpdateIntervalForType } from 'react-native-sensors';
import { Picker } from '@react-native-community/picker';
import { saveBuild, getBuilds } from '../services/storage';
import {
  ATTRIBUTES,
  JOGOS,
  CLASSES,
  SPECIALIZATIONS,
  SKILLS,
} from '../src/constants';

const BuildEditorScreen = ({ route, navigation }) => {
  const [build, setBuild] = useState({
    id: route.params?.buildId || Math.random().toString(36).substring(7),
    nome: '',
    jogoId: route.params?.jogoId || 1,
    classe: 'Warrior',
    attributes: Object.keys(ATTRIBUTES).reduce(
      (acc, attr) => ({ ...acc, [attr]: 0 }),
      {}
    ),
    specialization: '',
    skills: [],
    favorita: false,
    createdAt: route.params?.buildId ? '' : new Date().toISOString(),
  });

  

  const handleSave = async () => {
    if (!build.nome) {
      alert('Por favor, dê um nome para a sua build.');
      return;
    }

    try {
      const savedBuilds = await getBuilds();
      const existingIndex = savedBuilds.findIndex((b) => b.id === build.id);

      let updatedBuilds;
      if (existingIndex >= 0) {
        updatedBuilds = [...savedBuilds];
        updatedBuilds[existingIndex] = build;
      } else {
        updatedBuilds = [...savedBuilds, build]; 
      }

      await saveBuild(updatedBuilds);
      navigation.goBack();
    } catch (e) {
      console.error('Erro ao salvar:', e);
      alert('Erro ao salvar a build.');
    }
  };

  const toggleSkill = (skill) => {
    setBuild((prev) => {
      const newSkills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: newSkills };
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>
          {route.params?.buildId ? 'Editar Build' : 'Nova Build'}
        </Text>

        <Text style={styles.label}>Nome da Build:</Text>
        <TextInput
          style={styles.input}
          value={build.nome}
          onChangeText={(text) => setBuild({ ...build, nome: text })}
          placeholder="Ex: Guerreiro Arcano"
        />

        {!route.params?.buildId && (
          <>
            <Text style={styles.label}>Jogo:</Text>
            <Picker
              selectedValue={build.jogoId}
              onValueChange={(itemValue) =>
                setBuild({ ...build, jogoId: itemValue })
              }
              style={styles.picker}>
              {JOGOS.map((jogo) => (
                <Picker.Item key={jogo.id} label={jogo.nome} value={jogo.id} />
              ))}
            </Picker>
          </>
        )}

        <Text style={styles.label}>Classe:</Text>
        <Picker
          selectedValue={build.classe}
          onValueChange={(itemValue) =>
            setBuild({ ...build, classe: itemValue })
          }
          style={styles.picker}>
          {CLASSES[build.jogoId].map((cls) => (
            <Picker.Item key={cls} label={cls} value={cls} />
          ))}
        </Picker>

        <Text style={styles.label}>Especialização:</Text>
        <Picker
          selectedValue={build.specialization}
          onValueChange={(itemValue) =>
            setBuild({ ...build, specialization: itemValue })
          }
          style={styles.picker}>
          {SPECIALIZATIONS[build.jogoId][build.classe].map((spec) => (
            <Picker.Item key={spec} label={spec} value={spec} />
          ))}
        </Picker>

        <Text style={styles.label}>Atributos</Text>
        <View style={styles.attributesContainer}>
          {Object.entries(build.attributes).map(([attr, value]) => (
            <View key={attr} style={styles.attributeRow}>
              <Text style={styles.attributeLabel}>
                {attr.charAt(0).toUpperCase() + attr.slice(1)}:
              </Text>
              <View style={styles.attributeControls}>
                <TouchableOpacity
                  onPress={() =>
                    setBuild((prev) => ({
                      ...prev,
                      attributes: {
                        ...prev.attributes,
                        [attr]: Math.max(0, prev.attributes[attr] - 1),
                      },
                    }))
                  }>
                  <MaterialIcons name="remove" size={24} color="#ff4444" />
                </TouchableOpacity>
                <Text style={styles.attributeValue}>{value}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setBuild((prev) => ({
                      ...prev,
                      attributes: {
                        ...prev.attributes,
                        [attr]: Math.min(40, prev.attributes[attr] + 1),
                      },
                    }))
                  }>
                  <MaterialIcons name="add" size={24} color="#4CAF50" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.label}>Habilidades:</Text>
        <View style={styles.skillsContainer}>
          {SKILLS[build.jogoId][build.classe].map((skill) => (
            <TouchableOpacity
              key={skill}
              style={[
                styles.skillButton,
                build.skills.includes(skill) && styles.selectedSkill,
              ]}
              onPress={() => toggleSkill(skill)}
              disabled={
                build.skills.length >= 5 && !build.skills.includes(skill)
              }>
              <Text style={styles.skillText}>{skill}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.favoriteContainer}>
          <Text style={styles.label}>Favorito:</Text>
          <Switch
            value={build.favorita}
            onValueChange={(value) => setBuild({ ...build, favorita: value })}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={build.favorita ? '#f5dd4b' : 'f4f3f4'}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Build</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f0f0f0',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#bbbbbb',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  picker: {
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
  },
  attributesContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  attributeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  attributeLabel: {
    color: '#ffffff',
    fontSize: 16,
    flex: 1,
  },
  attributeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    justifyContent: 'space-between',
  },
  attributeValue: {
    color: '#ffffff',
    fontSize: 16,
    width: 30,
    textAlign: 'center',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  skillButton: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    width: '45%',
    alignItems: 'center',
  },
  selectedSkill: {
    backgroundColor: '#4a6da7',
  },
  skillText: {
    color: '#ffffff',
  },
  favoriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4a6da7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BuildEditorScreen;
