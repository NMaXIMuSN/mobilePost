import { useEffect, useReducer, useRef, useState } from "react"
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native"
import { axiosApi } from "../utils/api"
import { usePost } from "../context/usePost"

const reducer = (state, action) => {
  if (action) {
    return { ...action }
  }
}


export const CreatePost = ({ navigation, route }) => {
  const [state, dispatch] = useReducer(reducer, { name: '', title: '', text: '', image: '' });
  const [isLoading, setIsLoading] = useState(false)

  const nameRef = useRef()

  const { fetchAllPosts } = usePost()

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  const handelSave = async () => {
    setIsLoading(true)

    try {
      if (!state.name || !state.title || !state.image || !state.text ) {
        throw Error()
      }

      const { data } = await axiosApi.post('/post', state)
      navigation.navigate('Post', { id: data.id })
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось создать пост')   
    } finally {
      fetchAllPosts()
      setIsLoading(false)
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Text>Name</Text>
        <TextInput ref={nameRef} style={styles.input} value={state.name} placeholder="name" onChangeText={(name) => dispatch({
          ...state,
          name,
        })}/>
      </View>
      <View>
        <Text>Title</Text>
        <TextInput style={styles.input} value={state.title} placeholder="title" onChangeText={(title) => dispatch({
          ...state,
          title,
        })}/>
      </View>
      <View>
        <Text>Image URL</Text>
        <TextInput style={styles.input} value={state.image} placeholder="Image URL" onChangeText={(image) => dispatch({
          ...state,
          image,
        })}/>
      </View>
      <View>
        <Text>Content</Text>
        <TextInput style={styles.input} multiline numberOfLines={5} value={state.text} placeholder="content" onChangeText={(text) => dispatch({
          ...state,
          text,
        })}/>
      </View>
      <Button title="Save" disabled={isLoading} onPress={handelSave}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    borderRadius: 16,
    marginBottom: 16,
    width: "100%",
    height: 250,
  },
  title: {
    fontSize: 24,
    fontWeight: '700'
  },
  content: {
    fontSize: 16, 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    alignItems: 'flex-start'
  },
})