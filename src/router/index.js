import Vue from "vue";
import VueRouter from "vue-router";

import dashboard from "../pages/Dashboard/index.vue";
import financedashboard from "../pages/Dashboard/finance.vue";

import regsiterPatinet from "../pages/patients/regsiter.vue";
import patinetList from "../pages/patients/patinetList.vue";
import patientDetail from "../pages/patients/patientDetail.vue";
import appointments from "../pages/Appointment/index.vue";
import opd from "../pages/patients/opd.vue";
import pharmacy from "../pages/Inventory/Pharmacy/pharmacy.vue";
import prescription from "../pages/Inventory/Pharmacy/prescription.vue";
import prescriptionDetail from "../pages/Inventory/Pharmacy/prescriptionDetail.vue";

import labratoryTest from "../pages/MedicalService/labratory/labratoryTest.vue";
import labratoryReport from "../pages/MedicalService/labratory/labratoryReport.vue";
import labratoryResult from "../pages/MedicalService/labratory/labratoryResult.vue";

import imagingTest from "../pages/MedicalService/imaging/imagingTest.vue";
import imagingReport from "../pages/MedicalService/imaging/imagingReport.vue";
import imagingResult from "../pages/MedicalService/imaging/imagingResult.vue";

import departments from "../pages/Organization/departments.vue";
import insurance from "../pages/Organization/insurance.vue";
import insuranceDetail from "../pages/Organization/insuranceDetail.vue";

import staff from "../pages/Organization/staffs/index.vue";
import staffDetail from "../pages/Organization/staffs/staffDetail.vue";
import staffUpdate from "../pages/Organization/staffs/staffUpdate.vue";
import payment from "../pages/casher/index.vue";
import paymentHistory from "../pages/casher/paymentHistory.vue";
import registerPrepayment from "../pages/casher/registerPrepayment.vue";

import nurse from "../pages/nurse/index.vue";
import nursePatientDetail from "../pages/nurse/nursePatientDetail.vue";

import registerStaff from "../pages/Organization/staffs/registerStaff.vue";
import chat from "../pages/chat/index.vue";

import changePassword from "../pages/setting/changePassword.vue";
import hospitalSetting from "../pages/setting/hospitalSetting.vue";
import rolePermission from "../pages/setting/rolePermission.vue";

import store from "../pages/Inventory/store/index.vue";
import inventoryDetail from "../pages/Inventory/store/inventoryDetail.vue";
import issue from "../pages/Inventory/store/issue.vue";
import measurmentUnit from "../pages/Inventory/store/measurmentUnit.vue";

import workPermission from "../pages/Others/workPermission.vue";
import room from "../pages/Others/Room.vue";
import roomDetail from "../pages/Others/RoomDetail.vue";

//Main infrmation holder in nurse nd OPD
import labratoryOrder from "../pages/nurseOPD/labratoryOrder.vue";

import login from "../pages/layout/login.vue";

