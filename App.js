import { View } from 'react-native';
import { PostProvider } from './context/PostProvider';
import { Navigate } from './Navigate';


export default function App() {
  return (
      <PostProvider>
        <Navigate />
      </PostProvider>
  );
}