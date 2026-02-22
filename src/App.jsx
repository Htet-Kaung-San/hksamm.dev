import { Sidebar, Services, Resume, Portfolio, Home, Contact, About, TechStack, NotFound } from './components';
import './App.css';
import UserInfo from './components/UserInfo';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import FireflyEffect from '../firefly-effect';

function App() {
	const currentYear = new Date().getFullYear();
	const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
	const normalizedPath = pathname.replace(/\/+$/, '') || '/';
	const isNotFoundRoute = normalizedPath !== '/';

	return (
		<div className="app-shell">
			<FireflyEffect
				speedFactor={1}
				minRadius={0.1}
				maxRadius={3}
				focusRadius={140}
				glowIntensity={1}
				maxOpacity={1}
				minOpacity={0}
				backgroundColor="#000000"
				color1="#ffffff"
				color2="#ffffff"
				color3="#ffffff"
				color4="#ffffff"
			/>
			{!isNotFoundRoute && <UserInfo />}
			{!isNotFoundRoute && <Sidebar />}
			<main className={`main ${isNotFoundRoute ? 'main--notfound' : ''}`}>
				{isNotFoundRoute ? (
					<NotFound />
				) : (
					<>
						<Home />
						<About />
						<Services />
						<TechStack />
						<Resume />
						<Portfolio />
						{/* <Pricing /> */}
						<Contact />
					</>
				)}
			</main>
			{!isNotFoundRoute && (
				<footer className="site-footer">
					<div className="container site-footer__inner">
						<p>&copy; {currentYear} Htet Kaung San. All rights reserved.</p>
					</div>
				</footer>
			)}
			<Analytics />
			<SpeedInsights />
		</div>
	);
}

export default App;
