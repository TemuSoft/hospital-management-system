import Vue from "vue";
import VueRouter from "vue-router";

import finacedashboard from "../pages/Dashboard/index.vue";

import regsiterPatinet from "../pages/patients/regsiter.vue";
import patinetList from "../pages/patients/patinetList.vue";
import appointments from "../pages/Appointment/index.vue";
import opd from "../pages/patients/opd.vue";
import pharmacy from "../pages/Inventory/Pharmacy/pharmacy.vue";
import medicine from "../pages/Inventory/Pharmacy/medicine.vue";
import servicesCategory from "../pages/MedicalService/servicesCategory.vue";
import medicalServices from "../pages/MedicalService/medicalServices.vue";
import departments from "../pages/Organizatioins/departments.vue";
import servicesBill from "../pages/Finance/servicesBill.vue";
import bloodBank from "../pages/Inventory/BloodBank/bloodBank.vue";
import staff from "../pages/Organizatioins/staffs/index.vue";
import casher from "../pages/casher/index.vue";
import nurse from "../pages/nurse/index.vue";
import labratory from "../pages/labratory/laboratoryHead/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/regsiterPatinet",
    name: "regsiterPatinet",
    component: regsiterPatinet,
  },
  { path: "/patinets", name: "patinets", component: patinetList },
  { path: "/appointments", name: "appointments", component: appointments },
  { path: "/opd", name: "opd", component: opd },
  { path: "/pharmacy", name: "pharmacy", component: pharmacy },
  { path: "/medicine", name: "medicine", component: medicine },
  {
    path: "/servicesCategory",
    name: "servicesCategory",
    component: servicesCategory,
  },
  {
    path: "/medicalServices",
    name: "medicalServices",
    component: medicalServices,
  },
  {
    path: "/departments",
    name: "departments",
    component: departments,
  },
  {
    path: "/servicesBill",
    name: "servicesBill",
    component: servicesBill,
  },
  {
    path: "/bloodBank",
    name: "bloodBank",
    component: bloodBank,
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
    path: "/casher",
    name: "casher",
    component: casher,
  },
  {
    path: "/nurse",
    name: "nurse",
    component: nurse,
  },
  {
    path: "/labratory",
    name: "labratory",
    component: labratory,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
