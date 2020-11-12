import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions'

import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS,
        }
    }

   



    render() {

        const HomePage = () => {
            return (
                <Home 
                dish={this.state.dishes.filter((dish) => {return dish.featured === true;})[0]}
                promotion={this.state.promotions.filter((promotion) => {return promotion.featured === true;})[0]}
                leader={this.state.leaders.filter((leader) => {return leader.featured === true;})[0]}
                
                />
            );
        }

        const DishWithId = ({match}) =>{
            return (
                <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    comments={this.state.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}
                />
            );
        }


        return (
            <div >
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                    <Route path="/menu/:dishId" component={ DishWithId } />
                    <Route path="/contactus" component={Contact} />
                    <Route path="/aboutus" component={() => <About leaders={this.state.leaders} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }

}



export default Main;
