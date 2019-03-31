<template>
  <div>
    <div class="page-subtitle">
      <h4>Редактировать</h4>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="input-field" >
        <select ref="select" v-model="current">
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id"
          >{{cat.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model="title"
          :class="{invalid: $v.title.$dirty && !$v.title.required}"
        >
        <label for="name">Название</label>
        <span v-if="$v.title.$dirty && !$v.title.required" class="helper-text invalid">TITLE пароль</span>
      </div>

      <div class="input-field">
        <input
          id="limit"
          type="number"
          class="validate"
          v-model="limit"
          :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
        >
        <label for="limit">Лимит</label>
        <span v-if="$v.limit.$dirty && !$v.limit.minValue"  class="helper-text invalid">LIMIT пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
export default {
  props: ['categories'],
  validations: {
    title: {required},
    limit: {minValue: minValue(1)}
  },
  data: () => ({
    select: null,
    current: null,
    title: '',
    limit: 0
  }),
  watch: {
    current(val) {
      const {title, limit} = this.categories.find(c => c.id === val)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const cat = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', cat)
        this.$message('Категория обновлена')
        this.$emit('updated', cat)
      } catch (e) {

      }
    }
  },
  beforeDestroy() {
    this.select.destroy()
  }
}
</script>

<style lang="scss" scoped>

</style>
