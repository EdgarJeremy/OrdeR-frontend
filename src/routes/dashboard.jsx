import Pick from "../views/Order/Pick";
import User from "../views/Admin/User";
import Menu from "../views/Admin/Menu";
import Monitor from "../views/Order/Monitor";

const orderRoutes = [
	{
		path: '/home',
		name: 'Order Baru',
		icon: 'pe-7s-keypad',
		render: Pick
	},
	{
		path: '/home/monitor',
		name: 'Pantau Order',
		icon: 'pe-7s-note2',
		render: Monitor
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

orderRoutes.push({ redirect: true, path: "/", to: "/", name: "redirect" });
adminRoutes.push({ redirect: true, path: "/", to: "/", name: "redirect" });
foodRoutes.push({ redirect: true, path: "/", to: "/", name: "redirect" });
beverageRoutes.push({ redirect: true, path: "/", to: "/", name: "redirect" });
cashierRoutes.push({ redirect: true, path: "/", to: "/", name: "redirect" });

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
