<template>
  <div class="main">
    <v-layout>
      <v-flex xs12 sm2><h2>Patinet List</h2></v-flex>

      <v-flex xs12 sm6>
        <v-tabs v-model="tab" right>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab @click.stop="tabSelectedChanged('first_name')">
            First Name
          </v-tab>
          <v-tab @click.stop="tabSelectedChanged('card_number')">
            Card Number
          </v-tab>
          <v-tab @click.stop="tabSelectedChanged('phone_number')">
            Phone Number
          </v-tab>
        </v-tabs>
      </v-flex>
    </v-layout>

    <v-tabs-items v-model="tab">
      <v-card flat>
        <v-data-table :headers="headers" :items="patients" :search="search">
          <template v-slot:item.patient_type="{ item }">
            <label v-if="item.patient_type === 1">Regular</label>
            <label v-else-if="item.patient_type === 2">Credit</label>
            <label v-else-if="item.patient_type === 3">Organization</label>
            <label v-else-if="item.patient_type === 4">Temporary</label>
          </template>

          <template v-slot:item.action="{ item }">
            <Edit @click="editPatient(item)" class="icon" />
            &nbsp;&nbsp;&nbsp;
            <Detail @click="detailPatient(item)" class="icon" />
            &nbsp;&nbsp;&nbsp;
            <Transfer
              v-if="item.status === 1"
              @click="transferPatient(item)"
              class="icon"
            />
            <Payment v-else @click="repaymentCardPatient(item)" class="icon" />
          </template>

          <template v-slot:item.first_name="{ item }">
            <label>
              {{ item.first_name }}
              {{ item.fathers_name }}
              {{ item.last_name }}
            </label>
          </template>

          <template v-slot:top>
            <br />
            <v-layout>
              <v-text-field
                v-model="search"
                label="Enter search text ..."
                dense
                rounded
                :search="search"
              />
              <v-spacer />

              <v-text-field
                v-model="filterationText"
                label="Filteration text"
                dense
                outlined
              />
              <v-spacer />
              <v-btn text outlined @click="filterPatient()">Filter</v-btn>
              <v-spacer />

              <v-btn
                small
                outlined
                @click="$router.push({ name: 'regsiterPatinet' })"
              >
                Add New
              </v-btn>
            </v-layout>
          </template>

          <template v-slot:no-data>
            <h3>No Data available ...</h3>
          </template>
        </v-data-table>
      </v-card>
    </v-tabs-items>

    <v-dialog v-model="updatePatientDialog" width="900px" persistent>
      <v-card>
        <v-toolbar dense color="green">Update Patient Information</v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="updatePatient" ref="updatePatient">
            <v-layout row justify-center>
              <v-select
                dense
                v-model="patientInfo.patient_type"
                :items="patientTypeoptions"
                label="Select Patinet Type"
                :rules="inputRules"
                item-text="name"
                item-id="value"
                outlined
                single-line
              />
              <v-spacer />
              <v-spacer />
            </v-layout>

            <v-layout row>
              <v-text-field
                label="First Name"
                v-model="patientInfo.first_name"
                :rules="inputRules"
                outlined
                dense
              />
              <v-spacer />

              <v-text-field
                label="Birth Date"
                type="date"
                v-model="patientInfo.birthdate"
                :rules="inputRules"
                outlined
                dense
              />
              <v-spacer />

              <v-text-field
                label="Phone"
                v-model="patientInfo.phone_number"
                :rules="inputRules"
                outlined
                dense
              />
              <v-spacer />

              <v-text-field
                label="Guardian Name"
                v-model="patientInfo.guardian_name"
                :rules="inputRules"
                outlined
                dense
              />
            </v-layout>

            <v-layout row>
              <v-text-field
                label="Father Name"
                v-model="patientInfo.fathers_name"
                :rules="inputRules"
                outlined
                dense
              />
              <v-spacer />

              <v-autocomplete
                label="Nationality"
                v-model="patientInfo.nationality"
                :items="nationalityList"
                item-text="name"
                item-id="value"
                outlined
                dense
              />
              <v-spacer />

              <v-text-field
                label="Region"
                v-model="patientInfo.region"
                outlined
                dense
              />
              <v-spacer />

              <v-text-field
                type="number"
                label="Guardian Contact"
                v-model="patientInfo.guardian_contact"
                outlined
                dense
              />
            </v-layout>

            <v-layout row>
              <v-text-field
                label="Grand Father"
                v-model="patientInfo.last_name"
                :rules="inputRules"
                outlined
                dense
              />
              <v-spacer />

              <v-text-field
                label="Zone"
                v-model="patientInfo.zone"
                outlined
                dense
              />
              <v-spacer />

              <v-text-field
                label="Woreda"
                v-model="patientInfo.woreda"
                outlined
                dense
              />
              <v-spacer />

              <v-text-field
                label="Kebele"
                v-model="patientInfo.kebele"
                outlined
                dense
              />
            </v-layout>

            <v-layout row>
              <v-autocomplete
                label="Gender"
                v-model="patientInfo.gender"
                :rules="inputRules"
                :items="genderoptions"
                outlined
                dense
              />
              <v-spacer />

              <v-text-field
                label="House Number"
                v-model="patientInfo.house_number"
                outlined
                dense
              />
            </v-layout>
            <br />

            <v-layout>
              <v-spacer />
              <v-spacer />
              <v-btn
                small
                outlined
                color="red"
                @click="updatePatientDialog = false"
              >
                Cancel
              </v-btn>
              <v-spacer />
              <v-btn small outlined color="green" @click="updatePatient()">
                Update Patient
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="assignPatientDialog" width="800" persistent>
      <v-card>
        <v-toolbar dense color="green">
          Patient Assign / Send Request for Nurse
        </v-toolbar>
        <br />

        <v-card-text>
          <v-form @submit.prevent="assignRoomSave" ref="assignRoomSave">
            <v-layout>
              <v-flex xs12 sm1></v-flex>
              <v-flex xs12 sm6>
                <label class="titleHead">Full Name : </label>
                <label class="titleCont">
                  {{ selectedPatinet.first_name }}
                  {{ selectedPatinet.fathers_name }}
                  ({{ selectedPatinet.gender }})
                </label>
                <br />
                <label class="titleHead">Card Number : </label>
                <label class="titleCont">
                  {{ selectedPatinet.card_number }}
                </label>
                <br />
                <label class="titleHead">Guardian Name : </label>
                <label class="titleCont">
                  {{ selectedPatinet.guardian_name }}
                </label>
                <br />
              </v-flex>

              <v-flex xs12 sm4>
                <label class="titleHead">Room Number To Assign </label>
                <br />
                <v-autocomplete
                  dense
                  :items="rooms"
                  outlined
                  item-text="room_number"
                  item-value="id"
                  :rules="inputRules"
                  v-model="assignRoom.room_id"
                />

                <v-checkbox
                  label="Emergency"
                  v-model="assignRoom.is_emergency"
                />
              </v-flex>
            </v-layout>
            <br />
            <br />

            <v-layout>
              <v-spacer />
              <v-spacer />

              <v-btn
                text
                outlined
                color="red"
                @click="assignPatientDialog = false"
              >
                Cancel
              </v-btn>
              <v-spacer />

              <v-btn text outlined color="green" @click="assignRoomSave()">
                Assign
              </v-btn>
              <v-spacer />
              <v-spacer />
            </v-layout>
            <br />
            <br />
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Edit from "@/assets/icons/edit.svg";
import Detail from "@/assets/icons/eye.svg";
import Transfer from "@/assets/icons/send.svg";
import Payment from "@/assets/icons/payment.svg";

