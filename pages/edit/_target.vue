<template>
  <div class="form rounded-xl">
    <v-form ref="form">
      <v-row class="mx-3">
        <v-col cols="12" md="4">
          <v-text-field
              v-model="name"
              :counter="25"
              label="Character Name"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
              v-model="descriptor"
              :counter="25"
              prefix="The "
              label="Descriptor"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
              v-model="className"
              :counter="10"
              label="Class"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
              v-model="image"
              label="Image URL"
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="4">
          <v-text-field
              v-model="fumbles"
              label="Fumbles"
              type="number"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="6" md="4">
          <v-text-field
              v-model="crits"
              label="Crits"
              type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12"></v-col>
        <v-col cols="6" sm="3">
          <v-btn
            class="mr-4"
            large
            color="success"
            @click="update"
          >
            UPDATE
          </v-btn>
        </v-col>
        <v-col  cols="6" sm="3">
          <v-btn @click="clear" large color="error">
            Delete
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
  <!-- <h1>{{this.$route.params.name}}</h1> -->
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'edit',
  data() {
    return { 
      name: "",
      descriptor: "Unremarkable",
      className: "",
      image:"",
      fumbles:0,
      crits:0
    }
  },
  computed: mapState({
    count: 'counter',
    fbconfig: 'config',
    characters: 'characters'
  }),
  mounted() {
    console.log("MOUNTED")
    let found = this.loadChar()
    console.log('found = ', found)
    if(!found){
      setTimeout(() => this.loadChar(), 1000);
    }
  },
  methods: {
    ...mapMutations(['updateCharacter']),
    clear () {
      const character = {
        name: this.name,
        descriptor: this.descriptor,
        className: this.className,
        image: this.image,
        fumbles: this.fumbles,
        crits: this.crits
      }
      character['remove'] = true
      this.updateCharacter(character);
      this.$router.push({ path: '/loading' })
    },
    loadChar(){
      console.log('attempting load')
      try {
        console.log(this.$route.params.target)
        console.log(this.characters)
        for(let character in this.characters){
          if(this.$route.params.target == character){
            console.log("match:", character)
            console.log(this.characters[character])
            let main = this.characters[character]
            this.name = main.name
            this.descriptor = main.descriptor
            this.className = main.className
            this.image = main.image
            this.fumbles = main.fumbles
            this.crits = main.crits
            return true
          }
        }
      } catch (error) {
        console.log(error)
      }
      console.log('character not found')
      return false
    },
    async update(){
      const character = {
        name: this.name,
        descriptor: this.descriptor,
        className: this.className,
        image: this.image,
        fumbles: this.fumbles,
        crits: this.crits
      }
      console.log("sumbit")
      if(this.$route.params.target == this.name){
        this.updateCharacter(character);
        this.$router.push({ path: '/loading' })
      }else{
        character['oldName'] = this.$route.params.target
        this.updateCharacter(character);
        this.$router.push({ path: '/loading' })
      }
      
    }
  },
}
</script>

<style>
.form{
  background: rgba(212, 194, 194, 0.671);
}
</style>