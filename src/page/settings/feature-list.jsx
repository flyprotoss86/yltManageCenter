
import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import Feature         from 'service/setting/feature-service.jsx'

import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';

const _mm   = new MUtil();
const _feature = new Feature();

export default class FeatureList extends React.Component{
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
        _feature.getFeatureList().then(res => {
            console.log(res)
            this.setState({list: res});
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
                    <td>{obj.featureName}</td>
                    <td>{_mm.getStatusStr(obj.status)}</td>
                    <td>{obj.category}</td>
                    <td>{_mm.getBoolStr(obj.lanOnly)}</td>
                    <td>{_mm.getBoolStr(obj.isH5)}</td>
                    <td>{obj.h5Url}</td>
                    <td>{obj.supportVersions}</td>
                    <td>
                        <Link className="opear" to={ `/feature-detail/${obj.id}` }>编辑</Link>
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="全部功能列表">
                    <Link className="btn btn-primary" to={ `/feature-detail/` }>添加</Link>
                </PageTitle>
                <TableList tableHeads={['ID', '功能名称', '状态', '分类', '限制局域网', 'H5功能','H5 url', '支持版本', '编辑']}>
                    {listBody}
                </TableList>

            </div>
        );
    }
}

