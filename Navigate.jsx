import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "./screens/Home"
import { Post } from "./screens/Post"
import { usePost } from "./context/usePost"
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreatePost } from "./screens/CreatePost"


const Stack = createNativeStackNavigator()

export const Navigate = ({ children }) => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={({ navigation, route }) => ({
          headerRight: () => {
            return <Ionicons
              name='pencil'
              onPress={() => navigation.navigate('CreatePost')}
              size={20}
            />
          },
        })}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{title: `Post`}}
          />
          <Stack.Screen
            name="CreatePost"
            component={CreatePost}
            options={{title: `CreatePost`}}
          />
        </Stack.Navigator>
    </NavigationContainer>
  )
}