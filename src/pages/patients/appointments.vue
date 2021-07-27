<template>
  <div>
    <v-card>
      <v-tabs
        slider-color="blue"
        background-color="primary"
        right
        v-model="tab"
        dark
      >
        <v-tab>
          <v-badge color="green" content="7" value="8">
            Unassigned services
          </v-badge>
        </v-tab>
        <v-tab ripple>
          <v-badge color="green" content="5" value="6" class="lowercase">
            Assigned services</v-badge
          >
        </v-tab>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    dialog: false,
    search: "",
    tab: null,
    un_assigned_pagetitle: "Un-Assigned Patients",
    assigned_pagetitle: "Assigned Patients",
    all_pagetitle: "All Patients",
  }),
  created() {},

  computed: {},
};
</script>
