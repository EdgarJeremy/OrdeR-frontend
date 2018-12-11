import Dashboard from "layouts/Dashboard.jsx";
import Login from '../layouts/Login';

var indexRoutes = [{ path: '/login', name: 'Login', component: Login },{ path: "/home", name: "Home", component: Dashboard }];

console.log(indexRoutes);

export default indexRoutes;
