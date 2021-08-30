<template>
  <v-card>
    <br />
    <v-layout>
      <v-spacer />
      <v-btn
        small
        text
        color="green"
        right
        outlined
        @click="addAppointmentDialog = true"
      >
        Add New
      </v-btn>
    </v-layout>

    <v-dialog width="800px" v-model="addAppointmentDialog" persistent>
      <v-card>
        <v-toolbar dense color="green">
          Make New Appointment
          <v-spacer />

          <Close @click="addAppointmentDialog = false" class="icon" />
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="save" ref="save">
            <v-layout>
              <v-flex xs12 sm5>
                <v-autocomplete
                  outlined
                  dense
                  :items="departments"
                  label="Department"
                  v-model="appointment.department"
                  :rules="inputRules"
                />
                <br />
                <v-text-field
                  label="Date"
                  dense
                  outlined
                  v-model="appointment.date"
                  :rules="inputRules"
                />
                <br />
                <v-text-field
                  label="Time"
                  type="time"
                  dense
                  outlined
                  v-model="appointment.time"
                  :rules="inputRules"
                />
              </v-flex>
              <v-flex xs12 sm1></v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete
                  outlined
                  dense
                  :items="satffList"
                  label="To Woom?"
                  v-model="appointment.staff_id"
                />
                <v-textarea
                  rows="5"
                  label="Reason / Description"
                  dense
                  outlined
                  v-model="appointment.description"
                  :rules="inputRules"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer />
              <v-btn small @click="save()" outlined color="green">Save </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-data-table
      :items="appointmentLIst"
      :headers="headers"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import Close from "@/assets/icons/close.svg";

export default {
  data() {
    return {
      addAppointmentDialog: false,
      appointment: {},
      inputRules: [(v) => !!v || "This field is required"],

      headers: [
        { text: "Card Number", value: "card_number" },
        { text: "Full Name", value: "full_name" },
        { text: "Date a& Time", value: "dateTime" },
        { text: "Department", value: "department" },
        { text: "With Whom?", value: "doctor" },
        { text: "Reason", value: "reason" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
    };
  },

  components: {
    Close,
  },

  methods: {
    async save() {
      if (this.$refs.save.validate()) {
        alert(true);
      }
    },
  },
};
</script>

<style scoped></style>
