<template>
  <div class="main">
    <v-card>
      <v-tabs v-model="tab" align-with-title>
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab
          v-for="item in items"
          :key="item"
          @click.stop="handleTabNavigation(item.id)"
        >
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <div v-if="item.id === 1">
            <medicines />
          </div>
          <div v-if="item.id === 2">
            <medicineGroup />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
import medicines from "./medicine.vue";
import medicineGroup from "./medicineCategory.vue";

export default {
  components: {
    medicines,
    medicineGroup,
  },
  data: () => ({
    search: "",
    tab: null,
    headers: [
      { text: "Name", value: "name" },
      { text: "Company", value: "company" },
      { text: "Composition", value: "compositions" },
      { text: "Units", value: "units" },
      { text: "Group", value: "group" },
      { text: "UoFM", value: "uofm" },
      { text: "Actions", value: "actions" },
    ],
    items: [
      { id: 1, tab: "Medicines", content: "Tab 1" },
      { id: 2, tab: "Medicine Category", content: "Tab 2 Content" },
    ],
  }),
  created() {},

  computed: {},

  methods: {},
};
</script>

<style scoped>
.main {
  margin: 3%;
  margin-top: 1%;
}
</style>
