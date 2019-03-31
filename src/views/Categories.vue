<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <loader v-if="loading" />
    <section v-else>
      <div class="row">
        <div class="col s12 m6">
          <CategoryCreate
            @created="updateCategoryList"
          />
        </div>
        <div class="col s12 m6">
          <CategoryEdit
            v-if="categories.length"
            :key="categories.length + updateCount"
            :categories="categories"
            @updated="editCategoryList"
          />
          <p class="center" v-else>Категорий пока нет</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '../components/CategoryCreate'
import CategoryEdit from '../components/CategoryEdit'
export default {
  data: () => ({
    loading: true,
    updateCount: 0,
    categories: []
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    editCategoryList({title, id, limit}) {
      const idx = this.categories.findIndex(c => c.id === id)
      this.categories[idx].title = title
      this.categories[idx].limit = limit
      this.updateCount++
    },
    updateCategoryList(category) {
      this.categories.push(category)
    }
  },
  components: {CategoryCreate, CategoryEdit}
}
</script>

<style lang="scss" scoped>

</style>
