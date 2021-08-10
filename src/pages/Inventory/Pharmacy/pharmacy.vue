<template>
  <div>
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
          <div v-if="item.id === 3">
            <medicineCategory />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
import medicines from "./medicine.vue";
import medicineGroup from "./medicineGroup.vue";
import medicineCategory from "./medicineCategory.vue";

export default {
  components: {
    medicines,
    medicineGroup,
    medicineCategory,
  },
  data: () => ({
    search: "",
    tab: null,
    headers: [
      { text: "Name", value: "name" },
      { text: "Company", value: "company", sortable: false },
      { text: "Composition", value: "compositions" },
      { text: "Units", value: "units", sortable: true },
      { text: "Group", value: "group", sortable: true },
      { text: "Category", value: "category", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [
      { id: 1, tab: "Medicines", content: "Tab 1" },
      { id: 2, tab: "Medicine Groups", content: "Tab 2 Content" },
      { id: 3, tab: "Medicine Categories", content: "Tab 3 Content" },
    ],
  }),
  created() {},

  methods: {},
  computed: {},
};
</script>
