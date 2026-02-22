import React from 'react';
import './NotFound.css';
import notFoundAnimation from '../../assets/404-animation.gif';

const NotFound = () => {
	return (
		<section className="notfound">
			<div className="notfound__card">
				<img src={notFoundAnimation} alt="404 page not found animation" className="notfound__gif" />
				<h1 className="notfound__title">404 - Page Not Found</h1>
				<p className="notfound__description">The page you are looking for does not exist or may have moved.</p>
				<a href="/" className="btn notfound__btn">
					Go Home
				</a>
			</div>
		</section>
	);
};

export default NotFound;
