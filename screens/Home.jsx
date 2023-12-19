import { useCallback, useEffect, useMemo } from "react"
import { View, ActivityIndicator, Text, FlatList } from "react-native"
import { usePost } from "../context/usePost"
import { PostComponent } from "../components/PostComponent"
import { RefreshControl } from "react-native"

export const Home = ({ navigation, route }) => {
  const { posts, fetchAllPosts, isLoading } = usePost()
  
  useEffect(() => {
    fetchAllPosts()
  }, [])

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
        data={posts}
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