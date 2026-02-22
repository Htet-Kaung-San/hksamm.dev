import { useEffect, useRef, useState } from 'react';
import { Sidebar, Services, Resume, Portfolio, Home, Contact, About, TechStack, NotFound } from './components';
import './App.css';
import UserInfo from './components/UserInfo';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import FireflyEffect from '../firefly-effect';

const LANGUAGE_ICON =
	'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdsb2JlLWljb24gbHVjaWRlLWdsb2JlIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik0xMiAyYTE0LjUgMTQuNSAwIDAgMCAwIDIwIDE0LjUgMTQuNSAwIDAgMCAwLTIwIi8+PHBhdGggZD0iTTIgMTJoMjAiLz48L3N2Zz4=';
const LANGUAGE_OPTIONS = [
	{
		value: 'en',
		label: 'English',
		flagSrc: 'https://img.icons8.com/?size=48&id=aRiu1GGi6Aoe&format=png',
		flagAlt: 'US flag',
	},
	{
		value: 'ko',
		label: '한국어',
		flagSrc: 'https://img.icons8.com/?size=48&id=-_RS8ho736Fs&format=png',
		flagAlt: 'South Korea flag',
	},
];

function App() {
	const currentYear = new Date().getFullYear();
	const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
	const normalizedPath = pathname.replace(/\/+$/, '') || '/';
	const isNotFoundRoute = normalizedPath !== '/';
	const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState('en');
	const languageMenuRef = useRef(null);

	useEffect(() => {
		if (!isLanguageMenuOpen) return undefined;

		const closeOnOutsideClick = (event) => {
			if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
				setIsLanguageMenuOpen(false);
			}
		};

		const closeOnEscape = (event) => {
			if (event.key === 'Escape') {
				setIsLanguageMenuOpen(false);
			}
		};

		document.addEventListener('pointerdown', closeOnOutsideClick);
		document.addEventListener('keydown', closeOnEscape);

		return () => {
			document.removeEventListener('pointerdown', closeOnOutsideClick);
			document.removeEventListener('keydown', closeOnEscape);
		};
	}, [isLanguageMenuOpen]);

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
				<div className="language-switcher" ref={languageMenuRef}>
					<button
						type="button"
						className={`language-badge ${isLanguageMenuOpen ? 'is-open' : ''}`}
						aria-label="Language"
						title="Language"
						aria-haspopup="menu"
						aria-expanded={isLanguageMenuOpen}
						onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
					>
						<img src={LANGUAGE_ICON} alt="" className="language-badge__icon" aria-hidden="true" />
					</button>
					{isLanguageMenuOpen && (
						<div className="language-dropdown" role="menu" aria-label="Language options">
							{LANGUAGE_OPTIONS.map((option) => (
								<button
									key={option.value}
									type="button"
									role="menuitemradio"
									aria-checked={selectedLanguage === option.value}
									className={`language-dropdown__item ${selectedLanguage === option.value ? 'is-active' : ''}`}
									onClick={() => {
										setSelectedLanguage(option.value);
										setIsLanguageMenuOpen(false);
									}}
								>
									<span className="language-dropdown__item-inner">
										<img src={option.flagSrc} alt={option.flagAlt} className="language-dropdown__flag" loading="lazy" />
										<span>{option.label}</span>
									</span>
								</button>
							))}
						</div>
					)}
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
