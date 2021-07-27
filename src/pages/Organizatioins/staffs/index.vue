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
            <administrator />
          </div>
          <div v-else-if="item.id === 2">
            <humanResource />
          </div>
          <div v-else-if="item.id === 3">
            <labratory />
          </div>
          <div v-else-if="item.id === 4">
            <medicalDirectors />
          </div>
          <div v-else-if="item.id === 5">
            <nursePharmacy />
          </div>
          <div v-else-if="item.id === 6">
            <store />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
import administrator from "./administrator.vue";
import humanResource from "./humanResource.vue";
import labratory from "./labratory.vue";
import medicalDirectors from "./medicalDirectors.vue";
import nursePharmacy from "./nursePharmacy.vue";
import store from "./store.vue";

export default {
  components: {
    administrator,
    humanResource,
    labratory,
    medicalDirectors,
    nursePharmacy,
    store,
  },
  data: () => ({
    search: "",
    tab: null,
    items: [
      { id: 1, tab: "Adminstrator" },
      { id: 2, tab: "Human Resource" },
      { id: 3, tab: "Labratory and OPD" },
      { id: 4, tab: "Medical Directors" },
      { id: 5, tab: "Nurse and Pharmacy" },
      { id: 6, tab: "Store" },
    ],
  }),
  created() {},

  methods: {},
  computed: {},
};
</script>
