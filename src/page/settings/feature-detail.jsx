import React                from 'react';
import MUtil                from 'util/mm.jsx'
import Feature             from 'service/setting/feature-service.jsx'
import PageTitle            from 'component/page-title/index.jsx';
import Selector     from 'util/selector/index.jsx'

const _mm           = new MUtil();
const _feature      = new Feature();

export default class FeatureDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id                   : this.props.match.params.id,
            featureName          : '',
            status               : '',
            category             : '',
            lanOnly              : '',
            isH5                 : '',
            h5Url                : '',
            supportVersions      : ''
        }
    }
    componentDidMount(){
        this.loaditem();
    }
    // 加载功能详情
    loaditem(){
        // 有id的时候，表示是编辑功能，需要表单回填
        if(this.state.id){
            _feature.getFeatureDetail(this.state.id).then((res) => {
                this.setState({
                    featureName          : res.featureName,
                    status               : res.status,
                    category             : res.category,
                    lanOnly              : res.lanOnly,
                    isH5                 : res.isH5,
                    h5Url                : res.h5Url,
                    supportVersions      : res.supportVersions,
                    listBool             : [{value:true,text:'是'},{value:false,text:'否'}]
                });
                console.log(res)
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        } else {
            this.setState({
                listBool             : [{value:true,text:'是'},{value:false,text:'否'}]
            });
        }
    }

    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }

    // 提交表单
    onSubmit(){
        let item = {
            featureName      : this.state.featureName,
            status           : this.state.status,
            category         : this.state.category,
            lanOnly          : this.state.lanOnly,
            isH5             : this.state.isH5,
            supportVersions  : '',
        }
        if(this.state.id){
            item.id = this.state.id;
        }
        // 表单验证成功
        _feature.updateFeature(item).then(res=>{
            _mm.successTips(res);
            this.props.history.push('/feature');
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        })
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? '编辑功能' : '添加功能'} />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">功能名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入功能名称"
                                name="featureName"
                                value={this.state.featureName}
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>

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
                            <Selector
                                list={this.state.listBool}
                                selectValue={this.state.lanOnly}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">是否h5功能</label>
                        <div className="col-md-5">
                            <Selector
                                list={this.state.listBool}
                                selectValue={this.state.isH5}
                            />
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
