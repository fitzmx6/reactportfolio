import ReactGA from 'react-ga4';

const getMeasurementId = () => {
	return import.meta.env.VITE_GA_MEASUREMENT_ID;
};

// Initialize Google Analytics
export const initGA = () => {
	const measurementId = getMeasurementId();

	if (measurementId) {
		ReactGA.initialize(measurementId);
		if (process.env.NODE_ENV !== 'production') {
			console.log('Google Analytics initialized with ID:', measurementId);
		}
	} else {
		if (process.env.NODE_ENV !== 'production') {
			console.warn('Google Analytics Measurement ID not found. Set VITE_GA_MEASUREMENT_ID in your environment.');
		}
	}
};

// Track page view
export const trackPageView = (path) => {
	if (getMeasurementId()) {
		ReactGA.send({ hitType: 'pageview', page: path });
	}
};

// Track custom events
export const trackEvent = (category, action, label = null, value = null) => {
	if (getMeasurementId()) {
		ReactGA.event({
			category,
			action,
			label,
			value
		});
	}
};
