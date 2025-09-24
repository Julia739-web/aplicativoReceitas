import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaViewBase, ScrollView,
} from 'react-native';

export default function App(){
  const [view, setView] =  useState('lista');
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");

  return(
    <SafeAreaView>

    </SafeAreaView>
  );
}

useEffect(() => {
  const loadRecipes = async () => {
    try {
      // Tenta pegar o item salvo com a chave '@recipes'
      const storedRecipes = await AsyncStorage.getItem('@recipes');
      // Se encontrou algo, atualiza nosso estado 'recipes' com os dados salvos
      if (storedRecipes !== null) {
        setRecipes(JSON.parse(storedRecipes));
      }
    } catch (e) {
      console.error("Falha ao carregar receitas.", e);
    }
  };
  loadRecipes();
}, []); 

const handleAddRecipe = () => {

  // 1. Verifica se o título não está vazio
  
      if (!title) {
        return; 
      } 
      };
      const newRecipe = {
        id: Date.now().toString(), // Pega a data atual e transformar em string.
        title: title,   ingredients: ingredients, // Pega a variável useState
      };
      setRecipes(currentRecipes => [...currentRecipes, newRecipe]);
      setTitle('');
    setIngredients('');
    setView('lista');
  const handleDeleteRecipe = (id) => {
    setRecipes(currentRecipes => currentRecipes.filter(recipe => recipe.id !== id));
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Meu Livro de Receitas</Text>

{view === 'lista' ? (
  // SE a variável useState “view” tiver o valor de 'lista', MOSTRE ISTO:
  <View>

