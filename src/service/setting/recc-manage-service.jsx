import MUtil    from 'util/mm.jsx'

const _mm       = new MUtil();

export default class ReccManage{

    // 根据渠道获取推荐列表
    getReccList(listParam){
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url             = '/manage/recc/list';
            data.pageNum    = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/manage/recc/search.do';
            data.pageNum    = listParam.pageNum;
            data.orderNo    = listParam.orderNo;
        }
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }

    // 获取推荐详情
    getReccDetail(reccId, groupId){
        return _mm.request({
            type    : 'post',
            url     : '/manage/recc/detail',
            data    : {
                reccId : reccId
            }
        });
    }

    // 为渠道添加推荐
    saveRecc(recc){
        return _mm.request({
            type    : 'post',
            url     : '/manage/recc/add_recc',
            data    : recc
        });
    }

    // 编辑此渠道推荐
    updateRecc(recc){
        return _mm.request({
            type    : 'post',
            url     : '/manage/recc/set_recc',
            data    : recc
        });
    }


}
