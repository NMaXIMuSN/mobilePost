import { useCallback, useEffect, useMemo, useState } from "react"
import { View, ActivityIndicator, Text, FlatList } from "react-native"
import { usePost } from "../context/usePost"
import { PostComponent } from "../components/PostComponent"
import { RefreshControl } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';

export const Home = ({ navigation, route }) => {
  const { posts, fetchAllPosts, isLoading } = usePost()
  
  const [sort, setSort] = useState(false)

  useEffect(() => {
    fetchAllPosts()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: "row", gap: 10}}>
          <Ionicons
            name={!sort ? 'arrow-down-outline' : 'arrow-up-outline'}
            onPress={() => setSort(prev => !prev)}
            size={20}
          />
          <Ionicons
            name='pencil'
            onPress={() => navigation.navigate('CreatePost')}
            size={20}
          />
        </View>
      ),
    });
  }, [navigation, sort]);


  const sortedPosts = useMemo(() => {
    if (!sort) {
      return [...posts].sort((a, b) => b.id - a.id)
    }

    return posts
  }, [posts, sort])

  const navigate = useCallback((id) => {
    navigation.navigate('Post', { id })
  }, [navigation])


  const countPost = useMemo(() => {
    return posts.length
  }, [posts.length])

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"}/>
      </View>
    )
  }


  return (
    <View>
      <Text style={{padding: 10}}>Count post: {countPost}</Text>
      <FlatList
        data={sortedPosts}
        refreshing={isLoading}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchAllPosts}/>}
        renderItem={({item}) => (
          <PostComponent
            createdAt={item.createdAt} 
            title={item.title}
            key={item.id} 
            imageUri={item.image || ''}
            id={item.id}
            onPress={navigate}
          />
        )}
      />
    </View>
  )
}