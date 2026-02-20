import { Sidebar, Services, Resume, Portfolio, Home, Contact, About, TechStack } from './components';
import './App.css';
import UserInfo from './components/UserInfo';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import FireflyEffect from '../firefly-effect';

function App() {
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
			<UserInfo />
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
					<Contact />
				</>
			</main>
			<Analytics />
			<SpeedInsights />
		</div>
	);
}

export default App;
