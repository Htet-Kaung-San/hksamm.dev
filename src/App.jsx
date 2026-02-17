import { Testimonials, Sidebar, Services, Resume, Pricing, Portfolio, Home, Contact, Blog, About, TechStack } from './components';
import './App.css';
import ThemeToggle from './components/themeToggle/ThemeToggle';
import { useTheme } from './context/theme';
import UserInfo from './components/UserInfo';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import FireflyEffect from '../firefly-effect';

function App() {
	const { isDarkMode } = useTheme();
	return (
		<div className="app-shell">
			<FireflyEffect
				circleCount={1200}
				speedFactor={0.55}
				minRadius={0.8}
				maxRadius={8}
				focusRadius={140}
				glowIntensity={18}
				maxOpacity={0.8}
				minOpacity={0.03}
				backgroundColor="#000000"
				color1={isDarkMode ? '#fef9c3' : '#ffd166'}
				color2={isDarkMode ? '#fde047' : '#ffb703'}
				color3={isDarkMode ? '#facc15' : '#ffca3a'}
				color4={isDarkMode ? '#fef08a' : '#ffe066'}
			/>
			<UserInfo />
			<ThemeToggle />
			<Sidebar />
			<main className="main">
				<>
					<Home />
					<About />
					<Services />
					<TechStack />
					<Resume />
					<Portfolio />
					{/* <Pricing /> */}
					<Blog />
					<Testimonials />
					<Contact />
				</>
			</main>
			<Analytics />
			<SpeedInsights />
		</div>
	);
}

export default App;
