
import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import HospitalMenu      from 'service/setting/hospital-menu-service.jsx'
import Hospital     from 'service/hospital/hospital-service.jsx'
import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';
import Selector     from 'util/selector/index.jsx'

const _mm   = new MUtil();
const _menu = new HospitalMenu();
const _hospital = new Hospital();

export default class HospitalMenuList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuList     : [],
            hospitalList    : [],
            hospitalId      : ''
        };
    }
    componentDidMount(){
        // load HospitalList...
        _hospital.getHospitalList().then(res=>{
            this.setState({
                hospitalList: res.map(o=>{return {value:o.id, text:o.hospitalName}})
            }, ()=>{
                if(this.state.hospitalList.length>0){
                    this.setState({
                        hospitalId : this.state.hospitalList[0].value
                    })
                }
            })
        })
    }

    onHospitalChange(hospitalId){
        console.log('parent change: ', hospitalId)
        if(hospitalId){
            this.setState({
                hospitalId
            }, ()=>{

                _menu.getMenuList(hospitalId).then(res => {
                    this.setState({
                        menuList: res
                    });

                }, errMsg => {
                    this.setState({
                        menuList : []
                    });
                    _mm.errorTips(errMsg);
                });

            })
        }
    }

    render(){
        let listBody = this.state.menuList.map((obj, index) => {
            return (
                <tr key={index}>
                    <td>{obj.id}</td>
                    <td>{obj.menuName}</td>
                    <td>{_mm.getStatusStr(obj.status)}</td>
                    <td>{obj.featureName}</td>
                    <td>{obj.url}</td>
                    <td>{obj.order}</td>
                    <td>
                        <Link className="opear" to={ `/hospital-menu-detail/${this.state.hospitalId}/menu/${obj.id}` }>配置</Link>
                    </td>
                </tr>
            );
        });

        return (
            <div id="page-wrapper">
                <PageTitle title="管理菜单列表">
                    <Selector list={this.state.hospitalList}
                              title="请选择医院："
                              onPropsSelectChange={(hospitalId)=>this.onHospitalChange(hospitalId)}
                    >
                        <Link className="btn btn-primary" to={ `/hospital-menu-detail/${this.state.hospitalId}/menu/` }>添加菜单</Link>
                    </Selector>

                </PageTitle>
                <TableList tableHeads={['ID', '菜单名称', '状态', '对应功能', 'url', '顺序', '编辑']}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}

