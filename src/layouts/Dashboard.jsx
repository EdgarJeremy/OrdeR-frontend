import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import CustomLoading from 'components/CustomLoading/CustomLoading';

import { style } from "variables/Variables.jsx";

import dashboardRoutes from "routes/dashboard.jsx";
import { Auth } from '../services/request';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_notificationSystem: null,
			user: null,
			loading: true
		};
	}

	componentDidUpdate(e) {
		if (
			window.innerWidth < 993 &&
			e.history.location.pathname !== e.location.pathname &&
			document.documentElement.className.indexOf("nav-open") !== -1
		) {
			document.documentElement.classList.toggle("nav-open");
		}
		// if (e.history.action === "PUSH") {
		// 	document.documentElement.scrollTop = 0;
		// 	document.scrollingElement.scrollTop = 0;
		// 	this.refs.mainPanel.scrollTop = 0;
		// }
	}

	componentDidMount() {
		const { history } = this.props;
		Auth.check().then((res) => {
			this.setState({ loading: false, user: res.data });
		}).catch((err) => {
			history.push('/');
		});
	}

	toggleLoading() {
		this.setState({
			loading: !this.state.loading
		});
	}

	render() {
		const { loading, user } = this.state;
		return loading ? <CustomLoading /> : (
			<div className="wrapper">
				<NotificationSystem ref="notificationSystem" style={style} />
				<Sidebar {...this.props} user={user} />
				<div id="main-panel" className="main-panel" ref="mainPanel">
					<Header {...this.props} user={user} toggleLoading={this.toggleLoading.bind(this)} />
					<Switch>
						{dashboardRoutes(user.type).map((prop, key) => {
							if (prop.redirect)
								return <Redirect from={prop.path} to={prop.to} key={key} />;

							return (
								<Route path={prop.path} exact render={(props) => <prop.render {...props} user={user} toggleLoading={this.toggleLoading.bind(this)} />} key={key} />
							);
						})}
					</Switch>
					<Footer />
				</div>
			</div>
		)
	}
}

export default Dashboard;
