import { useContext, useState } from "react";
import { PostContext } from "./PostContext";
import { axiosApi } from "../utils/api";
import { Alert } from "react-native";

export function usePost() {
  const { posts, setPosts, curPost, setCurPost } = useContext(PostContext)
  const [ isLoading, setIsLoading ] = useState(false)

  const fetchAllPosts = async () => {
    setIsLoading(true)
    try {
      const { data } = await axiosApi('/post')
      setPosts(data)
    } catch (err) {
      Alert.alert("Ошибка", 'Не удалось загрузить посты')
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }


  const fetchPostById = async (id) => {
    setIsLoading(true)

    try {
      const { data } = await axiosApi(`/post/${id}`)
      setCurPost(data)
    } catch (err) {
      Alert.alert("Ошибка", 'Не удалось загрузить пост')
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const deletePostById = async (id, navigate) => {
    setIsLoading(true)
    try {
      await axiosApi.delete(`/post/${id}`)
    } catch (err) {
      Alert.alert("Ошибка", 'Не удалось загрузить пост')
      console.log(err)
    } finally {
      navigate()
      await fetchAllPosts()
      setIsLoading(false)
    }
  }

  return {
    posts,
    curPost,
    isLoading,
    fetchAllPosts,
    fetchPostById,
    deletePostById
  }
}