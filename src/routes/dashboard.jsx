import Pick from "../views/Order/Pick";
import User from "../views/Admin/User";
import Menu from "../views/Admin/Menu";

const orderRoutes = [
	{
		path: "/home",
		name: "Pick Order",
		icon: "pe-7s-keypad",
		render: Pick
	},
	{ redirect: true, path: "/", to: "/", name: "redirect" }
];

const adminRoutes = [
	{
		path: '/home',
		name: 'Menu',
		icon: 'pe-7s-menu',
		render: Menu
	},
	{
		path: '/home/user',
		name: 'Pengguna',
		icon: 'pe-7s-users',
		render: User
	}
];

const foodRoutes = [

];

const beverageRoutes = [

];

const cashierRoutes = [

];

export default (level) => {
	switch (level) {
		case 'admin':
			return adminRoutes;
		case 'order':
			return orderRoutes;
		case 'food':
			return foodRoutes;
		case 'beverage':
			return beverageRoutes;
		default:
			return cashierRoutes;
	}
}
