import React from 'react';

// About Page Component
export default class AboutPage extends React.Component {
    render() {
        return (
            <div id="sub-content" className="about">
                <div className="grid-d-12">
                    <h2>About</h2>

                    <p>
                        Cory Fitzpatrick is a Software Engineer with 6+ years of experience in building apis, websites, javascript components and web assets. Cory is currently employed at Google + Fitbit in the Boston area. He is proficient in Java, Ember.js, HTML5, Javascript, CSS3, SCSS, Adobe Suite, and he continues to expand his range of skills.
                    </p>

                    <p>This site was built with <a href="https://github.com/facebook/create-react-app" target="_blank" rel="noopener noreferrer">Create React App</a>, <a href="https://reactjs.org/docs/react-dom.html" target="_blank" rel="noopener noreferrer">ReactDOM</a>, <a href="https://reacttraining.com/react-router/web/guides/philosophy" target="_blank" rel="noopener noreferrer">React Router</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" target="_blank" rel="noopener noreferrer">CSS3</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5" target="_blank" rel="noopener noreferrer">HTML5</a> and <a href="http://www.rwdgrid.com/" target="_blank" rel="noopener noreferrer">RWDGRID</a>. It is deployed by and hosted on Heroku.</p>

                    <a href="https://github.com/fitzmx6/reactportfolio" target="_blank" rel="noopener noreferrer">Check Out This Sites Code on Github</a>

                    <a href="https://www.linkedin.com/in/coryfitzpatrick" target="_blank" rel="noopener noreferrer">Cory’s LinkedIn Profile</a>
                </div>
            </div>
        );
    }
}
