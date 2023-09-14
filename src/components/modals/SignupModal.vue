<template>
  <modal v-if="showSignupModal">
    <span class="exit" @click="close"><close-icon /></span>
    <h1>Sign Up</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="form.email" required placeholder="email..." />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="form.password" required placeholder="password..." />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </modal>
</template>

<script>
import { showSignupModal } from '../../lib/refs/modals'
import CloseIcon from '../icons/CloseIcon.vue'
import Modal from './Modal.vue'
import { createUser } from '@/lib/firebase.js'
import { reactive } from 'vue'

export default {
  components: {
    Modal,
    CloseIcon
  },

  setup() {
    const form = reactive({
      email: '',
      password: ''
    })

    const close = () => {
      showSignupModal.value = false
    }

    const onSubmit = async () => {
      await createUser({ ...form })
      form.email = ''
      form.password = ''
    }

    return { form, onSubmit, close, showSignupModal }
  }
}
</script>
