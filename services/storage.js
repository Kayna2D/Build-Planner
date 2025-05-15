import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveBuild = async (builds) => {
  try {
    const buildsToSave = Array.isArray(builds) ? builds.flat(Infinity) : [builds];
    await AsyncStorage.setItem('@builds', JSON.stringify(buildsToSave));
  } catch (e) {
    console.error('Erro ao salvar', e);
    throw e;
  }
};

export const getBuilds = async () => {
  try {
    const builds = await AsyncStorage.getItem('@builds');
    const parsedBuilds = builds ? JSON.parse(builds) : [];
    return Array.isArray(parsedBuilds) ? parsedBuilds.flat(Infinity) : [];
  } catch (e) {
    console.error('Erro ao carregar', e);
    return [];
  }
};

export const deleteBuild = async (id) => {
  try { 
    const builds = await getBuilds();
    
    const updatedBuilds = builds.filter(build => {
      return build.id !== id;
    });
    
    await AsyncStorage.setItem('@builds', JSON.stringify(updatedBuilds));
    return updatedBuilds;
  } catch (e) {
    console.error('Falha ao deletar build:', e);
    throw e;
  }
};