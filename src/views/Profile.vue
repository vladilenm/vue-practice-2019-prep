<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form @submit.prevent="onSubmit" class="form">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">Имя</label>
        <span v-if="$v.name.$dirty && !$v.name.required"
              class="helper-text invalid">name пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
  validations: {
    name: {required}
  },
  data() {
    return {name: this.$store.getters.info.name}
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      await this.$store.dispatch('updateInfo', {
        name: this.name
      })
      this.$message('Обновлено')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
