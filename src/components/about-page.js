import React from 'react';

// About Page Component
export default class AboutPage extends React.Component {
    render() {
        return (
            <div id="sub-content" className="about">
                <div className="grid-d-12">
                    <h2>About</h2>

                    <p>
                        Cory Fitzpatrick is currently working as a Software Tech Lead in the Boston area, managing multiple teams and providing technical guidance. While his recent roles have involved backend API work in Java, his current position focuses primarily on team leadership and ensuring technical alignment. Cory is deeply committed to improving processes, helping his team become more efficient, and expanding their technical knowledge. He also values cross-team collaboration and building strong relationships to enhance team synergy. Cory is passionate about mentoring and fostering a culture of continuous learning within his team. His workflow includes Agile, JIRA, Jenkins, and Git, and he is always looking for ways to optimize team performance. Outside of work, Cory has interests in marketing, typography, book design, and photography.
                    </p>

                    <p>This site was built with <a href="https://github.com/facebook/create-react-app" target="_blank" rel="noopener noreferrer">Create React App</a>, <a href="https://reactjs.org/docs/react-dom.html" target="_blank" rel="noopener noreferrer">ReactDOM</a>, <a href="https://reacttraining.com/react-router/web/guides/philosophy" target="_blank" rel="noopener noreferrer">React Router</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3" target="_blank" rel="noopener noreferrer">CSS3</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5" target="_blank" rel="noopener noreferrer">HTML5</a> and <a href="http://www.rwdgrid.com/" target="_blank" rel="noopener noreferrer">RWDGRID</a>. It is deployed by and hosted on Heroku.</p>

                    <a href="https://github.com/fitzmx6/reactportfolio" target="_blank" rel="noopener noreferrer">Check Out This Sites Code on Github</a>

                    <a href="https://www.linkedin.com/in/coryfitzpatrick" target="_blank" rel="noopener noreferrer">Cory’s LinkedIn Profile</a>
                </div>
            </div>
        );
    }
}
