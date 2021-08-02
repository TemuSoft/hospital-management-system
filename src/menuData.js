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
        title: "Payment",
        route: "payment",
        icon: "payment",
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
      {
        title: "Issue",
        route: "issue",
        icon: "issue",
        allowedRoles: ["admin", "cutting-department"],
      },
    ],
  },
  {
    title: "Medical Services",
    allowedRoles: ["admin", "cutting-department"],
    links: [
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
    title: "Setting",
    allowedRoles: ["admin", "cutting-department"],
    links: [
      {
        title: "Hospital Setting",
        allowedRoles: ["admin", "cutting-department"],
        route: "hospitalSetting",
        icon: "hospitalSetting",
      },
      {
        title: "Role and Permission",
        allowedRoles: ["admin", "cutting-department"],
        route: "rolePermission",
        icon: "rolePermission",
      },
      {
        title: "Change Password",
        allowedRoles: ["admin", "cutting-department"],
        route: "changePassword",
        icon: "changePassword",
      },
      {
        title: "Work Permission",
        allowedRoles: ["admin", "cutting-department"],
        route: "workPermission",
        icon: "workPermission",
      },
      {
        title: "Annual Report",
        allowedRoles: ["admin", "cutting-department"],
        route: "annualReport",
        icon: "annualReport",
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
    title: "Chat",
    allowedRoles: ["admin", "cutting-department"],
    route: "chat",
    icon: "chat",
  },
];
export { menusData };
