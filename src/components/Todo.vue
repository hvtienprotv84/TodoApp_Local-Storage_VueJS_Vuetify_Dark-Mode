<template>
  <v-main>
    <v-container fluid>
      <v-flex xs12 offset-xs10>
        <input class="l " type="checkbox"  v-model="$vuetify.theme.dark">
      </v-flex>
      
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" class="ma-5">
          <a href="/">
            <h1 class="todo-title white--text">Todo App</h1>
          </a> 
          <v-card class="pt-6 mt-5 card-view">
            <v-row>
              <v-col id="format-day">
                <v-card-title class="card_title" id="day">
                  <span>{{moment().format('dddd')}}, </span>
                </v-card-title>
                <v-card-title class="card_title" id="month">
                  <b>{{moment().format('MMMM, Do')}}</b>
                </v-card-title>
                <!-- <v-card-subtitle class="card-sub-title" id="day">
                  <span>{{moment().format('dddd')}}</span>
                </v-card-subtitle> -->
              </v-col>
              <!-- <v-col class="mt-2">
                <v-progress-circular
                  :rotate="360"
                  :size="50"
                  :width="5"
                  class="mr-2"
                  :value="progress"
                  color="#8F8DA5"
                >{{ parseInt(progress) }}</v-progress-circular>
              </v-col> -->
              <v-col class="mt-2" id="progress">
                <v-progress-circular
                  :rotate="360"
                  :size="50"
                  :width="5"
                  class="mr-2"
                  :value="progress"
                  :color="progress === 100 ? 'green' : '#8F8DA5'"
                >
                  {{ parseInt(progress) }}
                </v-progress-circular>
              </v-col>

            </v-row>

            <v-tabs
              v-model="tab"
              background-color="transparent"
              color="#5A5EE7"
              fixed-tabs
              class="mt-5"
            >
              <v-tab v-for="item in items" :key="item">
                <v-container v-if="item == 'Active' && remainingTasks ">
                  <v-badge color="#f57173" :content="remainingTasks">{{ item }}</v-badge>
                </v-container>
                <v-container v-else-if="item == 'Completed' && completedTasks">
                  <v-badge color="#8F8DA5" :content="completedTasks">{{ item }}</v-badge>
                </v-container>
                <v-container v-else>{{ item }}</v-container>
              </v-tab>
            </v-tabs>
            <v-divider></v-divider>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="(item,index) in items" :key="item">
                <!-- All -->
                <template v-if="index == 0">
                  <v-card color="basil" flat>
                    <v-text-field
                      v-model="task"
                      single-line
                      solo
                      :clear-icon="icons[0]"
                      clearable
                      label="Thêm Công Việc!"
                      type="text"
                      @click:clear="clearMessage"
                      @keydown.enter="create"
                      hint="Nhấn Enter hoặc nút ADD để tạo công việc nhé!"
                      class="my-text-style"
                    >
                      <template v-slot:append>
                        <v-btn depressed rounded color="secondary" class="ma-0" @click="create">Add</v-btn>
                      </template>
                    </v-text-field>
                    <v-card v-if="tasks.length > 0" flat>
                      <v-slide-y-transition class="py-0" group tag="v-list">
                        <template v-for="(task, i) in tasks">
                          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
                            <v-hover v-slot:default="{ hover }" :key="`${i}-hover`">
                              <v-list-item :key="`${i}-${task.text}`"  v-bind:class="[hover && 'on-hover']">
                                <v-list-item-action>
                                  <v-checkbox
                                    v-model="task.done"
                                    :color="task.done && 'accent' || 'secondary'"
                                  >
                                    <template v-slot:label>
                                      <div 
                                        v-bind:class="[task.done && 'text-decoration-line-through']"
                                        class="ml-4"
                                        v-text="task.text"
                                      ></div>
                                    </template>
                                  </v-checkbox>
                                </v-list-item-action>
                              </v-list-item>
                            </v-hover>
                        </template>
                      </v-slide-y-transition>
                    </v-card>
                    <v-card v-else flat>
                      <img src="../assets/no_data.svg" alt="No data found" height="300">
                    </v-card>
                  </v-card>
                </template>

                <!-- Active -->
                <template v-if="index == 1">
                  <v-card color="basil" flat>
                    <v-text-field
                      v-model="task"
                      single-line
                      solo
                      :clear-icon="icons[0]"
                      clearable
                      label="Thêm Công Việc!"
                      type="text"
                      @click:clear="clearMessage"
                      @keydown.enter="create"
                      hint="Nhấn Enter hoặc nút ADD để tạo công việc nhé!"
                      class="my-text-style"
                    >
                      <template v-slot:append>
                        <v-btn depressed rounded color="secondary" class="ma-0" @click="create">Add</v-btn>
                      </template>
                    </v-text-field>
                    <v-card v-if="remainingTasks" flat>
                      <v-slide-y-transition class="py-0" group tag="v-list">
                        <template v-for="(task, i) in tasks">
                          <template v-if="!task.done">
                            <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
                            <v-hover v-slot:default="{ hover }" :key="`${i}-hover`">
                              <v-list-item :key="`${i}-${task.text}`"  v-bind:class="[hover && 'on-hover']">
                                <v-list-item-action>
                                  <v-checkbox
                                    v-model="task.done"
                                    :color="task.done && 'accent' || 'secondary'"
                                  >
                                    <template v-slot:label>
                                      <div
                                        :class="task.done && 'text-decoration-line-through'"
                                        class="ml-4"
                                        v-text="task.text"
                                      ></div>
                                    </template>
                                  </v-checkbox>
                                </v-list-item-action>
                              </v-list-item>
                            </v-hover>
                          </template>
                        </template>
                      </v-slide-y-transition>
                    </v-card>
                    <v-card v-else flat>
                      <img src="../assets/no_data.svg" alt="No data found" height="300">
                  </v-card>
                  </v-card>
                </template>

                <!-- Completed -->
                <template v-if="index == 2">
                  <v-card v-if="completedTasks" flat>
                    <v-slide-y-transition class="py-0" group tag="v-list">
                      <template v-for="(task, i) in tasks">
                        <template v-if="task.done">
                          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
                          <v-hover v-slot:default="{ hover }" :key="`${i}-hover`">
                            <v-list-item :key="`${i}-${task.text}`"  v-bind:class="[hover && 'on-hover']">
                              <v-list-item-action >
                                <v-checkbox
                                  v-model="task.done"
                                  :color="task.done && 'accent' || 'secondary'"
                                >
                                  <template v-slot:label>
                                    <div
                                      :class="task.done && 'text-decoration-line-through'"
                                      class="ml-4"
                                      v-text="task.text"
                                    ></div>
                                  </template>
                                </v-checkbox>
                              </v-list-item-action>
                              <v-spacer></v-spacer>
                              <v-scroll-x-transition>
                                <v-btn text color="accent"  @click="deleteItem(i)">
                                  <v-icon color="accent">delete_outline</v-icon>
                                </v-btn>
                              </v-scroll-x-transition>
                            </v-list-item>
                          </v-hover>
                        </template>
                      </template>
                    </v-slide-y-transition>
                    <v-btn
                      color="secondary"
                      class="ma-2 white--text float-right"
                      @click="deleteAll"
                      v-if="completedTasks"
                    >
                      <v-icon left>delete_outline</v-icon>delete all
                    </v-btn>
                  </v-card>
                  <v-card v-else flat>
                    <img src="../assets/no_data.svg" alt="No data found" height="300">
                  </v-card>
                </template>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mdiClose } from "@mdi/js";
