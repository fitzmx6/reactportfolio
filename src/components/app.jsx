import React, { useEffect, useMemo } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    useLocation
} from 'react-router-dom';
import portfolioData from '../data/data.json';
import CategoryList from './category-list';
import DetailItem from './detail-item';
import AboutPage from './about-page';
import HomePage from './home-page';
import Footer from './footer';
import NotFound from './not-found';
import Header from './header';
import { initGA, trackPageView } from '../utils/analytics';

// Component to track route changes for Google Analytics
function RouteChangeTracker() {
    const location = useLocation();

    useEffect(() => {
        trackPageView(location.pathname + location.search);
    }, [location]);

    return null;
}

// Component to handle hash scrolling
function HashScrollHandler() {
    const location = useLocation();
    const SCROLL_DELAY_MS = 100; // Wait for DOM to render

    useEffect(() => {
        if (location.hash) {
            setTimeout(() => {
                const element = document.querySelector(location.hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, SCROLL_DELAY_MS);
        }
    }, [location]);

    return null;
}

// All portfolio categories for generating detail routes
const ALL_CATEGORIES = [
    portfolioData.ai,
    portfolioData.dev,
    portfolioData.design,
    portfolioData.photo
];

export function AppContent() {
    const detailRoutes = useMemo(() => {
        return ALL_CATEGORIES.flatMap((category) =>
            category.items.map((item) => (
                <Route
                    key={item.url}
                    path={item.url}
                    element={<DetailItem />}
                />
            ))
        );
    }, []);

    return (
        <div>
            <RouteChangeTracker />
            <HashScrollHandler />
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ai" element={<CategoryList />} />
                <Route path="/dev" element={<CategoryList />} />
                <Route path="/design" element={<CategoryList />} />
                <Route path="/photo" element={<CategoryList />} />
                <Route path="/about" element={<AboutPage />} />

                {/* Detail pages for all portfolio items */}
                {detailRoutes}

                {/* Handle any indexed /web search results */}
                <Route path="/web" element={<Navigate to="/" replace />} />

                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </div>
    );
}

function App() {
    useEffect(() => {
        // Initialize Google Analytics on mount
        initGA();
    }, []);

    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppContent />
        </Router>
    );
}

export default App;
