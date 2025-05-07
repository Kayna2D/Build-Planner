import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveBuild = async (build) => {
  try {
    const savedBuilds = await getBuilds();
    const newBuilds = [...savedBuilds, build];
    await AsyncStorage.setItem('@builds', JSON.stringify(newBuilds));
  } catch (e) {
    console.error('Erro ao salvar', e);
  }
};

export const getBuilds = async () => {
  try {
    const builds = await AsyncStorage.getItem('@builds');
    return builds ? JSON.parse(builds): [];
  } catch (e) {
    console.error('Erro ao carregar', e);
    return [];
  }
};

export const deleteBuild = async (id) => {
  try {
    const builds = await getBuilds();
    const updatedBuilds = builds.filter(build => build.id !== id);
    await AsyncStorage.setItem('@builds', JSON.stringify(updatedBuilds));
  } catch (e) {
    console.error('Erro ao apagar', e);
    throw e;
  }
};