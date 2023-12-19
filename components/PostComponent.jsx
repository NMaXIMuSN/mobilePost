import { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import dayjs from "dayjs";

export const PostComponent = ({ title, createdAt, imageUri, id, onPress }) => {
  
  const create = useMemo(() => {
    const date = dayjs(create).format('DD/MM/YYYY')
    return date
  }, [createdAt])

  return (
    <TouchableHighlight 
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      
      onPress={() => onPress(id)}
    >
      <View style={styles.container}>
        {imageUri && <Image style={styles.image} source={{
            uri: imageUri,
          }}/>}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{create}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: 1,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
    fontWeight: '700',
    paddingRight: 20,
  },
  date: {
    flex: 1,
    color: 'gray'
  },
});
