import React from 'react';

// About Page Component
export default class AboutPage extends React.Component {
    render() {
        return (
            <div id="sub-content" className="about">
                <div className="grid-d-12">
                    <h2>About</h2>

                    <p>
                        Cory Fitzpatrick is a graduate of the University of Massachusetts Dartmouth where he earned a BFA in Graphic Design. He is currently working in the Boston area as a web developer at Fitbit. Cory is proficient in Javascript, Mithril, HTML5, CSS3, SCSS and the Adobe Suite. He continues to expand his range of skills in many other technologies. During the past few years Cory has become involved in hiring, mentoring and determining team processes. Cory's workflow currently includes Agile, JIRA, Jenkins and Git. Other interests include marketing, typography, book design and photography.
                    </p>

                    <p>This site was built with <a href="https://github.com/facebook/create-react-app" target="_blank" rel="noopener noreferrer">Create React App</a>, <a href="https://reactjs.org/docs/react-dom.html" target="_blank" rel="noopener noreferrer">ReactDOM</a>, <a href="https://reacttraining.com/react-router/web/guides/philosophy" target="_blank" rel="noopener noreferrer">React Router</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" target="_blank" rel="noopener noreferrer">CSS3</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5" target="_blank" rel="noopener noreferrer">HTML5</a> and <a href="http://www.rwdgrid.com/" target="_blank" rel="noopener noreferrer">RWDGRID</a>. It is deployed by and hosted on Heroku.</p>

                    <a href="https://github.com/fitzmx6/reactportfolio" target="_blank" rel="noopener noreferrer">Check Out This Sites Code on Github</a>

                    <a href="https://www.linkedin.com/in/coryfitzpatrick" target="_blank" rel="noopener noreferrer">Cory’s LinkedIn Profile</a>
                </div>
            </div>
        );
    }
}
