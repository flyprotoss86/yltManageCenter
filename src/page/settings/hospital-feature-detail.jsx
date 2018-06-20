import React                from 'react';
import MUtil                from 'util/mm.jsx'
import Feature             from 'service/setting/feature-service.jsx'
import PageTitle            from 'component/page-title/index.jsx';
import Selector     from 'util/selector/index.jsx'
import HospitalFeature from "service/setting/hospital-feature-service.jsx";

const _mm           = new MUtil();
const _feature      = new Feature();
const _hospitalFeature = new HospitalFeature()

export default class FeatureDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allFeature           : null,
            featureId            : this.props.match.params.featureId,
            hospitalId           : this.props.match.params.hospitalId,
            featureName          : '',
            status               : '',
            category             : '',
            lanOnly              : '',
            isH5                 : '',
            h5Url                : '',
            supportVersions      : '',

        }
        console.log(this.props.match.params.featureId)
        console.log(this.props.match.params.hospitalId)
    }
    componentDidMount(){
        // 加载功能详情
        // 有id的时候，表示是编辑功能，需要表单回填
        if(this.state.featureId){
            console.log('id')
            _hospitalFeature.getFeatureDetail(this.state.hospitalId, this.state.featureId).then((res) => {
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        } else {
            console.log('features')
            //加载所有功能
            _feature.getFeatureList().then(res=>{
                this.setState({
                    allFeature:res.map(o=>{return {value:o.id, text:o.featureName}})
                })


            })
        }
    }

    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }

    onFeatureChange(featureId){
        this.state.featureId = featureId
    }

    // 提交表单
    onSubmit(){
        let item = {
            featureName      : this.state.featureName,
            featureId        : this.state.featureId,
            hospitalId       : this.state.hospitalId,
            status           : this.state.status,
            category         : this.state.category,
            lanOnly          : this.state.lanOnly,
            isH5             : this.state.isH5,
            url              : this.state.h5Url
        }
        if(this.state.id){
            item.id = this.state.id;
        }
        // 表单验证成功
        _hospitalFeature.updateFeature(item).then(res=>{
            _mm.successTips(res);
            this.props.history.push('/hospital-feature');
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        })
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.featureId ? '编辑功能' : '添加功能'} />
                <div className="form-horizontal">
                    {
                        this.state.allFeature && this.state.allFeature.length > 0 ? (
                            <div className="form-group">
                                <label className="col-md-2 control-label">选择功能</label>
                                <div className="col-md-5">

                            <Selector list={this.state.allFeature}
                                      onPropsSelectChange={(_id)=>this.onFeatureChange(_id)}
                            /></div></div>
                                )
                            : (
                            <div className="form-group">
                                <label className="col-md-2 control-label">功能名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control"
                                           placeholder="请输入功能名称"
                                           name="featureName"
                                           readOnly={true}
                                           value={this.state.featureName}
                                           onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                        )
                    }
                    <div className="form-group">
                        <label className="col-md-2 control-label">功能分类</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入功能分类"
                                   name="category"
                                   value={this.state.category}
                                   onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">限制局域网访问</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="是否限制局域网访问"
                                   name="lanOnly"
                                   value={this.state.lanOnly}
                                   onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">是否h5功能</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="是否h5功能"
                                   name="isH5"
                                   value={this.state.isH5}
                                   onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">h5访问地址</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="h5访问地址"
                                   name="h5Url"
                                   value={this.state.h5Url}
                                   onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">支持版本</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="支持版本"
                                   name="supportVersions"
                                   value={this.state.supportVersions}
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
