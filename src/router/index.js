import Vue from "vue";
import VueRouter from "vue-router";

import dashboard from "../pages/Dashboard/index.vue";

import regsiterPatinet from "../pages/patients/regsiter.vue";
import patinetList from "../pages/patients/patinetList.vue";
import patientDetail from "../pages/patients/patientDetail.vue";
import appointments from "../pages/Appointment/index.vue";
import opd from "../pages/patients/opd.vue";
import pharmacy from "../pages/Inventory/Pharmacy/pharmacy.vue";
import pharmacyStore from "../pages/Inventory/Pharmacy/pharmacyStore.vue";
import dispensary from "../pages/Inventory/Pharmacy/Dispensary.vue";
import dispensaryDetail from "../pages/Inventory/Pharmacy/DispensaryDetail.vue";
import measurmentUnitPharamcy from "../pages/Inventory/Pharmacy/measurmentUnitPharamcy.vue";

import prescription from "../pages/Inventory/Pharmacy/prescription.vue";
import prescriptionDetail from "../pages/Inventory/Pharmacy/prescriptionDetail.vue";

import laboratoryTest from "../pages/MedicalService/labratory/labratoryTest.vue";
import laboratoryReport from "../pages/MedicalService/labratory/labratoryReport.vue";
import laboratoryResult from "../pages/MedicalService/labratory/labratoryResult.vue";

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
import annualPlan from "../pages/Others/annualPlan.vue";
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
    meta: {},
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    meta: {},
  },
  {
    path: "/regsiterPatinet",
    name: "regsiterPatinet",
    component: regsiterPatinet,
    meta: {},
  },
  {
    path: "/patinets",
    name: "patinets",
    component: patinetList,
    meta: {},
  },
  {
    path: "/patient/detail",
    name: "patientDetail",
    component: patientDetail,
    meta: {},
  },
  {
    path: "/appointments",
    name: "appointments",
    component: appointments,
    meta: {},
  },
  {
    path: "/opd",
    name: "opd",
    component: opd,
    meta: {},
  },
  {
    path: "/dispensary",
    name: "dispensary",
    component: dispensary,
    meta: {},
  },
  {
    path: "/dispensaryDetail",
    name: "dispensaryDetail",
    component: dispensaryDetail,
    meta: {},
  },
  {
    path: "/pharmacy",
    name: "pharmacy",
    component: pharmacy,
    meta: {},
  },
  {
    path: "/pharmacy_store",
    name: "pharmacy_store",
    component: pharmacyStore,
    meta: {},
  },

  {
    path: "/pharmacy/measurmentUnitP",
    name: "measurmentUnitPharamcy",
    component: measurmentUnitPharamcy,
    meta: {},
  },
  {
    path: "/pharmacy/prescription",
    name: "prescription",
    component: prescription,
    meta: {},
  },
  {
    path: "pharmacy/prescription/Detail",
    name: "prescriptionDetail",
    component: prescriptionDetail,
    meta: {},
  },

  {
    path: "/imagingTest",
    name: "imagingTest",
    component: imagingTest,
    meta: {},
  },
  {
    path: "/laboratoryTest",
    name: "laboratoryTest",
    component: laboratoryTest,
    meta: {},
  },
  {
    path: "/imagingReport",
    name: "imagingReport",
    component: imagingReport,
    meta: {},
  },
  {
    path: "/patient/imagingResult",
    name: "imagingResult",
    component: imagingResult,
    meta: {},
  },
  {
    path: "/patinet/laboratoryResult",
    name: "laboratoryResult",
    component: laboratoryResult,
    meta: {},
  },
  {
    path: "/laboratoryReport",
    name: "laboratoryReport",
    component: laboratoryReport,
    meta: {},
  },
  {
    path: "/departments",
    name: "departments",
    component: departments,
    meta: {},
  },
  {
    path: "/staff",
    name: "staff",
    component: staff,
    meta: {},
  },
  {
    path: "/staffDetail",
    name: "staffDetail",
    component: staffDetail,
    meta: {},
  },
  {
    path: "/staffUpdate",
    name: "staffUpdate",
    component: staffUpdate,
    meta: {},
  },
  {
    path: "/payment",
    name: "payment",
    component: payment,
    meta: {},
  },
  {
    path: "/payment/registerPrepayment",
    name: "registerPrepayment",
    component: registerPrepayment,
    meta: {},
  },
  {
    path: "/nurse",
    name: "nurse",
    component: nurse,
    meta: {},
  },
  {
    path: "/nurse/patientDetail",
    name: "nursePatientDetail",
    component: nursePatientDetail,
    meta: {},
  },
  {
    path: "/registerStaff",
    name: "registerStaff",
    component: registerStaff,
    meta: {},
  },
  {
    path: "/chat",
    name: "chat",
    component: chat,
    meta: {},
  },
  {
    path: "/setting/changePassword",
    name: "changePassword",
    component: changePassword,
    meta: {},
  },
  {
    path: "/setting/hospitalSetting",
    name: "hospitalSetting",
    component: hospitalSetting,
    meta: {},
  },
  {
    path: "/setting/rolePermission",
    name: "rolePermission",
    component: rolePermission,
    meta: {},
  },
  {
    path: "/payment/paymentHistory",
    name: "paymentHistory",
    component: paymentHistory,
    meta: {},
  },
  {
    path: "/measurmentUnit",
    name: "measurmentUnit",
    component: measurmentUnit,
    meta: {},
  },
  {
    path: "/store/inventory",
    name: "store",
    component: store,
    meta: {},
  },
  {
    path: "/store/issue",
    name: "issue",
    component: issue,
    meta: {},
  },
  {
    path: "/store/inventoryDetail",
    name: "inventoryDetail",
    component: inventoryDetail,
    meta: {},
  },
  {
    path: "/Organization/insurance",
    name: "insurance",
    component: insurance,
    meta: {},
  },
  {
    path: "Organization/insuranceDetail",
    name: "insuranceDetail",
    component: insuranceDetail,
    meta: {},
  },
  {
    path: "/Others/annualPlan",
    name: "annualPlan",
    component: annualPlan,
    meta: {},
  },
  {
    path: "/Others/workPermission",
    name: "workPermission",
    component: workPermission,
    meta: {},
  },
  {
    path: "/Others/room",
    name: "room",
    component: room,
    meta: {},
  },
  {
    path: "/Others/room/detail",
    name: "roomDetail",
    component: roomDetail,
    meta: {},
  },
  {
    path: "/patient/labratoryOrder",
    name: "labratoryOrder",
    component: labratoryOrder,
    meta: {},
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const authenticated = AuthService.isAuthenticated();

  if (!authenticated && to.name !== "login") {
    next({ name: "login" });
  } else if (authenticated && to.name === "login") {
    next({ name: "dashboard" });
  } else {
    next();
  }

  // // const userRole = AuthService.getRole();
  // // if (to.matched.some((record) => record.meta[userRole])) {
  // if (!authenticated && to.name !== "login") {
  //   next({ name: "login" });
  // } else if (authenticated && to.name === "login") {
  //   next({ name: "dashboard" });
  // } else {
  //   next();
  // }
  // // } else next({ name: "dashboard" });
});

export default router;
