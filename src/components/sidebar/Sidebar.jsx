import React, { useState } from 'react';
import './Sidebar.css';

const navLinks = [
	{ id: 1, link: '#home', icon: 'icon-home' },
	{ id: 2, link: '#about', icon: 'icon-user-following' },
	{ id: 3, link: '#services', icon: 'icon-briefcase' },
	{ id: 4, link: '#resume', icon: 'icon-graduation' },
	{ id: 5, link: '#portfolio', icon: 'icon-layers' },
	{ id: 6, link: '#blog', icon: 'icon-note' },
	{ id: 7, link: '#contact', icon: 'icon-bubble' },
];

const Sidebar = () => {
	const [toggle, showMenu] = useState(false);
	return (
		<>
			<aside className={toggle ? 'aside show-menu' : 'aside'} onClick={() => showMenu(!toggle)}>
				<nav className="nav">
					<div className="nav__menu">
						<ul className="nav__list">
							{navLinks.map((link) => (
								<li key={link.id} className="nav__item">
									<a href={link.link} className="nav__link">
										<i className={link.icon}></i>
									</a>
								</li>
							))}
						</ul>
					</div>
				</nav>
			</aside>

			<div className={toggle ? 'nav__toggle nav__toggle-open' : 'nav__toggle'} onClick={() => showMenu(!toggle)}>
				<div className="burger-icon">
					<span className="burger-bar"></span>
					<span className="burger-bar"></span>
					<span className="burger-bar"></span>
				</div>
			</div>
		</>
	);
};

export default Sidebar;

