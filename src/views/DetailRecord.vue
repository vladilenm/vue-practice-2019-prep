<template>
  <div>
    <loader v-if="loading" />
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.type === 'outcome' ? 'Расход' : 'Доход'}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
            red: record.type === 'outcome',
            green: record.type === 'income'
          }">
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currency}}</p>
              <p>Категория: {{record.category.title}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      record: null,
      loading: true
    }),
    async mounted() {
      const categories = await this.$store.dispatch('fetchCategories')
      const record = await this.$store.dispatch('fetchRecordById', this.$route.params.id)

      this.record = {
        ...record,
        category: categories.find(c => c.id === record.categoryId)
      }
      this.loading = false
    }
  }
</script>

<style lang="scss" scoped>

</style>
