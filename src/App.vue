<template>
  <section>
    <div class="bg">
      <div class="bg2">
      </div>
    </div>

    <div class="badass-todo">
      <div class="title has-text-centered">
        Check List
      </div>
      <form @submit.prevent="addTodo">
        <div class="field is-grouped mb-5">
          <p class="control is-expanded">
            <input v-model="newTodoContent" class="input" type="text" placeholder="Ajouter une note">
          </p>
          <p class="control">
            <button :disabled="!newTodoContent" class="button is-info">
              Ajouter
            </button>
          </p>
        </div>
      </form>
      <div v-for="(todo) in todos" :key="todo" class="card mb-5" :class="{ 'has-background-success-light': todo.done }">
        <div class="card-content">
          <div class="content">
            <div class="columns is-mobile is-vcentered">
              <div class="column" :class="{ 'has-text-success line-through': todo.done }">
                {{ todo.content }}
              </div>
              <div class="column is-5 has-text-right">
                <button @click="toggleDone(todo.id)" class="button" :class="todo.done ? 'is-success' : 'is-light'">
                  &check;
                </button>
                <button @click="deleteTodo(todo.id)" class="button is-danger ml-2">
                  &cross;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/firebase'


const todosCollectionRef = collection(db, "todos")
const todosCollectionQuery = query(todosCollectionRef, orderBy('date', 'desc'))


const todos = ref(
  []
)

onMounted(() => {

  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      }
      fbTodos.push(todo)
    })
    todos.value = fbTodos
  })
})

const newTodoContent = ref('')

const addTodo = () => {

  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now()
  });

  newTodoContent.value = ''
}

const toggleDone = id => {
  const index = todos.value.findIndex(todo => todo.id === id)

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
  });
}

const deleteTodo = id => {
  deleteDoc(doc(todosCollectionRef, id))
}
</script>

<style>
@import 'bulma/css/bulma.min.css';


.bg {
  position: absolute;
  width: 100%;
  height: 150vh;
  background-image: url(./assets/bg5.jpg);
  background-size: cover;
  background-attachment: fixed;
  animation-name: back;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes back {
  0% {
    filter: hue-rotate(0deg) blur(35px);
  }

  100% {
    filter: hue-rotate(360deg) blur(35px);
  }
}


/* .bg2 {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 60px;
  box-sizing: border-box;
  border-radius: 5px;
} */


.badass-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
  /* background-color: rgba(0, 0, 0, 0.4); */
  background-color: #17202A;
  /* padding: 60px; */
  box-sizing: border-box;
  border-radius: 5px;
}

.line-through {
  text-decoration: line-through;
}
</style>