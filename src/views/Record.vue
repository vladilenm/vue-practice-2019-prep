<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <loader v-if="loading" />

    <form class="form" v-else @submit.prevent="onSubmit">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
            v-for="cat of categories"
            :key="cat.id"
            :value="cat.id"
          >{{cat.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Сумма</label>
        <span v-if="$v.amount.$dirty && !$v.amount.minValue"
              class="helper-text invalid">amount пароль</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Описание</label>
        <span v-if="$v.description.$dirty && !$v.description.required"
              class="helper-text invalid">description пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {minValue, required} from 'vuelidate/lib/validators'
export default {
  validations: {
    amount: {minValue: minValue(1)},
    description: {required}
  },
  data: () => ({
    select: null,
    categories: [],
    category: null,
    loading: true,
    amount: 1,
    description: '',
    type: 'income'
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.category = this.categories[0].id
    this.loading = false
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  computed: {
    bill() {
      return this.$store.getters.info.bill
    }
  },
  methods: {
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
      return this.bill >= this.amount
    },
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord()) {
        await this.$store.dispatch('createRecord', {
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON()
        })
        await this.$store.dispatch('updateInfo', {
          bill: this.type === 'income' ? this.bill + this.amount : this.bill - this.amount
        })
        this.$message('Запись создана')
        this.$v.$reset()
        this.amount = 1
        this.description = ''
      } else {
        this.$message('Недостаточно средств на счету')
      }
    }
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
