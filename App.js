import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, SafeAreaView, StatusBar, TextInput, TouchableNativeFeedback, Alert } from 'react-native';
import { NavigationContainer, Link } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { todos, EVENTS } from './store/todos/todos';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const Stack = createStackNavigator();

const TodoInsertFormConnector = connect((state, props) => props, dispatch => ({
  submit: (text) => dispatch({
    type: EVENTS.ADD,
    text
  })
}));
const ConnectedTodoInsertForm = TodoInsertFormConnector(TodoInsertForm);

const TodoListConnector = connect((state, props) => ({...props, list: state}), dispatch => ({
  deleteTodoItem: (itemId) => dispatch({
    type: EVENTS.REMOVE,
    id: itemId
  }),
}));
const ConnectedTodoList = TodoListConnector(TodoList);

export default function App() {
  console.log('rendered', new Date);
  const store = createStore(todos);
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TodoList">
          <Stack.Screen name="TodoList" component={ConnectedTodoList} />
          <Stack.Screen name="TodoInsertForm" component={ConnectedTodoInsertForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function TodoList(props) {
  function modifyItem(todoId) {
    console.log({ todoId });
  }
  function deleteItem(todoId) {
    Alert.alert('Are you sure?', 'Deletion is permanent', [{
      text: 'YES',
      onPress: () => {
        props.deleteTodoItem(todoId);
      }
    }, {
      text: 'NO',
      onPress: () => {}
    }]);
  }
  return <View style={{height: 800, width: '100%', backgroundColor: 'yellow', alignContent: 'center'}}>
    <View style={{backgroundColor: 'rgba(0, 0, 0, .5)', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Link to="/TodoInsertForm" style={{width: '8%', backgroundColor: 'red', padding: 5, margin: 3, textAlign: 'center'}}>
        <FontAwesomeIcon icon={ faPlus } color="white" />
      </Link>
      <Text style={{alignContent: 'center', color: 'white', textAlign: 'center', textAlignVertical: 'center', fontSize: 20}}>Todo list</Text>
      <View style={{width: '8%', margin: 3}}></View>
    </View>
    {props.list.length ?
      <ScrollView style={{height: 80}}>
        {props.list.map((todoItem, todoId) => <TodoItem key={todoId} item={todoItem} modify={() => modifyItem(todoId)} delete={() => deleteItem(todoId)} />)}
      </ScrollView>:
      <View style={{paddingVertical: 30, alignItems: 'center'}}>
        <Link to="/TodoInsertForm" style={{textAlign: 'center', backgroundColor: 'cyan', width: '50%', padding: 5, borderRadius: 10}}>Add your first item to do</Link>  
      </View>
    }
  </View>;
}

function TodoItem(props) {
  return <View style={{borderColor: 'red', borderRadius: 3, margin: 10, borderWidth: 2, flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableNativeFeedback onPress={props.modify}>
        <Text style={{borderRightColor: 'red', borderRightWidth: 1, padding: 8}}>
          <FontAwesomeIcon icon={ faEdit } />
        </Text>
      </TouchableNativeFeedback>
      <Text>{props.item.label}</Text>  
      <TouchableNativeFeedback onPress={props.delete}>
        <View style={{borderLeftColor: 'red', borderLeftWidth: 1, padding: 8}}>
          <FontAwesomeIcon icon={ faTrash } />
        </View>
      </TouchableNativeFeedback>
  </View>;
}

function TodoInsertForm(props) {
  const [todoLabel, setTodoLabel] = useState('');
  function onSubmitBtn() {
    if (!todoLabel) {
      return;
    }
    props.submit(todoLabel);
    
    props.navigation.navigate('TodoList');
  }
  
  return <View style={{height: 800, width: '100%', backgroundColor: 'darkcyan'}}>
    <Text style={{textAlign: 'center', color: 'white', marginBottom: 20, fontSize: 35}}>Insert your new todo</Text>
    <CustomTextInput value={todoLabel} setValue={setTodoLabel} shouldFocus={true} onSubmit={onSubmitBtn} />
    <View style={{justifyContent: 'space-evenly', flexDirection: 'row', alignContent: 'center'}}>
      <TouchableNativeFeedback style={buttonStyle.button} onPress={onSubmitBtn} disabled={!todoLabel}>
        <Text style={{...buttonStyle.button, backgroundColor: todoLabel ? 'green' : 'lightgreen'}}>
          <FontAwesomeIcon icon={faCheck} color="white" />
        </Text>
      </TouchableNativeFeedback>
      <Link to="/TodoList" style={{...buttonStyle.button, backgroundColor: 'red'}}>
        <FontAwesomeIcon icon={faTimes} color="white" />
      </Link>
    </View>
  </View>;
}

function CustomTextInput(props) {
  const textInput = useRef();
  useEffect(() => {
    if (props.shouldFocus) {
      textInput.current.focus();
    }
  });

  function forwardSubmit() {
    props.onSubmit && props.onSubmit();
  }
  return <View style={{backgroundColor: 'white', paddingHorizontal: 5, marginHorizontal: 10}} {...props}>
    <TextInput value={props.value} onChangeText={props.setValue} ref={textInput} onSubmitEditing={forwardSubmit} />
  </View>;
}


const buttonStyle = StyleSheet.create({
    button: {
      backgroundColor: 'pink',
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginVertical: 10,
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderRadius: 3
    }
});


const styles = StyleSheet.create({
});