export default {
  data() {
    return {
      assignRoom: {},
      selectedPatinet: {},
      tab: null,
      tabSelected: "first_name",
      filterationText: "",
      assignPatientDialog: false,
      updatePatientDialog: false,
      patientInfo: {},
      search: "",
      headers: [
        { text: "Card Number", value: "card_number" },
        { text: "Full Name", value: "first_name" },
        { text: "Gender", value: "gender" },
        { text: "Birthdate", value: "birthdate" },
        { text: "Phone Number", value: "phone_number" },
        { text: "Patient Type", value: "patient_type" },
        { text: "Guardian", value: "guardian_name" },
        { text: "Date Register", value: "registration_date" },
        { text: "Action", value: "action" },
      ],

      inputRules: [(v) => !!v || "This field is required"],
      genderoptions: ["Male", "Female"],

      patientTypeoptions: [
        { name: "Regular", value: 1 },
        { name: "Credit", value: 2 },
        { name: "Organization", value: 3 },
        { name: "Temporary", value: 4 },
      ],
      nationalityList: [
        { name: "Ethiopia", value: 1 },
        { name: "Others", value: 2 },
      ],
    };
  },

  components: {
    Edit,
    Detail,
    Transfer,
    Payment,
  },

  created() {
    this.loadData();
  },

  computed: {
    ...mapState("patient", ["patients", "updateResponse"]),
    ...mapState("room", ["rooms", "assignedPatientRoomRequest"]),
  },

  methods: {
    ...mapActions("patient", [
      "getPatientList",
      "getPatientFilter",
      "updatePatientInfo",
    ]),

    ...mapActions("room", ["getRoomsList", "assignPatientRoomRequest"]),

    async editPatient(item) {
      this.patientInfo = item;
      this.updatePatientDialog = true;
    },

    async detailPatient(item) {
      this.$router.push({
        name: "patientDetail",
        params: { patientId: item.id },
      });
    },

    async transferPatient(item) {
      this.selectedPatinet = item;
      this.assignPatientDialog = true;
    },

    async repaymentCardPatient(item) {
      console.log(item);
    },

    async loadData() {
      await this.getPatientList();
      await this.getRoomsList();
    },

    async assignRoomSave() {
      if (this.$refs.assignRoomSave.validate()) {
        this.assignRoom.patient_id = this.selectedPatinet.id;
        this.assignRoom.reception_user_id = 1;
        await this.assignPatientRoomRequest(this.assignRoom);

        if (this.assignedPatientRoomRequest.status === 1) {
          this.assignPatientDialog = false;
          this.loadData();
        } else if (this.assignedPatientRoomRequest.type === -101)
          this.$fire({
            title: "Assign Room",
            text: "Something wrong please try again!!!",
            type: "error",
            timer: 7000,
          }).then(() => {
            this.assignPatientDialog = false;
          });
        else
          this.$fire({
            title: "Assign Room",
            text: "Selected Patient Assigned Before!!!",
            type: "warning",
            timer: 7000,
          }).then(() => {
            this.assignPatientDialog = false;
          });
      }
    },

    async updatePatient() {
      if (this.$refs.updatePatient.validate()) {
        await this.updatePatientInfo(this.patientInfo);
        alert(this.updateResponse);
        if (this.updateResponse === true) {
          this.updatePatientDialog = false;
          await this.getPatientList();
        } else alert("Something wrong try again!!!");
      }
    },

    async tabSelectedChanged(text) {
      this.tabSelected = text;
    },

    async filterPatient() {
      await this.getPatientFilter({
        key: this.tabSelected,
        value: this.filterationText,
      });
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

.titleHead {
  font-family: bold;
  font: bold 12px/30px Georgia;
  letter-spacing: 2px;
}
.titleCont {
  font-size: 17px;
}
</style>
