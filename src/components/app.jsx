import React from 'react';
import portfolioData from '../data/data.json';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import CategoryList from './category-list';
import DetailItem from './detail-item';
import AboutPage from './about-page';
import Footer from './footer';
import NotFound from './not-found';
import Header from './header';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.scrollTop = this.scrollTop.bind(this);
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }

    render() {
        const categories = [portfolioData.dev, portfolioData.design, portfolioData.photo];

        return (
            <Router onUpdate={this.scrollTop}>
                <div>
                    <Header />

                    <Switch>
                        <Route exact path="/dev" render={(props) => <CategoryList {...props} />} />
                        <Route exact path="/design" render={(props) => <CategoryList {...props} />} />
                        <Route exact path="/photo" render={(props) => <CategoryList {...props} />} />
                        <Route exact path="/about" component={AboutPage}/>

                        {
                            /*
                                Routes for all detail pages

                                This loops through each of the portfolio categories
                                and then loops through all the projects in a given category
                            */
                            categories.map((category, categoryIndex) => (
                                category.map((item, itemIndex) => (
                                    <Route key={`${categoryIndex}-${itemIndex}`} exact path={item.url} component={DetailItem}/>
                                ))
                            ))
                        }

                        <Route exact path="/">
                            <Redirect to="/dev" />
                        </Route>
                        { /*This is to handle any indexed /web search results*/ }
                        <Route exact path="/web">
                            <Redirect to="/dev" />
                        </Route>

                        <Route path="*" component={NotFound} />
                    </Switch>

                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
