import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
import Vue from 'vue';
export const state = () => ({
    counter: 0,
    firebase: null,
    characters:{},
    update: {},
    config:{
        apiKey: "AIzaSyCBBq0EAeqUgPgGFetB_LfRSveTInqLzEk",
        authDomain: "eberron-e52ae.firebaseapp.com",
        databaseURL: "https://eberron-e52ae-default-rtdb.firebaseio.com",
        projectId: "eberron-e52ae",
        storageBucket: "eberron-e52ae.appspot.com",
        messagingSenderId: "214485093205",
        appId: "1:214485093205:web:d71744a30596e081233ddc",
        measurementId: "G-YTECKJHNVF"
    }
})
export const mutations = {
    plus(state) {
        state.counter++
    },
    updateCharacter(state, data){
        state.update = data
    },
    editCharacter(state, data){
        Vue.set(state.characters, data.name, data)
    },
    resetCharacters(state){
        console.log("reset")
        state.characters = {}
    }
    
}