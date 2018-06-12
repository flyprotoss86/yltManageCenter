/*
* @Author: Rosen
* @Date:   2018-01-13 11:27:21
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-05 14:02:20
*/  

import React            from 'react';
import ReactDOM         from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

import Layout           from 'component/layout/index.jsx';
// 页面
import Home             from 'page/home/index.jsx';
import ProductRouter    from 'page/product/router.jsx';
import Login            from 'page/login/index.jsx';
import OrderList        from 'page/order/index.jsx';
import OrderDetail      from 'page/order/detail.jsx';
import UserList         from 'page/user/index.jsx';
import ErrorPage        from 'page/error/index.jsx';


import HospitalList from "page/hospital/hospital-list.jsx"
import HospitalDetail from "page/hospital/hospital-detail.jsx"
import FeatureList from "page/settings/feature-list.jsx"
import FeatureDetail from "page/settings/feature-detail.jsx"
import HospitalFeatureList from "page/settings/hospital-feature-list.jsx"
import HospitalFeatureDetail from "page/settings/hospital-feature-detail.jsx"

class App extends React.Component{
    render(){
        let LayoutRouter = (
            <Layout> 
                <Switch>
                    <Route exact path="/" component={Home}/>

                    <Route path="/hospital/list" component={HospitalList}/>
                    <Route path="/hospital/detail/:id?" component={HospitalDetail}/>
                    <Redirect exact from="/hospital" to="/hospital/list"/>

                    <Route path="/feature/list" component={FeatureList}/>
                    <Route path="/feature/detail/:id?" component={FeatureDetail}/>
                    <Redirect exact from="/feature" to="/feature/list"/>

                    <Route path="/hospital-feature/:id?" component={HospitalFeatureList}/>
                    <Route path="/hospital-feature-detail/:hospitalId/feature/:featureId?" component={HospitalFeatureDetail}/>

                    <Route path="/product" component={ProductRouter}/>
                    <Route path="/product-category" component={ProductRouter}/>
                    <Route path="/order/index" component={OrderList}/>
                    <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
                    <Route path="/user/index" component={UserList}/>
                    <Redirect exact from="/order" to="/order/index"/>
                    <Redirect exact from="/user" to="/user/index"/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={ props => LayoutRouter}/>
                </Switch>
            </Router>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);