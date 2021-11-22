<template>
  <div class="main">
    <h3>Appointment</h3>
    <br />

    <v-card flat>
      <v-layout>
        <v-text-field
          v-model="search"
          label="Enter search text ..."
          dense
          single-line
          hide-details
        />
        <v-spacer />

        <v-autocomplete
          label="Status"
          outlined
          dense
          :items="statusType"
          item-text="text"
          item-value="value"
        />
        <v-spacer />

        <v-btn small @click="registerAppoDialog = true" outlined color="green">
          Add New
        </v-btn>
      </v-layout>
      <br />

      <v-data-table
        :search="search"
        :items="singleAppointment"
        :headers="headers"
      >
        <template v-slot:item.date="{ item }">
          {{ item.date }} - {{ item.time }}
        </template>

        <template v-slot:item.action="{ item }">
          <Edit class="icon" @click="editAppointment(item)" />
          <v-btn
            style="margin-left: 20px"
            text
            color="red"
            small
            @click="cancelAppointment(item)"
            class="text-capitalize"
          >
            Cancel
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <template>
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat>
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
              >
                Today
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right> mdi-menu-down </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title
                    v-html="selectedEvent.name"
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </template>

    <v-dialog v-model="registerAppoDialog" persistent width="700px">
      <MakeAppointment
        :appointmentInfo="appointmentInfo"
        @registerAppo="dialogControl($event)"
      />
    </v-dialog>

    <v-dialog v-model="updateAppoDialog" persistent width=" 700px">
      <v-card>
        <v-toolbar dense color="green" dark>
          Update Appointment
          <v-spacer />

          <Close class="icon" @click="updateAppoDialog = false" />
        </v-toolbar>
        <br />
        <v-card-text>
          <v-form @submit.prevent="update" ref="update">
            <v-layout>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="patients"
                  outlined
                  dense
                  item-text="card_number"
                  readonly
                  item-value="id"
                  label="Patient"
                  v-model="appointmentUpdateInfo.patient_id"
                />
              </v-flex>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-flex xs12 sm6>
                <v-autocomplete
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  readonly
                  :rules="inputRules"
                  :items="departments"
                  label="Department"
                  v-model="appointmentUpdateInfo.department_id"
                  @change="staffInDepertment($event)"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Date"
                  dense
                  type="date"
                  :rules="inputRules"
                  outlined
                  v-model="appointmentUpdateInfo.date"
                />
              </v-flex>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-flex xs12 sm6>
                <v-text-field
                  label="Time"
                  type="time"
                  :rules="inputRules"
                  dense
                  outlined
                  v-model="appointmentUpdateInfo.time"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm6>
                <v-autocomplete
                  outlined
                  dense
                  item-text="first_name"
                  item-value="id"
                  readonly
                  :items="staffInDepartent"
                  label="Staff"
                  v-model="appointmentUpdateInfo.setted_to_user"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm12>
                <v-text-field
                  label="Reason / Description"
                  dense
                  outlined
                  readonly
                  :rules="inputRules"
                  v-model="appointmentUpdateInfo.description"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer />
              <v-btn color="green" outlined small @click="update()"
                >Update</v-btn
              >
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MakeAppointment from "./makeAppintment.vue";
import AccountService from "@/network/accountService";
import Edit from "@/assets/icons/edit.svg";
import Close from "@/assets/icons/close.svg";

export default {
  data() {
    return {
      login_user: AccountService.getProfile(),
      inputRules: [(v) => !!v || "This field is required"],
      registerAppoDialog: false,
      search: "",
      appointmentInfo: {},
      headers: [
        { text: "Card Number ", value: "card_number" },
        { text: "Patient Detail", value: "patient_full_name" },
        { text: "Date a& Time", value: "date" },
        { text: "Seated By", value: "setted_by" },
        { text: "Staff", value: "user" },
        { text: "Reason", value: "description" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
      statusType: [
        { text: "Today", value: 1 },
        { text: "Done", value: 2 },
        { text: "Future", value: 3 },
      ],

      updateAppoDialog: false,
      appointmentUpdateInfo: {},

      //Temporary
      focus: "",
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "4day": "4 Days",
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ],
      names: [
        "Meeting",
        "Holiday",
        "PTO",
        "Travel",
        "Event",
        "Birthday",
        "Conference",
        "Party",
      ],
    };
  },

  components: {
    MakeAppointment,
    Edit,
    Close,
  },

  created() {
    this.loadData();

    //Temporary
    this.$refs.calendar.checkChange();
  },

  computed: {
    ...mapState("appointment", [
      "updatedAppointment",
      "appointmentLists",
      "singleAppointment",
    ]),
    ...mapState("department", ["departments", "staffInDepartent"]),
    ...mapState("patient", ["patients"]),
  },

  methods: {
    ...mapActions("appointment", [
      "updateAppointment",
      "getAppointmentList",
      "getSingleAppointment",
    ]),
    ...mapActions("department", ["getDepartmentList", "getStaffsInDepartment"]),
    ...mapActions("patient", ["getPatientList"]),

    async loadData() {
      // await this.getAppointmentList();
      await this.getPatientList();
      await this.getDepartmentList();
      await this.getSingleAppointment(this.login_user.id);
    },

    async update() {
      if (this.$refs.update.validate()) {
        this.appointmentUpdateInfo.user_id = this.login_user.id;
        await this.updateAppointment(this.appointmentUpdateInfo);

        if (this.updatedAppointment == true) this.dialogControl();
        else
          this.$fire({
            title: "Update Appointment!",
            text: "Something rwong try agai please",
            type: "error",
            timer: 7000,
          });
      }
    },

    async editAppointment(item) {
      this.appointmentUpdateInfo = item;
      this.updateAppoDialog = true;
      this.staffInDepertment(item.department_id);
    },

    async staffInDepertment(id) {
      await this.getStaffsInDepartment(id);
    },

    async cancelAppointment(item) {
      alert(item.id);
    },

    dialogControl(registerAppoDialog) {
      this.registerAppoDialog = registerAppoDialog;
      this.updateAppoDialog = false;
      this.loadData();
    },

    //Temporary
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style scoped>
.main {
  margin: 5%;
  margin-top: 2%;
}
.icon {
  cursor: pointer;
}
</style>
