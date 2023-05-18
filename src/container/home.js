import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import {FIRESTORE_DB} from '../../Config';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [todo, setToDo] = useState('');
  const [showModal, setshowModal] = useState(false);
  const [editTodo, seteditTodo] = useState('');
  const [selectedData, setselectedData] = useState({});

  useEffect(() => {
    const toDoData = collection(FIRESTORE_DB, 'todos');
    const subsc = onSnapshot(toDoData, {
      next: val => {
        const todos = [];
        val.docs.forEach(doc =>
          todos.push({
            id: doc.id,
            ...doc.data(),
          }),
        );
        setData(todos);
      },
    });

    return () => subsc();
  }, []);

  const handleAddToDo = async () => {
    const val = await addDoc(collection(FIRESTORE_DB, 'todos'), {
      title: todo,
      done: false,
    });
    setToDo('');
  };

  const handelEdit = () => {
    const dbRef = doc(FIRESTORE_DB, `todos/${selectedData}`);
    updateDoc(dbRef, {title: editTodo});
    seteditTodo('');
    setshowModal(false);
  };

  const _renderItem = ({item, index}) => {
    const dbRef = doc(FIRESTORE_DB, `todos/${item.id}`);
    const handleDone = () => {
      updateDoc(dbRef, {done: !item.done});
    };

    const handleRemove = () => {
      deleteDoc(dbRef);
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          paddingVertical: 10,
          marginBottom: 5,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              item?.done
                ? require('../assets/images/fRadio.png')
                : require('../assets/images/bRadio.png')
            }
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />

          <TouchableOpacity
            onPress={() => {
              setshowModal(true);
              seteditTodo(item?.title);
              setselectedData(item?.id);
            }}
            activeOpacity={0.7}>
            <Text
              style={{
                fontSize: 18,
                paddingHorizontal: 20,
                textDecorationLine: item?.done ? 'line-through' : 'none',
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleRemove} activeOpacity={0.7}>
            <Image
              source={require('../assets/images/delete.png')}
              style={{width: 20, height: 20, marginRight: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDone} activeOpacity={0.7}>
            <Image
              source={require('../assets/images/checked.png')}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableView}>
        <TextInput
          style={styles.input}
          placeholder="add new item"
          onChangeText={val => setToDo(val)}
          value={todo}
        />

        <Button title="add to do " onPress={handleAddToDo} />
      </View>
      {data.length > 0 && (
        <View>
          <FlatList data={data} renderItem={_renderItem} />
        </View>
      )}

      <Modal visible={showModal} animationType={'slide'} transparent={true}>
        <View style={styles.modal}>
          <View style={styles.mainBoxView}>
            <TextInput
              style={[
                styles.input,
                {
                  width: '80%',
                  alignSelf: 'center',
                  marginRight: 0,
                  marginBottom: 20,
                },
              ]}
              placeholder={editTodo}
              onChangeText={val => seteditTodo(val)}
              value={editTodo}
            />
            <Button title="Done" onPress={handelEdit} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  tableView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 20,
  },
  modal: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.3)',
  },
  mainBoxView: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#c8c8c8',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    // marginTop: 160,
  },
});
