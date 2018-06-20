import React                from 'react';
import MUtil                from 'util/mm.jsx'
import PageTitle            from 'component/page-title/index.jsx';
import Selector     from 'util/selector/index.jsx'
import HospitalFeature from "service/setting/hospital-feature-service.jsx";
import HospitalMenu from "service/setting/hospital-menu-service.jsx";

const _mm           = new MUtil();
const _hospitalFeature = new HospitalFeature()
const _menu = new HospitalMenu()

export default class FeatureDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allFeature           : null,
            menuId               : this.props.match.params.menuId,
            hospitalId           : this.props.match.params.hospitalId,
            featureId            : '',
            status               : '',
            url                  : ''
        }
    }

    componentDidMount() {
        //临时变量，第二次加载接口后，再赋予state
        let allFeature

        //加载此医院所有功能
        _hospitalFeature.getFeatureList(this.state.hospitalId).then(res=>{
            allFeature = res.map(o=>{return {value:o.featureId, text:o.featureName}})
            if(this.state.menuId){
                return _menu.getMenuDetail(this.state.menuId)
            }
        }).then((menu) => {
            if(menu) {
                this.setState({
                    allFeature  : allFeature,
                    menuName    : menu.menuName,
                    featureId   : menu.featureId,
                    status      : menu.status,
                    url         : menu.url,
                    order       : menu.order
                })
            } else {
                this.setState({
                    allFeature  : allFeature
                })
            }

        }, (errMsg) => {
            _mm.errorTips(errMsg);
        })
    }

    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }

    onFeatureChange(featureId){
        console.log(featureId)
        this.state.featureId = featureId
    }

    // 提交表单
    onSubmit(){
        let item = {
            featureId        : this.state.featureId,
            status           : this.state.status,
            menuName         : this.state.menuName,
            url              : this.state.url
        }
        if(this.state.menuId){
            item.menuId = this.state.menuId;
        }
        // 表单验证成功
        _menu.updateMenu(item).then(res=>{
            _mm.successTips(res);
            this.props.history.push('/hospital-menu');
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        })
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.menuId ? '编辑菜单' : '添加菜单'} />
                <div className="form-horizontal">

                    <div className="form-group">
                        <label className="col-md-2 control-label">选择功能</label>
                        <div className="col-md-5">

                            <Selector list={this.state.allFeature}
                                      selectValue={this.state.featureId}
                                      onPropsSelectChange={(_id)=>this.onFeatureChange(_id)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">菜单名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="菜单名称"
                                   name="menuName"
                                   value={this.state.menuName}
                                   onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">菜单顺序</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="菜单顺序"
                                   name="order"
                                   value={this.state.order}
                                   onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">url</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="访问地址"
                                   name="url"
                                   value={this.state.url}
                                   onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary" 
                                onClick={(e) => {this.onSubmit(e)}}>提交</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
