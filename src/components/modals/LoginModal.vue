<template>
  <modal>
    <span class="exit"><close-icon /></span>
    <h1>Sign Up</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="form.email" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="form.password" required />
      </div>
      <button type="submit">Log in</button>
    </form>
  </modal>
</template>

<script>
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

    const onSubmit = async () => {
      await createUser({ ...form })
      form.email = ''
      form.password = ''
    }

    return { form, onSubmit }
  }
}
</script>
