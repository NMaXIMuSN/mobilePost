# Вторая практическая задача по мобильной разработке
## Выполнил: Пешехонов Максим Алексеевич группы 211-322


### Описание приложение

Данное приложение реализует публикацию и просмотр постов, без предварительной регистрации.
Для реализации бек-части был использован сервис *mockapi.io*.
Была создана таблица постов с полями:
1. Name - имя пользователя написавшего пост
2. CreatedAt - создается автоматически и сохраняет время создания поста
3. Title - заголовок поста
4. Text - контент часть поста
5. Image - ссылка на изображения


### Использованные хуки
1. useState(): используется для создание state(хранение данных). Это позволяет react понимать, что данные были изменены и нужно произвесит ререндер компонента. 
```
  const [ isLoading, setIsLoading ] = useState(false)

  setIsLoading(false)
  setIsLoading(prev => !prev)
  setIsLoading(!isLoading)
```

2. useMemo(): используется для кеширования сложных вычисленийБ первым аргументом принимает функцию которая возвращает вычисленное значение, второй аргумент это зависимости, при которых производить пересчет. Пример ниже реализует сортировку постов, так же выданы две зависимости - это *posts* *sort*, которые могут измениться
```
  const sortedPosts = useMemo(() => {
    if (!sort) {
      return [...posts].sort((a, b) => b.id - a.id)
    }

    return posts
  }, [posts, sort])
```

3. useCallback(): используется чтобы закешировать функцию. Кеширование нужно, когда эту функцию мы передаем пропсом в дочерний компонент, это позволяет уменьшить ненужные ререндеры, при изменении ссылки у этой функции.
```
  const navigate = useCallback((id) => {
    navigation.navigate('Post', { id })
  }, [navigation])
```

4. useEffect(): Метод цикла жизни компонента, отвечающий за сайд эффекты. Принимает два аргумента, первый это функция которая будет выполнятся при монтировании компоненты в DOM если не передан массив зависимостей. Также это функция может возвращать другую функцию, которая, в свою очередь, будет отрабатывать при демонтировании компонента.
```
  // Позволяет накинуть фокус на ref элемент при монтировании компонента
  useEffect(() => {
    nameRef.current.focus()
  }, [])

  // Позволяет для хедера навигации обновлять опции при изменении navigate
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
    });
  }, [navigation]);
``` 

5. useContext(): хук который позволяет использовать созданный контекст. Можно описать как глобальный стор, к которому могут обращаться все дочерние компоненты.
```
  const PostContext = createContext()

  const PostProvider = ({ children }) => {
    const [ posts, setPosts ] = useState([]);
    const [ curPost, setCurPost ] = useState();

    const defaultProps = useMemo(
        () => ({
          posts,
          setPosts,
          curPost,
          setCurPost
        }),
        [posts, curPost],
    );

    return (
        <PostContext.Provider value={defaultProps}>
            {children}
        </PostContext.Provider>
    );
  };

  export default function App() {
    return (
        <PostProvider>
          ...
        </PostProvider>
    );
  }


  // пример использования
  const { posts, setPosts, curPost, setCurPost } = useContext(PostContext)
```

6. useRef(): позволяет связаться с данными или элементом, но без ре-рендеринга при его изменении. Возвращает объект с полем current в котором лежат данные.
```
  const nameRef = useRef()

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  <TextInput
    ref={nameRef}
    style={styles.input}
    value={state.name}
    placeholder="name"
    onChangeText={(name) => dispatch({
      ...state,
      name,
    })}
  />
```

7. useReducer(): это хук для работы с состоянием компонента. Он используется под капотом у хука useState
```
  // state - актуальные данные, action - новые данные которые были переданы в dispatch
  const reducer = (state, action) => {
    if (action) {
      return { ...action }
    }
  }

  const [state, dispatch] = useReducer(reducer, { name: '', title: '', text: '', image: '' });


  dispatch({
    // newData
  })
```

8. useImperativeHandle(): Позволяет компоненту предоставлять пользовательский API для родительского компонента, определяя, какие значения экземпляра компонента будут доступны наружу. В данном проекте не смог придумать где его можно было бы использовать.

9. useLayoutEffect(): это версия useEffect, которая срабатывает до того, как браузер перерисовывает экран. В данном проекте не смог придумать где его можно было бы использовать.
