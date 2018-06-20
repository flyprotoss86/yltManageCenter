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
import HospitalMenuList from "page/settings/hospital-menu-list.jsx"
import HospitalMenuDetail from "page/settings/hospital-menu-detail.jsx"
import HospitalReccIndex from "page/settings/hospital-recc-index.jsx"

class App extends React.Component{
    render(){
        let LayoutRouter = (
            <Layout> 
                <Switch>
                    <Route exact path="/" component={Home}/>

                    <Route path="/hospital" component={HospitalList}/>
                    <Route path="/hospital-detail/:id?" component={HospitalDetail}/>

                    <Route path="/feature" component={FeatureList}/>
                    <Route path="/feature-detail/:id?" component={FeatureDetail}/>

                    <Route path="/hospital-feature" component={HospitalFeatureList}/>
                    <Route path="/hospital-feature-detail/:hospitalId/feature/:featureId?" component={HospitalFeatureDetail}/>

                    <Route path="/hospital-menu" component={HospitalMenuList}/>
                    <Route path="/hospital-menu-detail/:hospitalId/menu/:menuId?" component={HospitalMenuDetail}/>

                    <Route path="/hospital-recc/type/:reccType" component={HospitalReccIndex}/>

                    {/*<Route path="/hospital-recc/:id?" component={HospitalFeatureList}/>*/}
                    {/*<Route path="/hospital-recc-detail/:hospitalId/recc/:reccId?" component={HospitalFeatureDetail}/>*/}

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