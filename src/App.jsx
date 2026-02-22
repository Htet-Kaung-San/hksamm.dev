import { Sidebar, Services, Resume, Portfolio, Home, Contact, About, TechStack, NotFound } from './components';
import './App.css';
import UserInfo from './components/UserInfo';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import FireflyEffect from '../firefly-effect';

const LANGUAGE_ICON =
	'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxhbmd1YWdlcy1pY29uIGx1Y2lkZS1sYW5ndWFnZXMiPjxwYXRoIGQ9Im01IDggNiA2Ii8+PHBhdGggZD0ibTQgMTQgNi02IDItMyIvPjxwYXRoIGQ9Ik0yIDVoMTIiLz48cGF0aCBkPSJNNyAyaDEiLz48cGF0aCBkPSJtMjIgMjItNS0xMC01IDEwIi8+PHBhdGggZD0iTTE0IDE4aDYiLz48L3N2Zz4=';

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
			{!isNotFoundRoute && (
				<div className="language-badge" aria-label="Language" title="Language">
					<img src={LANGUAGE_ICON} alt="" className="language-badge__icon" aria-hidden="true" />
				</div>
			)}
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
