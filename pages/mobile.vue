<template>
  <div class="content">
    <v-row>
      <!-- <h1>{{characters}}</h1> -->
      <v-col cols="6" md="4" lg="3" class="fill-height" v-for="(item, index) in this.characters" v-bind:key="index">
        <div class="character">
          <div class="editIcon">
            <v-icon color="black"
              @click="edit(item.name)"
            >mdi-account-edit</v-icon>
          </div>
          <p class="text-center name">{{item.name}}</p>
          <p class="text-center class">The {{item.descriptor}}<br> {{item.className}}</p>
          <!-- <div class="charimg">
            <v-img v-bind:src="item.image" height="300px" contain @click="flip(item.name)" v-bind:id="item.name"></v-img>
          </div> -->
          <div class="data my-3" >
            <v-row class="mx-1">
              <v-col cols="6">
                <div >
                  <v-img :src="`${prefix}/fumble-3.png`"  height="50px" contain @click="change(item.fumbles+1, item.name, 'fumbles')" class="dice"></v-img>
                </div>
              </v-col>
              <v-col cols="6">
                <div >
                  <v-img :src="`${prefix}/d20-2.png`" height="50px" contain @click="change(item.crits+1, item.name, 'crits')" class="dice"></v-img>
                </div>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  @input="change($event, item.name, 'fumbles')"
                  v-bind:value="item.fumbles"
                  label="Fumbles"
                  type="number"
                  class="centered"
                  solo-inverted
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  @input="change($event, item.name, 'crits')"
                  v-bind:value="item.crits"
                  label="Crits"
                  type="number"
                  class="centered"
                  solo-inverted
                ></v-text-field>
              </v-col>
            </v-row>            
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore"
export default {
  name: 'IndexPage',
  data() {
    return {
      stateDB:{},
      prefix: ''
    }
  },
  computed: mapState({
    count: 'counter',
    fbconfig: 'config',
    characters: 'characters'
  }),
  mounted() {
    const firebaseApp = initializeApp(this.fbconfig)
    const db = getFirestore(firebaseApp);
    this.stateDB = db
  },
  methods: {
    ...mapMutations(['plus']),
    async change(e, name, indicator){
      e = parseInt(e)
      console.log(e)
      const ref = doc(this.stateDB, "characters", name)
      let payload = {}
      payload[indicator] = e
      await updateDoc(ref,payload)
    },
    flip(target){
      console.log(target)
      var element = document.getElementById(target);
      element.classList.add("clicked")
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Mea+Culpa&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pushster&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital@0;1&display=swap');
.content{
  background: rgba(212, 194, 194, 0.32);
  border-radius: 8px;
}
.character{
  outline: 5px solid black;
  border-radius: 8px;
  height: 210px;
  position: relative;
}
.name{
  font-family:'Pushster', cursive !important;
  font-size: 2rem;
  margin-bottom: -4px;
}
.class{
  font-size: 0.7rem;
  font-family: 'Noto Serif', serif;
  margin-bottom: 2px;
}
.charimg{
  margin-bottom: 0px;
}
.centered{
    margin-top: 0px;
}
.centered >>> input{
  font-family:'Pushster', cursive !important;
  text-align: center !important;
  font-size: 20px;
}
.dice{
  transition: all .3s ease-in-out;
  margin-bottom: -16px;
}
.dice:hover{
  transform: scale(1.2);
}
.editIcon{
  position: absolute;
  right: 12px;
  top: 14px;
}
.logo{
    max-width: 150px !important;
}
</style>