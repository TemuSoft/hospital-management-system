<template>
  <div>
    <v-data-table
      dense
      class="default"
      :headers="headers"
      :items="datalist"
      :search="search"
      sort-by="isActive"
      :sort-desc="sortDesc"
    >
      <template v-slot:top>
        <v-layout>
          <h3>Departments</h3>
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            label="Enter search text ..."
            dense
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-btn
            @click="registerDepaDialog = true"
            small
            prepend-icon="mdi-plus"
          >
            <v-icon left>mdi-plus</v-icon>Add New
          </v-btn>
        </v-layout>
      </template>
    </v-data-table>

    <v-dialog v-model="registerDepaDialog" persistent width="700px">
      <v-card>
        <v-toolbar color="green" dark>Add New Departments </v-toolbar>
        <br />
        <v-card-text>
          <v-layout>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm3> Name</v-flex>
            <v-flex xs12 sm8>
              <v-text-field dense outlined v-model="item.name"></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm3> Status</v-flex>
            <v-flex xs12 sm8>
              <v-autocomplete
                dense
                :items="statusList"
                outlined
                v-model="item.staus"
              ></v-autocomplete>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm1> </v-flex>
            <v-flex xs12 sm3> Description</v-flex>
            <v-flex xs12 sm8>
              <v-text-field
                dense
                outlined
                v-model="item.description"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-spacer></v-spacer>
            <v-btn small @click="registerDepaDialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn small @click="save()">Save</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerDepaDialog: false,
      item: [],
      datalist: [],
      statusList: ["Active", "Not Active"],
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Status", value: "status" },
        { text: "Opening Date", value: "openingDAte" },
        { text: "Action", value: "action" },
      ],
    };
  },

  methods: {
    async save() {
      alert("Add new department save button clicked");
    },
  },
};
</script>

<style></style>
