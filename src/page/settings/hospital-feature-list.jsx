
import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import HospitalFeature      from 'service/setting/hospital-feature-service.jsx'
import Hospital     from 'service/hospital/hospital-service.jsx'
import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';
import Selector     from 'util/selector/index.jsx'

const _mm   = new MUtil();
const _feature = new HospitalFeature();
const _hospital = new Hospital();

export default class HospitalFeatureList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            featureList     : [],
            hospitalList    : [],
            list            : [],
            hospitalId      : ''
        };
    }
    componentDidMount(){
        this.loadHospitalList();
    }
    loadHospitalList(){
        _hospital.getHospitalList().then(res=>{
            this.setState({
                hospitalList: res.map(o=>{return {value:o.id, text:o.hospitalName}})
            })
        })
    }

    onHospitalChange(hospitalId){
        if(hospitalId){
            this.setState({
                hospitalId
            }, ()=>{

                _feature.getFeatureList().then(res => {
                    this.setState({
                        featureList: res
                    });

                }, errMsg => {
                    this.setState({
                        featureList : []
                    });
                    _mm.errorTips(errMsg);
                });

            })
        }
    }

    render(){
        let listBody = this.state.featureList.map((obj, index) => {
            return (
                <tr key={index}>
                    <td>{obj.id}</td>
                    <td>{obj.featureName}</td>
                    <td>{_mm.getStatusStr(obj.status)}</td>
                    <td>{obj.category}</td>
                    <td>{_mm.getBoolStr(obj.lanOnly)}</td>
                    <td>{_mm.getBoolStr(obj.isH5)}</td>
                    <td>{obj.h5Url}</td>
                    <td>{obj.supportVersions}</td>
                    <td>
                        <Link className="opear" to={ `/hospital-feature-detail/feature/${obj.id}/hospital/${this.state.hospitalId}` }>编辑</Link>
                    </td>
                </tr>
            );
        });
        //list{key, value}, value, title, onPropsSelectChange, selectFirst
        //
        return (
            <div id="page-wrapper">
                <PageTitle title="管理功能列表">
                    <Selector list={this.state.hospitalList}
                              title="请选择医院"
                              selectFirst={true}
                              onPropsSelectChange={(hospitalId)=>this.onHospitalChange(hospitalId)}
                    >
                        <Link className="btn btn-primary" to={ `/feature/detail/` }>添加功能</Link>
                    </Selector>

                </PageTitle>
                <TableList tableHeads={['ID', '功能名称', '状态', '分类', '限制局域网', 'H5功能','H5 url', '支持版本', '编辑']}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}

