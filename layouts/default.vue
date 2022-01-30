<template>
  <v-app>
    <v-main>
      <Nav/>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions  } from 'vuex'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs,deleteDoc , onSnapshot } from "firebase/firestore"
export default {
  name: 'DefaultLayout',
  async created() {
    const firebaseApp = initializeApp(this.fbconfig)
    const db = getFirestore(firebaseApp);
    this.stateDB = db
    const querySnapshot = collection(db, "characters");
    const unsub = onSnapshot(querySnapshot, (collection) => {
      this.resetCharacters()
      const characters = [];
      collection.forEach((doc) =>{
        characters.push(doc.data().name)
        this.editCharacter(doc.data())
      })
      console.log("Current Characters: ", characters.join(", "));
    });
  },
  data () {
    return {
      stateDB:{},
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      title: 'Vuetify.js'
    }
  },
  watch: {
    $route () {
      console.log('route changed', this.$route)
      if(this.$route.name == 'loading'){
        this.create()
      }
    }
  },
  methods: {
    ...mapMutations(['editCharacter', 'resetCharacters']),
    async check(){
      console.log("click")
    },
    async create(){
      console.log("LOADING!!")
      let char = this.update
      console.log(this.stateDB)
      console.log(char)
      if('oldName' in char){
        let holder = char.oldName
        delete char.oldName
        await deleteDoc(doc(this.stateDB, "characters", holder))
        await setDoc(doc(this.stateDB, "characters", char.name), char)
      }else if('remove' in char){
        await deleteDoc(doc(this.stateDB, "characters", char.name))
      }else{
        await setDoc(doc(this.stateDB, "characters", char.name), char)
      }
      console.log("reload  check")
      let fail = false
      if("maxTouchPoints" in navigator){
        console.log("navigator")
        if(navigator.maxTouchPoints > 0){
          console.log("maxTouchPoints")
          if(window.screen.width<600){
            console.log("push mobile")
            this.$router.push({ path: '/mobile' })
          }else{
            fail = true
          }
        }else{
          fail = true
        }
      }else{
          fail = true
      }
      if(fail){
        console.log("push default")
        this.$router.push({ path: '/' })
      }
      console.log('end')
    }
  },
  computed: mapState({
    fbconfig: 'config',
    update: 'update'
  }),
}
</script>
<style>
  main{
    background:url("../static/eberonWallpaper.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
