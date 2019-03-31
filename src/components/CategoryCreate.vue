<template>
  <div>
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model="title"
          :class="{
            invalid: ($v.title.$dirty && !$v.title.required)
          }"
        >
        <label for="name">Название</label>
        <span class="helper-text invalid" v-if="($v.title.$dirty && !$v.title.required)">Введите название </span>
      </div>

      <div class="input-field">
        <input
          id="limit"
          type="number"
          class="validate"
          v-model.number="limit"
          :class="{
            invalid: ($v.limit.$dirty && !$v.limit.minValue)
          }"
        >
        <label for="limit">Лимит</label>
        <span class="helper-text invalid" v-if="($v.limit.$dirty && !$v.limit.minValue)">Минимальная величина</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
export default {
  data: () => ({
    title: '',
    limit: 1
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(1)}
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

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.$emit('created', category)
        this.title = ''
        this.limit = 1
        this.$message('Категория создана')
        this.$v.$reset()
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