var moment = require("moment");

export default {
  name: "Todo",
  data() {
    return {
      moment: moment,
      tab: null,
      items: ["Tất Cả", "Đang Thực Hiện", "Đã Hoàn Thành"],
      tasks: [
        {
          done: false,
          text: "Do coding challenge",
        },
        {
          done: false,
          text: "Design, Develop Deploy App",
        },
        {
          done: true,
          text: "Bug fix.",
        },
      ],
      task: null,
      icons: [mdiClose],
      rules: {
          required: value => !!value || 'Required.'
      }
    };
  },
  watch: {
    tasks: {
      handler() { this.saveTasks() },
      deep: true,
    },
  },
  mounted() {
    if (localStorage.getItem('tasks')) {
      try {
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
      } catch(e) {
        localStorage.removeItem('tasks');
      }
    }
  },
  computed: {
    completedTasks() {
      return this.tasks.filter((task) => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100 ? (this.completedTasks / this.tasks.length) * 100 : 0;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
  },

  methods: {
    create() {
      if(!this.task){
        return;
      }
      this.tasks.push({
        done: false,
        text: this.task,
      });
      this.task = null;
      this.saveTasks();
      
    },
    clearMessage() {
      this.message = "";
    },
    deleteAll(){
      const all_delete = this.tasks.filter((task) => task.done);
      all_delete.forEach(f => this.tasks.splice(this.tasks.findIndex(e => e.text === f.text),1));
      this.saveTasks();
    },
    deleteItem(i){
      this.tasks.splice(i,1);
      this.saveTasks();
    },
    saveTasks(){
      const parsed = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', parsed);
    }
  },
};
</script>

<style scoped>
  .todo-title {
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    color: whitesmoke;
    margin-top: -50px;
  }
  .card-view {
    display: block;
    width: 100%;
    /* background-color: rgb(254, 254, 255); */
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 150px;
    margin: auto;
    border-radius: 10px;
    overflow: hidden;
  }
  .card_title {
    font-size: 25px;
    color: rgb(102, 106, 251);
    letter-spacing: 0.8px;
  }
  .card-sub-title span {
    display: block;
    font-size: 20px;
    color: rgb(168, 169, 202);
    letter-spacing: 0.4px;
    text-align: left;
  }
  .on-hover {
    /* background-color: #EEEEEE; */
      background-color: var(--v-accent-lighten2);
  }
  .l {
    background-color: rgba(0,0,0,0.7);
    border-radius: 0.75em;
    box-shadow: 0.125em 0.125em 0 0.125em rgba(0,0,0,0.3) inset;
    color: #fdea7b;
    display: inline-flex;
    align-items: center;
    margin: auto;
    padding: 0.15em;
    width: 3em;
    height: 1.5em;
    transition: background-color 0.1s 0.3s ease-out, box-shadow 0.1s 0.3s ease-out;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .l:before, .l:after {
    content: "";
    display: block;
  }
  .l:before {
    background-color: #d7d7d7;
    border-radius: 50%;
    width: 1.2em;
    height: 1.2em;
    transition: background-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
    z-index: 1;
  }
  .l:after {
    background:
      linear-gradient(transparent 50%, rgba(0,0,0,0.15) 0) 0 50% / 50% 100%,
      repeating-linear-gradient(90deg,#bbb 0,#bbb,#bbb 20%,#999 20%,#999 40%) 0 50% / 50% 100%,
      radial-gradient(circle at 50% 50%,#888 25%, transparent 26%);
    background-repeat: no-repeat;
    border: 0.25em solid transparent;
    border-left: 0.4em solid #d8d8d8;
    border-right: 0 solid transparent;
    transition: border-left-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
    transform: translateX(-22.5%);
    transform-origin: 25% 50%;
    width: 1.2em;
    height: 1em;
  }
  /* Checked */
  .l:checked {
    background-color: rgba(0,0,0,0.45);
    box-shadow: 0.125em 0.125em 0 0.125em rgba(0,0,0,0.1) inset;
  }
  .l:checked:before {
    background-color: currentColor;
    transform: translateX(125%)
  }
  .l:checked:after {
    border-left-color: currentColor;
    transform: translateX(-2.5%) rotateY(180deg);
  }
  /* Other States */
  .l:focus {
    /* Usually an anti-A11Y practice but set to remove an annoyance just for this demo */
    outline: 0;
  }
  #format-day{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }
  #day{
    color: red;
  }
  #month{
    margin-left: -25px;
  }

  @media screen and (max-width: 768px) {
    #format-day{
      margin-left: 20px;
    }
    #day{
      font-size: 22px;
      width: max-content;
      font-weight: bold;
    }
    #month{
      font-size: 22px;
      width: max-content;
    }
    #progress{
      margin-left: -20px;
    }
  }

</style>
