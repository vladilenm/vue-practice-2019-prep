<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          class="validate"
          v-model="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">Email введите</small>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.email">Email должен быт email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Password введите</small>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.minLength">Минимальная длина</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
          v-model="name"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Name введите</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, minLength, required} from 'vuelidate/lib/validators'
export default {
  validations: {
    email: {required, email},
    name: {required},
    agree: {checked: val => val},
    password: {required, minLength: minLength(6)}
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('register', {
          email: this.email,
          password: this.password,
          name: this.name
        })
        this.$router.push('/')
      } catch (e) {

      }
    }
  }
}
</script>
