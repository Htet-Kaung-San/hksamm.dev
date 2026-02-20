import React from 'react';
import './About.css';
import logo from '../../assets/about-me.gif';

const ABOUT_RING_DASH_COUNT = 2.5;
const ABOUT_RING_DASH_RATIO = 0.7;
const ABOUT_RING_ROTATION_SECONDS = 20;
const ABOUT_RING_STROKE_WIDTH = 1;
const ABOUT_RING_OUTSET_PX = 14;

const skillsList = [
	{
		id: 1,
		name: 'Development',
		class: 'development',
		number: '90%',
	},
	{ id: 2, name: 'UI/UX design', class: 'ui__design', number: '70%' },
	{ id: 3, name: 'Wordpress', class: 'wordpress', number: '80%' },
];

const About = () => {
	const dashSegment = 100 / ABOUT_RING_DASH_COUNT;
	const ringDashArray = `${dashSegment * ABOUT_RING_DASH_RATIO} ${dashSegment * (1 - ABOUT_RING_DASH_RATIO)}`;

	return (
		<section className="about container section" id="about">
			<h2 className="section__title">About Me</h2>

			<div className="about__container grid">
				<div className="about__image__Wrapper">
					<div className="about__img-ring-wrapper">
						<svg
							className="about__img-ring"
							viewBox="0 0 100 100"
							aria-hidden="true"
							style={{
								'--about-ring-outset': `${ABOUT_RING_OUTSET_PX}px`,
								'--about-ring-rotation-duration': `${ABOUT_RING_ROTATION_SECONDS}s`,
							}}
						>
							<circle className="about__img-ring-circle" cx="50" cy="50" r="48.5" pathLength="100" strokeWidth={ABOUT_RING_STROKE_WIDTH} style={{ strokeDasharray: ringDashArray }} />
						</svg>
						<img src={logo} alt="" className="about__img" />
					</div>
					<a href="https://raw.githubusercontent.com/foverokavindz/fovero-folio/main/public/mycv.pdf" download="resume" className="btn about__cv-btn">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '15px' }}>
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
							<polyline points="7 10 12 15 17 10" />
							<line x1="12" y1="15" x2="12" y2="3" />
						</svg>
						Download CV
					</a>
				</div>

				<div className="about__data grid">
					<div className="about__info">
						<p className="about__description">Hey! I'm Sam. I don't just write code; I design & build solutions that bridge the gap between complex logic and great design. My time in the industry has taught me that the best software isn't just 'fast'—it’s scalable and reliable.</p>

						<p className="about__description">My goal is always the same: creating software that feels effortless for the user but is rock-solid on the backend, and I love every bit of the challenge. I'm a firm believer in continuous learning and always keeping a 'human-first' mindset in every line of code I write.</p>

					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
