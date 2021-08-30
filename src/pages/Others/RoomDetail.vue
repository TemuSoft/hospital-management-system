<template>
  <div class="main">
    <v-card>
      <v-toolbar>
        <v-btn
          text
          class="text-capitalize"
          @click="$router.push({ name: 'room' })"
        >
          <v-icon class="mx-3">mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer />
        Room Detail about :
        <h2>{{ singleRoomInfo.room_number }}</h2>
        <v-spacer />
        <v-btn text small outlined @click="assignRoomStaffDialog = true">
          Add New
        </v-btn>
      </v-toolbar>
      <v-divider />

      <v-data-table
        :items="staffListInRoom"
        :search="search"
        :headers="headers"
        dense
      >
        <template v-slot:item.action="{ item }">
          <Edit @click="editStaffInRoom(item)" class="icon" />
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="assignRoomStaffDialog" persistent width="500px">
      <v-card>
        <v-toolbar dense color="green"> Assign Staff To Room </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="assignStaff()" ref="assignStaff">
            <v-layout>
              <v-flex xs12 sm3>Departments</v-flex>

              <v-flex xs12 sm9>
                <v-autocomplete
                  outlined
                  dense
                  :items="departments"
                  item-text="name"
                  item-value="id"
                  :rules="inputRules"
                  @change="loadStaffInDepartment($event)"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 sm3>Staffs</v-flex>

              <v-flex xs12 sm9>
                <v-autocomplete
                  dense
                  outlined
                  :items="staffInDepartent"
                  item-text="first_name"
                  item-value="id"
                  :rules="inputRules"
                  v-model="assignStaffRoomInfo.member_id"
                />
              </v-flex>
            </v-layout>

            <!-- <v-layout>
              <v-flex xs12 sm3>Status</v-flex>

              <v-flex xs12 sm9>
                <v-autocomplete
                  dense
                  outlined
                  :items="statusList"
                  item-text="text"
                  item-value="value"
                  :rules="inputRules"
                  v-model="assignStaffRoomInfo.status"
                />
              </v-flex>
            </v-layout> -->

            <v-layout>
              <v-spacer />
              <v-btn text small outlined color="red" @click="cancel()">
                Cancel
              </v-btn>
              <v-spacer />

              <v-btn text small outlined color="green" @click="assignStaff()">
                Save
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Edit from "@/assets/icons/edit.svg";

export default {
  data() {
    return {
      assignStaffRoomInfo: {},
      assignRoomStaffDialog: false,
      search: "",
      roomId: "",
      inputRules: [(v) => !!v || "This field is required"],
      headers: [
        { text: "Full Name", value: "full_name" },
        { text: "Gender", value: "gender" },
        { text: "Action", value: "action" },
      ],
      statusList: [
        { text: "Active", value: 1 },
        { text: "Not-Active", value: 2 },
      ],
    };
  },

  components: {
    Edit,
  },

  created() {
    const { roomId } = this.$route.params;
    this.roomId = roomId;
    this.loadData();
  },

  computed: {
    ...mapState("department", ["departments", "staffInDepartent"]),
    ...mapState("room", [
      "assignedRoomStaff",
      "singleRoomInfo",
      "staffListInRoom",
    ]),
  },

  methods: {
    ...mapActions("department", ["getDepartmentList", "getStaffsInDepartment"]),
    ...mapActions("room", [
      "assignRoomStaff",
      "getSIngleRoomInfo",
      "getStaffListInRoom",
    ]),

    async loadData() {
      await this.getSIngleRoomInfo(this.roomId);
      await this.getDepartmentList();
      await this.getStaffListInRoom(this.roomId);
    },

    async assignStaff() {
      if (this.$refs.assignStaff.validate()) {
        this.assignStaffRoomInfo.room_id = this.roomId;
        await this.assignRoomStaff(this.assignStaffRoomInfo);

        if (this.assignedRoomStaff === true) {
          this.assignRoomStaffDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Assign Staff To Romm",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async loadStaffInDepartment(id) {
      await this.getStaffsInDepartment(id);
    },

    async cancel() {
      this.assignRoomStaffDialog = false;
      this.roomInfo = {};
    },

    async addStaffInRoom(id) {
      this.assignRoomStaffDialog = true;
      this.assignStaffRoomInfo.room_id = id;
    },

    async editStaffInRoom(item) {
      alert("Edit staff in room id : " + item.id + " is clicked!!!");
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 3%;
}
</style>
