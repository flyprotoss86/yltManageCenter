import MUtil    from 'util/mm.jsx'

const _mm       = new MUtil();

export default class Group{

    // 获取医院渠道列表
    getGroupList(listParam){
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url             = '/manage/group/list';
            data.pageNum    = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/manage/group/search.do';
            data.pageNum    = listParam.pageNum;
            data.orderNo    = listParam.orderNo;
        }
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }

    // 添加医院渠道
    saveGroup(group){
        return _mm.request({
            type    : 'post',
            url     : '/manage/group/add_group',
            data    : group
        });
    }
    // 编辑医院渠道
    updateGroup(group){
        return _mm.request({
            type    : 'post',
            url     : '/manage/group/set_group',
            data    : group
        });
    }


}
