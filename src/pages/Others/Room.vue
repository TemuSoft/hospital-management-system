<template>
  <div class="main">
    <v-card>
      <v-toolbar>
        <h3>Room List</h3>
        <v-spacer />

        <v-btn text small outlined @click="registerRoomDialog = true">
          Add New
        </v-btn>
      </v-toolbar>
      <v-divider />
      <br />

      <v-data-table :items="rooms" :search="search" :headers="headers">
        <template v-slot:item.action="{ item }">
          <Edit @click="editRoom(item)" class="icon" />
          &nbsp;&nbsp;&nbsp;
          <Detail @click="detailRoom(item)" class="icon" />
        </template>
      </v-data-table>

      <v-dialog v-model="registerRoomDialog" persistent width="500px">
        <v-card>
          <v-toolbar dense color="green">Room Registeration</v-toolbar>
          <br />

          <v-card-text>
            <v-form @submit.prevent="save" ref="save">
              <v-layout>
                Room Number
                <v-spacer />

                <v-text-field
                  v-model="roomInfo.room_number"
                  dense
                  outlined
                  :rules="inputRules"
                />
              </v-layout>

              <v-layout>
                <v-sapcer />
                <v-btn text outlined color="red" @click="cancel()">
                  Cancel
                </v-btn>
                <v-spacer />

                <v-btn text outlined color="green" @click="save()">
                  Save
                </v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="updateRoomDialog" persistent width="500px">
        <v-card>
          <v-toolbar dense color="green">Update Room</v-toolbar>
          <br />

          <v-card-text>
            <v-form @submit.prevent="update" ref="update">
              <v-layout>
                Room Number
                <v-spacer />

                <v-text-field
                  v-model="roomInfo.room_number"
                  dense
                  outlined
                  :rules="inputRules"
                />
              </v-layout>

              <v-layout>
                <v-sapcer />
                <v-btn text small outlined color="red" @click="cancel()">
                  Cancel
                </v-btn>
                <v-spacer />

                <v-btn text small outlined color="green" @click="update()">
                  Update
                </v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Edit from "@/assets/icons/edit.svg";
import Detail from "@/assets/icons/eye.svg";

export default {
  data() {
    return {
      roomInfo: {},
      registerRoomDialog: false,
      updateRoomDialog: false,
      search: "",
      inputRules: [(v) => !!v || "This field is required"],
      headers: [
        { text: "Room Number", value: "room_number" },
        { text: "Total Staff Assigned", value: "staff_assigned" },
        { text: "Action", value: "action" },
      ],
    };
  },

  created() {
    this.loadData();
  },

  components: {
    Edit,
    Detail,
  },

  computed: {
    ...mapState("room", ["registeredRoom", "updatedRoom", "rooms"]),
  },

  methods: {
    ...mapActions("room", ["registerRoom", "getRoomsList", "updateRoom"]),

    async loadData() {
      await this.getRoomsList();
    },

    async save() {
      if (this.$refs.save.validate()) {
        await this.registerRoom(this.roomInfo);

        if (this.registeredRoom === true) {
          this.registerRoomDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Room Registeration",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async update() {
      if (this.$refs.update.validate()) {
        await this.updateRoom(this.roomInfo);

        if (this.updatedRoom === true) {
          this.updateRoomDialog = false;
          this.loadData();
        } else
          this.$fire({
            title: "Room Info Update",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          });
      }
    },

    async cancel() {
      this.registerRoomDialog = false;
      this.updateRoomDialog = false;
      this.roomInfo = {};
    },

    async editRoom(item) {
      this.updateRoomDialog = true;
      this.roomInfo = item;
    },

    async detailRoom(item) {
      this.$router.push({ name: "roomDetail", params: { roomId: item.id } });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 7%;
  margin-top: 3%;
}

.icon {
  cursor: pointer;
}
</style>
