<template>
  
  <div class="container home">
    
    
    <button v-tooltip="'Look! It\'s a button, let\'s push it!'">DON\'T PUSH</button>
    
    <br>
  <br>
      <br>
          <br>
         <br>
      <br>
   <br>
  <br>
     <br>
        <br>
          <br>
        <br>
      <br>
    <br>
  <br>
     <br>
       <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
    <img src="@/assets/SVG.svg" alt="">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <ul class="review-list">
      <li v-for="review in reviews" :key="review._id">
        <p>
          About
          <router-link :to="`user/${review.aboutUser._id}`">
            {{review.aboutUser.fullname}}
          </router-link> 
        </p>
        <pre>{{review.txt}}</pre>
        <p>By 
          <router-link :to="`user/${review.byUser._id}`">
            {{review.byUser.fullname}}
          </router-link>
        </p>
      </li>
    </ul>
    <hr />
    <form v-if="loggedInUser" @submit.prevent="addReview()">
      <h2>Your gossip:</h2>
      <select v-model="reviewToEdit.aboutUserId">
        <option v-for="user in users" :key="user._id" :value="user._id" >
          {{user.fullname}}
        </option>
      </select>
      <textarea placeholder="Your Opinion Matters..." v-model="reviewToEdit.txt"></textarea>
      <button>Save</button>
    </form>
  </div>
</template>

<script>
import {showErrorMsg, showSuccessMsg} from '../services/event-bus.service'

export default {
  name:'review-app',

  data() {
    return {
      reviewToEdit: {
        txt: '',
        aboutUserId: null
      }
    }
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews
    },
    users() {
      return this.$store.getters.users
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser
    }
  },
  created() {
    this.$store.dispatch({type: 'loadUsers'})
    this.$store.dispatch({type: 'loadReviews'})
  },
  methods: {
    async addReview() {
      try {
        await this.$store.dispatch({type: 'addReview', review: this.reviewToEdit})
        showSuccessMsg('Review added')
        this.reviewToEdit = {txt: '', aboutUserId: null}
      } catch(err) {
        showErrorMsg('Cannot add review')
      }
    }
  }

  
}
</script>
