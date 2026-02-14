import { Testimonials, Sidebar, Services, Resume, Pricing, Portfolio, Home, Contact, Blog, About, TechStack } from './components';
import './App.css';
import ThemeToggle from './components/themeToggle/ThemeToggle';
import FireflyEffect from './animations/FireflyEffect';
import { useTheme } from './context/theme';
import UserInfo from './components/UserInfo';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
	const { isDarkMode } = useTheme();
	return (
		<>
			<FireflyEffect
				backgroundColor={isDarkMode ? "#0a0a0a" : "#f5f5f5"}
				circleCount={500}
				focusRadius={180}
				speedFactor={0.1}
			/>
			<UserInfo />
			<ThemeToggle />
			<Sidebar />
			<main className="main">
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
			</main>
			<Analytics />
			<SpeedInsights />
		</>
	);
}

export default App;
