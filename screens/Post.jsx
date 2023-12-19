import { useEffect } from "react"
import { View, ActivityIndicator, Text,  StyleSheet, Image, ScrollView } from "react-native"
import { usePost } from "../context/usePost"
import Ionicons from '@expo/vector-icons/Ionicons';

export const Post = ({ navigation, route }) => {
  const { curPost, fetchPostById, deletePostById, isLoading } = usePost()

  useEffect(() => {
    fetchPostById(route.params.id)
  }, [])

  useEffect(() => {
    navigation.setOptions({
      title: `Post by ${curPost?.name || ''}`,
      headerRight: () => (
        <View style={{flexDirection: "row", gap: 10}}>
          <Ionicons
            name='pencil'
            onPress={() => navigation.navigate('CreatePost')}
            size={20}
          />
          <Ionicons
            name='trash'
            onPress={() => deletePostById(route?.params?.id, () => navigation.navigate('Home'))}
            size={20}
          />
        </View>
      ),
    });
  }, [navigation, curPost]);



  if (!route?.params?.id) {
    navigation.navigate('Home')
  }

  if (isLoading || !curPost) {
    return (
      <View>
        <ActivityIndicator size={"large"}/>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {curPost.image && <Image resizeMode='cover' style={styles.image} source={{ uri: curPost.image || ''}}/>}
      <Text style={styles.title}>
        { curPost.title }
      </Text>
      <Text style={styles.content}>
        { curPost.text }
      </Text>
    </ScrollView>
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
    
  }
})