import AuthService from "@/network/accountService";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/regsiterPatinet",
    name: "regsiterPatinet",
    component: regsiterPatinet,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/patinets",
    name: "patinets",
    component: patinetList,
    meta: {
      admin: true,
      nurse: true,
      cashier: false,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/patient/detail",
    name: "patientDetail",
    component: patientDetail,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/appointments",
    name: "appointments",
    component: appointments,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/opd",
    name: "opd",
    component: opd,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/pharmacy",
    name: "pharmacy",
    component: pharmacy,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/pharmacy/prescription",
    name: "prescription",
    component: prescription,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "pharmacy/prescription/Detail",
    name: "prescriptionDetail",
    component: prescriptionDetail,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },

  {
    path: "/imagingTest",
    name: "imagingTest",
    component: imagingTest,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/labratoryTest",
    name: "labratoryTest",
    component: labratoryTest,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/imagingReport",
    name: "imagingReport",
    component: imagingReport,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/patient/imagingResult",
    name: "imagingResult",
    component: imagingResult,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/patinet/labratoryResult",
    name: "labratoryResult",
    component: labratoryResult,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/labratoryReport",
    name: "labratoryReport",
    component: labratoryReport,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/departments",
    name: "departments",
    component: departments,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/staff",
    name: "staff",
    component: staff,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/staffDetail",
    name: "staffDetail",
    component: staffDetail,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/staffUpdate",
    name: "staffUpdate",
    component: staffUpdate,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/finance/dashboard",
    name: "financedashboard",
    component: financedashboard,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/payment",
    name: "payment",
    component: payment,
    meta: {
      admin: false,
      nurse: false,
      cashier: true,
      pharmacy: false,
      labratory: false,
      imaging: false,
      labratory_head: false,
      imaging_head: false,
      opd: false,
      store: false,
      reception: false,
    },
  },
  {
    path: "/payment/registerPrepayment",
    name: "registerPrepayment",
    component: registerPrepayment,
    meta: {
      admin: false,
      nurse: false,
      cashier: true,
      pharmacy: false,
      labratory: false,
      imaging: false,
      labratory_head: false,
      imaging_head: false,
      opd: false,
      store: false,
      reception: false,
    },
  },
  {
    path: "/nurse",
    name: "nurse",
    component: nurse,
    meta: {
      admin: false,
      nurse: true,
      cashier: false,
      pharmacy: false,
      labratory: false,
      imaging: false,
      labratory_head: false,
      imaging_head: false,
      opd: true,
      store: false,
      reception: false,
    },
  },
  {
    path: "/nurse/patientDetail",
    name: "nursePatientDetail",
    component: nursePatientDetail,
    meta: {
      admin: false,
      nurse: true,
      cashier: false,
      pharmacy: false,
      labratory: false,
      imaging: false,
      labratory_head: false,
      imaging_head: false,
      opd: true,
      store: false,
      reception: false,
    },
  },
  {
    path: "/registerStaff",
    name: "registerStaff",
    component: registerStaff,
    meta: {
      admin: true,
      nurse: false,
      cashier: false,
      pharmacy: false,
      labratory: false,
      imaging: false,
      labratory_head: false,
      imaging_head: false,
      opd: false,
      store: false,
      reception: false,
    },
  },
  {
    path: "/chat",
    name: "chat",
    component: chat,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/setting/changePassword",
    name: "changePassword",
    component: changePassword,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/setting/hospitalSetting",
    name: "hospitalSetting",
    component: hospitalSetting,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/setting/rolePermission",
    name: "rolePermission",
    component: rolePermission,
    meta: {
      admin: true,
      nurse: false,
      cashier: false,
      pharmacy: false,
      labratory: false,
      imaging: false,
      labratory_head: false,
      imaging_head: false,
      opd: false,
      store: false,
      reception: false,
    },
  },
  {
    path: "/payment/paymentHistory",
    name: "paymentHistory",
    component: paymentHistory,
    meta: {
      admin: true,
      nurse: false,
      cashier: true,
      pharmacy: false,
      labratory: false,
      imaging: false,
      labratory_head: false,
      imaging_head: false,
      opd: false,
      store: false,
      reception: false,
    },
  },
  {
    path: "/measurmentUnit",
    name: "measurmentUnit",
    component: measurmentUnit,
    meta: {
      admin: true,
      nurse: false,
      cashier: false,
      pharmacy: false,
      labratory: false,
      imaging: false,
      labratory_head: false,
      imaging_head: false,
      opd: false,
      store: false,
      reception: false,
    },
  },
  {
    path: "/store/inventory",
    name: "store",
    component: store,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/store/issue",
    name: "issue",
    component: issue,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/store/inventoryDetail",
    name: "inventoryDetail",
    component: inventoryDetail,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/Organization/insurance",
    name: "insurance",
    component: insurance,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "Organization/insuranceDetail",
    name: "insuranceDetail",
    component: insuranceDetail,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/Others/workPermission",
    name: "workPermission",
    component: workPermission,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/Others/room",
    name: "room",
    component: room,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/Others/room/detail",
    name: "roomDetail",
    component: roomDetail,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
  {
    path: "/patient/labratoryOrder",
    name: "labratoryOrder",
    component: labratoryOrder,
    meta: {
      admin: true,
      nurse: true,
      cashier: true,
      pharmacy: true,
      labratory: true,
      imaging: true,
      labratory_head: true,
      imaging_head: true,
      opd: true,
      store: true,
      reception: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const authenticated = AuthService.isAuthenticated();
  const userRole = AuthService.getRole();

  if (to.matched.some((record) => record.meta[userRole])) {
    if (!authenticated && to.name !== "login") {
      next({ name: "login" });
    } else if (authenticated && to.name === "login") {
      next({ name: "dashboard" });
    } else {
      next();
    }
  } else next({ name: "dashboard" });
});

export default router;
