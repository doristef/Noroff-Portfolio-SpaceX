<template>
    <b-container class="[ container ][ navbar-bg ]">
        <b-row class="[ m-2 mb-5 mt-4 ][ text-white ]">
            <b-container>
                <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
                <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="Email format: xxx@xxx.xx "
                >
                    <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="form.name"
                    required
                    placeholder="Enter name"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Message:" label-for="input-3">
                    <b-form-textarea
                        id="message"
                        v-model="form.message"
                        placeholder="Enter something..."
                        rows="3"
                    ></b-form-textarea>
                </b-form-group>

                <b-button type="submit" variant="success" class="[ m-2 ]">Submit</b-button>
                <b-button type="reset" variant="danger" class="[ m-2 ]">Reset</b-button>
                </b-form>
            </b-container>
        </b-row>
    </b-container>
</template>

<script>
import VueRouter from 'vue-router';
  export default {
      name: 'contact',
      VueRouter,
    data() {
      return {
        form: {
          email: '',
          name: '',
          message: null,
          checked: []
        }
      }
    },
    methods: {
      onSubmit() {
        this.$router.push('/thankyou')
      },
      onReset() {
        this.form.email = ''
        this.form.name = ''
        this.form.message = null
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>