import Vue from "vue";
import VueRouter from "vue-router";

import finacedashboard from "../pages/Dashboard/index.vue";

import regsiterPatinet from "../pages/patients/regsiter.vue";
import patinetList from "../pages/patients/patinetList.vue";
import patientDetail from "../pages/patients/patientDetail.vue";
import appointments from "../pages/Appointment/index.vue";
import opd from "../pages/patients/opd.vue";
import pharmacy from "../pages/Inventory/Pharmacy/pharmacy.vue";
import medicine from "../pages/Inventory/Pharmacy/medicine.vue";
import labratoryTest from "../pages/MedicalService/labratory/labratoryTest.vue";
import labratoryReport from "../pages/MedicalService/labratory/labratoryReport.vue";
import imagingTest from "../pages/MedicalService/imaging/imagingTest.vue";
import imagingReport from "../pages/MedicalService/imaging/imagingReport.vue";
import departments from "../pages/Organization/departments.vue";
import insurance from "../pages/Organization/insurance.vue";

import staff from "../pages/Organization/staffs/index.vue";
import payment from "../pages/casher/index.vue";
import paymentHistory from "../pages/casher/paymentHistory.vue";
import registerPrepayment from "../pages/casher/registerPrepayment.vue";
import nurse from "../pages/nurse/index.vue";
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

Vue.use(VueRouter);

const routes = [
  {
    path: "/regsiterPatinet",
    name: "regsiterPatinet",
    component: regsiterPatinet,
  },
  { path: "/patinets", name: "patinets", component: patinetList },
  { path: "/patient/detail", name: "patientDetail", component: patientDetail },
  { path: "/appointments", name: "appointments", component: appointments },
  { path: "/opd", name: "opd", component: opd },
  { path: "/pharmacy", name: "pharmacy", component: pharmacy },
  { path: "/medicine", name: "medicine", component: medicine },
  {
    path: "/imagingTest",
    name: "imagingTest",
    component: imagingTest,
  },
  {
    path: "/labratoryTest",
    name: "labratoryTest",
    component: labratoryTest,
  },
  {
    path: "/imagingReport",
    name: "imagingReport",
    component: imagingReport,
  },
  {
    path: "/labratoryReport",
    name: "labratoryReport",
    component: labratoryReport,
  },
  {
    path: "/departments",
    name: "departments",
    component: departments,
  },
  {
    path: "/staff",
    name: "staff",
    component: staff,
  },
  {
    path: "/finance/dashboard",
    name: "finacedashboard",
    component: finacedashboard,
  },
  {
    path: "/payment",
    name: "payment",
    component: payment,
  },
  {
    path: "/payment/registerPrepayment",
    name: "registerPrepayment",
    component: registerPrepayment,
  },
  {
    path: "/nurse",
    name: "nurse",
    component: nurse,
  },
  {
    path: "/registerStaff",
    name: "registerStaff",
    component: registerStaff,
  },
  {
    path: "/chat",
    name: "chat",
    component: chat,
  },
  {
    path: "/setting/changePassword",
    name: "changePassword",
    component: changePassword,
  },
  {
    path: "/setting/hospitalSetting",
    name: "hospitalSetting",
    component: hospitalSetting,
  },
  {
    path: "/setting/rolePermission",
    name: "rolePermission",
    component: rolePermission,
  },
  {
    path: "/payment/paymentHistory",
    name: "paymentHistory",
    component: paymentHistory,
  },
  {
    path: "/measurmentUnit",
    name: "measurmentUnit",
    component: measurmentUnit,
  },
  {
    path: "/store/inventory",
    name: "store",
    component: store,
  },
  {
    path: "/store/issue",
    name: "issue",
    component: issue,
  },
  {
    path: "/store/inventoryDetail",
    name: "inventoryDetail",
    component: inventoryDetail,
  },
  {
    path: "/Organization/insurance",
    name: "insurance",
    component: insurance,
  },
  {
    path: "/Others/workPermission",
    name: "workPermission",
    component: workPermission,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
