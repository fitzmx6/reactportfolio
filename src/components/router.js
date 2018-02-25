import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowerRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom';
import CategoryList from './category-list';
import DetailItem from './detail-item';
import AboutPage from './about-page';
import Footer from './footer';

export class RouterWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
        this.mobileNavToggle = this.mobileNavToggle.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.scrollTop = this.scrollTop.bind(this);
    }

    closeNav() {
        if (this.state.open) {
            this.setState({open: false});
        }
    }

    mobileNavToggle() {
        this.setState({open: !this.state.open});
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Router onUpdate={this.scrollTop}>
                <div>
                    <header className={(this.state.open ? "open-nav" : "")}>
                        <div className="grid-d-12">
                            <div className="top-header">
                                <div id="logo">
                                    <h1>Cory Fitzpatrick | Web Developer</h1>
                                </div>

                                <div className="mobile-nav-link" onClick={this.mobileNavToggle}></div>
                            </div>

                            <nav>
                                <ul>
                                    <li><NavLink to={"/web"} onClick={this.closeNav}>Web</NavLink></li>
                                    <li><NavLink to={"/design"} onClick={this.closeNav}>Design</NavLink></li>
                                    <li><NavLink to={"/photo"} onClick={this.closeNav}>Photo</NavLink></li>
                                    <li><NavLink to={"/about"} onClick={this.closeNav}>About</NavLink></li>
                                </ul>
                            </nav>
                        </div>
                    </header>

                    <Switch>
                        <Route exact path="/web" render={(props) => <CategoryList {...props} navToggle={this.closeNav} />} />
                        <Route exact path="/web/:webId" component={DetailItem} />

                        <Route exact path="/design" render={(props) => <CategoryList {...props} navToggle={this.closeNav} />} />
                        <Route exact path="/design/:designId" component={DetailItem} />

                        <Route exact path="/photo" render={(props) => <CategoryList {...props} navToggle={this.closeNav} />} />
                        <Route exact path="/photo/:photoId" component={DetailItem} />

                        <Route exact path="/about" component={AboutPage}/>

                        <Redirect from="/" to="/web"/>
                    </Switch>

                    <Footer />
                </div>
            </Router>
        );
    }
}


RouterWrapper.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired
  })
};

export default RouterWrapper;
