<template>
  <!-- <div class="bar">
      <h1>hello 2</h1>
  </div> -->
  <v-container fluid>
    <v-row justify="space-between" align="center">
      <v-col>
        <router-link to="/"><v-img src='/logo5.png' max-height="100px" max-width="220px" contain position="left" class="ml-sm-5 logo"></v-img></router-link>
      </v-col>
      <v-spacer></v-spacer>
      <v-col >
        <router-link to="/create"><v-btn class="float-right mr-sm-5 create" color="success" elevation="2" large>Create</v-btn></router-link>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'Nav'
}
</script>

<style>
.bar{
  width:100%;
  background: rgb(255, 255, 255);
  height: 100px;
}
.create{
  color: white !important;
}
a { 
  text-decoration: none; 
  color: inherit;
}
</style>