import React, { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {Alert} from 'react-native';
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace';

export default function App() {
  const [view, setView] = useState('lista');
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparo, setPreparo] = useState('');
  const [edit, setEdit] = useState(null);

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
  // Função para ADICIONAR uma nova receita
    const handleAddRecipe = () => {
     if (!title) {
        return; 
      }
      const newRecipe = {
        id: Date.now().toString(), // Pega a data atual e transformar em string.
        title: title, // Pega a variável useState
        ingredients: ingredients, // Pega a variável useState
        preparo: preparo, // Pega variavel useState
      };
      setRecipes(currentRecipes => [...currentRecipes, newRecipe]);
      setTitle('');
      setIngredients('');
      setPreparo('');
  
      setView('lista');
    };
    const handleDeleteRecipe = (id) => {
      // Filtra a lista, mantendo apenas as receitas com ID diferente do que foi passado
      setRecipes(currentRecipes => currentRecipes.filter(recipe => recipe.id !== id));
    };
    const handleEditRecipe = (id) => {
      const recipeToEdit = recipes.find(recipe => recipe.id === id);
  if (!recipeToEdit) return;

  setTitle(recipeToEdit.title);
  setIngredients(recipeToEdit.ingredients);
  setPreparo(recipeToEdit.preparo);

  setView('formulario');

  setEditingId(id);
    };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Meu Livro de Receitas</Text>

        {view === 'lista' ? (
          <View>
             <TouchableOpacity style={styles.addButton} onPress={() => setView('formulario')}>
              <Text style={styles.buttonText}>Adicionar Nova Receita</Text>
            </TouchableOpacity>

            {recipes.length === 0 ? (
              <Text style={styles.emptyText}>Nenhuma receita cadastrada.</Text>
            ) : (
              recipes.map((item) => (
                <View key={item.id} style={styles.recipeItem}>
                  <View style={styles.recipeTextContainer}>
                    <Text style={styles.recipeTitle}>{item.title}</Text>
                    <Text style={styles.recipeIngredients}>{item.ingredients}</Text>
                    <Text style={styles.recipePreparo}>{item.preparo}</Text>
                  </View>

                {/* DELETAR */}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeletetRecipe(item.id)}>
                    <Text style={styles.buttonText}>Excluir</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                   style={styles.EditButton}
                    onPress={() => handleEditRecipe(item.id)}>
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>

                </View>
              ))
            )}
          </View>

        ) : (
          <View style={styles.formContainer}>
          <Text style={styles.formHeader}>Adicionar Receita</Text>
          
          <TextInput
              style={styles.input}
              placeholder="Título da Receita"
              value={title}
              onChangeText={setTitle}
            />
          <TextInput
            style={[styles.input, styles.textArea]} 
              placeholder="Ingredientes"  // Mostra o texto Ingredientes na tela
              value={ingredients} // é o valor do input
              onChangeText={setIngredients} 
              multiline={true}/>
             <View style={styles.formActions}>

          <TextInput style={[styles.input, styles.textArea]}
          placeholder="Modo de Preparo"
          value={preparo}
          onChangeText={setPreparo}
          multilne={true}/>
              
             <TouchableOpacity style={[styles.formButton, styles.cancelButton]} onPress={() => setView('lista')}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.formButton, styles.saveButton]} onPress={handleAddRecipe}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )};
      </ScrollView>
    </SafeAreaView>
  );

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#e67e22',
  },
  // Formulário
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  formHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: 10,
  },
  formButton: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 5,

  },
  cancelButton: {
    backgroundColor: '#95a5a6',
    flex: 1,
    marginRight: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  // Lista
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  recipeItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeTextContainer: {
    flex: 1,
    marginRight: 15,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recipeIngredients: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
  recipePreparo: {
    fontSize: 16,
    color: '#2c3e50',
    marginTop: 5,  
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  EditButton: {
    backgroundColor: '#ffa033ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
    color: '#95a5a6',
  },
});
