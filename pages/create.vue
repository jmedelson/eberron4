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
            @click="create"
          >
            Create
          </v-btn>
        </v-col>
        <v-col  cols="6" sm="3">
          <v-btn @click="clear" large color="error">
            clear
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions  } from 'vuex'
export default {
  name: 'CreatePage',
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
  methods: {
    ...mapMutations(['updateCharacter']),
    clear () {
      this.name = ""
      this.descriptor = "Unremarkable"
      this.className = ""
      this.image =""
      this.fumbles =0
      this.crits =0
    },
    async create(){
      const character = {
        name: this.name,
        descriptor: this.descriptor,
        className: this.className,
        image: this.image,
        fumbles: this.fumbles,
        crits: this.crits
      }
      console.log("sumbit")
      this.updateCharacter(character);
      this.$router.push({ path: '/loading' })
    }
  },
}
</script>
<style>
.form{
  background: rgba(212, 194, 194, 0.671);
}
</style>
