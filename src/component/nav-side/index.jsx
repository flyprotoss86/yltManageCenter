import React                from 'react';
import { Link, NavLink }    from 'react-router-dom';

class NavSide extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/">
                                <i className="fa fa-dashboard"></i>
                                <span>首页</span>
                            </NavLink>
                        </li>
                        <li className="active">
                            <Link to="/hospital">
                                <i className="fa fa-list"></i>
                                <span>医院管理</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/hospital" activeClassName="active-menu">医院管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/department" activeClassName="active-menu">科室管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/doctor" activeClassName="active-menu">医生管理</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="active">
                            <Link to="/allfeature">
                                <i className="fa fa-check-square-o"></i>
                                <span>配置管理</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/feature" activeClassName="active-menu">全部功能</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/hospital-feature/" activeClassName="active-menu">功能配置</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/menu" activeClassName="active-menu">菜单配置</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/recc/type/appindex" activeClassName="active-menu">推荐配置</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/recc/type/zhihui" activeClassName="active-menu">智慧医院</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="active">
                            <Link to="/user">
                                <i className="fa fa-user-o"></i>
                                <span>版本控制</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/version" activeClassName="active-menu">版本查询</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/publish" activeClassName="active-menu">版本发布</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/user" activeClassName="active-menu">版本更新</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>

            </div>
        );
    }
}

export default NavSide;