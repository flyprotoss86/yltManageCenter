import React        from 'react';
import MUtil        from 'util/mm.jsx'
import Hospital      from 'service/hospital/hospital-service.jsx'
const _mm           = new MUtil();
const _hospital      = new Hospital();
import './selector.scss'

// 医院选择器
export default class HospitalSelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hospitalList   : [],
            hospitalId     : 0
        }
    }

    componentDidMount(){
        this.loadHospitalList();
    }
    componentWillReceiveProps(nextProps){
        let hospitalIdChange        = this.props.hospitalId !== nextProps.hospitalId
        // 数据没有发生变化的时候，直接不做处理
        if(!hospitalIdChange){
            return;
        }

            this.setState({
                hospitalId     : nextProps.hospitalId
            });

    }
    // 加载一级分类
    loadHospitalList(){
        _hospital.getHospitalList().then(res => {
            this.setState({
                hospitalList : res.list
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }


    onHospitalChange(e){
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            hospitalId     : newValue
        }, ()=>{
            this.onPropsHospitalChange()
        });
    }

    // 传给父组件选中的结果
    onPropsHospitalChange(){
        // 判断props里的回调函数存在
        let hospitalChangable = typeof this.props.onPropsHospitalChange === 'function';
        hospitalChangable && this.props.onCategoryChange(this.state.hospitalId);
    }
    render(){
        return (
            <div className="col-md-10">
                <select className="form-control cate-select"
                    value={this.state.firstCategoryId}
                    onChange={(e) => this.onHospitalChange(e)}
                    readOnly={this.props.readOnly}>
                    <option value="">请选择医院</option>
                    {
                        this.state.hospitalList.map(
                            (hospital, index)=> <option value={hospital.id} key={index}>{hospital.hospitalName}</option>
                        )
                    }
                </select>
            </div>
        )
    }
}