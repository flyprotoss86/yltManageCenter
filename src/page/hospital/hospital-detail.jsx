import React                from 'react';
import MUtil                from 'util/mm.jsx'
import Hospital             from 'service/hospital/hospital-service.jsx'
import PageTitle            from 'component/page-title/index.jsx';
import RichEditor           from 'util/rich-editor/index.jsx'

const _mm           = new MUtil();
const _hospital      = new Hospital();

export default class HospitalDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id                    : this.props.match.params.id,
            alias                 : '',
            province              : '',
            hospitalName          : '',
            hospitalDesc          : '',
            hospitalContent       : ''
        }
    }
    componentDidMount(){
        this.loaditem();
    }
    // 加载医院详情
    loaditem(){
        // 有id的时候，表示是编辑功能，需要表单回填
        if(this.state.id){
            _hospital.getHospitalDetail(this.state.id).then((res) => {
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
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
    // 富文本编辑器的变化
    onDetailValueChange(value){
        this.setState({
            detail: value
        });
    }
    // 提交表单
    onSubmit(){
        let item = {
            alias           : this.state.alias,
            province        : this.state.province,
            hospitalName    : this.state.hospitalName,
            hospitalDesc    : this.state.hospitalDesc,
            hospitalContent : this.state.hospitalContent,
        }
        if(this.state.id){
            item.id = this.state.id;
        }
        // 表单验证成功
        _hospital.saveHospital(item).then(res=>{
            _mm.successTips(res);
            this.props.history.push('/hospital/index');
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        })
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? '编辑医院' : '添加医院'} />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">医院名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入医院名称"
                                name="hospitalName"
                                value={this.state.hospitalName}
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">医院简称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入医院简称"
                                name="alias"
                                value={this.state.alias}
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所在省市</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入医院所在省市"
                                   name="province"
                                   value={this.state.province}
                                   onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">医院描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入医院描述"
                                   name="hospitalDesc"
                                   value={this.state.hospitalDesc}
                                   onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">医院详情</label>
                        <div className="col-md-10">
                            <RichEditor 
                                detail={this.state.hospitalContent}
                                defaultDetail={this.state.hospitalContent}
                                onValueChange={(value) => this.onDetailValueChange(value)}/>
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
