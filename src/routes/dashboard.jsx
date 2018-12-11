import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/TableList/TableList";
import Typography from "views/Typography/Typography";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";
import Notifications from "views/Notifications/Notifications";
import Upgrade from "views/Upgrade/Upgrade";
import Pick from "../views/Order/Pick";

const dashboardRoutes = [
  {
    path: "/home/picker",
    name: "Pick Order",
    icon: "pe-7s-keypad",
    component: Pick
  },
  // { redirect: true, path: "/login", to: "/", name: "Login" }
];

export default dashboardRoutes;
