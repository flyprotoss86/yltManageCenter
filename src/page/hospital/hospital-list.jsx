/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:34:10
*/
import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import Hospital         from 'service/hospital/hospital-service.jsx'

import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';

const _mm   = new MUtil();
const _hospital = new Hospital();

export default class HospitalList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : []
        };
    }
    componentDidMount(){
        this.loadList();
    }
    loadList(){
        _hospital.getHospitalList().then(res => {
            console.log(res)
            this.setState({
                list : res
            });
            console.log(this.state)
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }

    render(){
        let listBody = this.state.list.map((obj, index) => {
            return (
                <tr key={index}>
                    <td>{obj.id}</td>
                    <td>{obj.hospitalName}</td>
                    <td>{obj.alias}</td>
                    <td>{obj.province}</td>
                    <td>{_mm.toDTstr(obj.createdAt)}</td>
                    <td>{_mm.toDTstr(obj.updatedAt)}</td>
                    <td>
                        <Link className="opear" to={ `/hospital-detail/${obj.id}` }>编辑</Link>
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="医院列表">
                    <Link className="btn btn-primary" to={ `/hospital-detail/` }>添加</Link>

                </PageTitle>
                <TableList tableHeads={['ID', '医院名称', '简称', '城市', '添加时间', '更新时间', '编辑']}>
                    {listBody}
                </TableList>

            </div>
        );
    }
}

