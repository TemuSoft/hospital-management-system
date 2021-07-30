const menusData = [
  {
    title: "Dashboard",
    allowedRoles: ["admin", "cutting-department"],
    route: "dashboard",
  },
  {
    title: "Patients",
    allowedRoles: ["admin", "cutting-department"],
    links: [
      {
        title: "Patients",
        route: "patinets",
        icon: "patinets",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Casher",
        route: "casher",
        icon: "casher",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Nurse",
        route: "nurse",
        icon: "nurse",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "OPD",
        route: "opd",
        icon: "opd",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Appointments",
        route: "appointments",
        icon: "appointments",
        allowedRoles: ["admin", "cutting-department"],
      },
    ],
  },
  {
    title: "Inventory",
    allowedRoles: ["admin", "cutting-department"],
    links: [
      {
        title: "Pharmacy",
        route: "pharmacy",
        icon: "pharmacy",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Medicine",
        route: "medicine",
        icon: "medicine",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Store",
        route: "store",
        icon: "store",
        allowedRoles: ["admin", "cutting-department"],
      },
    ],
  },
  {
    title: "Medical Services",
    allowedRoles: ["admin", "cutting-department"],
    links: [
      {
        title: "Labratory",
        route: "labratory",
        icon: "labratory",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Labratory Admin",
        route: "labratoryAdmin",
        icon: "labratoryAdmin",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Imaging",
        route: "imaging",
        icon: "imaging",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Imaging Admin",
        route: "imagingAdmin",
        icon: "imagingAdmin",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Medical Services",
        route: "medicalServices",
        icon: "medicalServices",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Services Category",
        route: "servicesCategory",
        icon: "servicesCategory",
        allowedRoles: ["admin", "cutting-department"],
      },
    ],
  },
  {
    title: "Organization",
    allowedRoles: ["admin", "cutting-department"],
    links: [
      {
        title: "Staff",
        route: "staff",
        icon: "staff",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Departments",
        route: "departments",
        icon: "departments",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Insurance",
        route: "insurance",
        icon: "insurance",
        allowedRoles: ["admin", "cutting-department"],
      },
    ],
  },
  {
    title: "Finance",
    allowedRoles: ["admin", "cutting-department"],
    links: [
      {
        title: "Dashboard",
        route: "finacedashboard",
        icon: "dashboard",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Services Bill's",
        route: "servicesBill",
        icon: "servicesBill",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Transactions",
        route: "transactions",
        icon: "transactions",
        allowedRoles: ["admin", "cutting-department"],
      },
      {
        title: "Financial Reports",
        route: "financialReports",
        icon: "financialReports",
        allowedRoles: ["admin", "cutting-department"],
      },
    ],
  },
  {
    title: "Reports",
    allowedRoles: ["admin", "cutting-department"],
    route: "reports",
    icon: "reports",
  },
  {
    title: "Setting",
    allowedRoles: ["admin", "cutting-department"],
    route: "setting",
    icon: "setting",
  },
];
export { menusData };
