import React from 'react';
import './Home.css';
import Me from '../../assets/animation-gif-colored.gif';
import HeaderSocials from './HeaderSocials';
import Shapes from './Shapes';
import TextType from '../../animations/textType/TextType';

const RING_DASH_COUNT = 3;
const RING_DASH_RATIO = 0.9;
const RING_ROTATION_SECONDS = 20;
const RING_STROKE_WIDTH = 1;
const RING_OUTSET_PX = 20;

const Home = () => {
	const dashSegment = 100 / RING_DASH_COUNT;
	const ringDashArray = `${dashSegment * RING_DASH_RATIO} ${dashSegment * (1 - RING_DASH_RATIO)}`;

	return (
		<section className="home container" id="home">
			<div className="home__content">
				<div className="intro">
					<h1 className="home__name">Htet Kaung San</h1>
					<span className="home__education">Full-Stack Engineer & Designer</span>
					<div className="memphis-bg-texttype">
						<TextType text={['Crafting Code & Shaping Solution', 'Code Artist + Problem Solver', 'Simplifying Complexity + Enhancing Experience']} typingSpeed={75} pauseDuration={2000} showCursor={true} cursorCharacter="●" />
					</div>
					<HeaderSocials />
					<a href="#contact" className="btn home__talk-btn">
						Let's Talk
					</a>
				</div>
				<div className="home__media">
					<div className="home__img-wrapper">
						<svg
							className="home__img-ring"
							viewBox="0 0 100 100"
							aria-hidden="true"
							style={{
								'--ring-outset': `${RING_OUTSET_PX}px`,
								'--ring-rotation-duration': `${RING_ROTATION_SECONDS}s`,
							}}
						>
							<circle className="home__img-ring-circle" cx="50" cy="50" r="48.5" pathLength="100" strokeWidth={RING_STROKE_WIDTH} style={{ strokeDasharray: ringDashArray }} />
						</svg>
						<img src={Me} alt="" className="home__img" />
						<div className="home__img-decoration"></div>
					</div>
				</div>
			</div>
			<Shapes />
		</section>
	);
};

export default Home;
