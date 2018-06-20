import MUtil    from 'util/mm.jsx'
const _mm       = new MUtil()

export default class HospitalRecc {

    // 根据医院获取推荐列表
    getReccList(hospitalId, reccType) {
        return _mm.request({
            type    : 'post',
            url     : '/recc/list',
            data    : {
                hospitalId,
                reccType
            }
        });
    }

    // 获取推荐详情
    getReccDetail(reccId){
        return _mm.request({
            type    : 'post',
            url     : '/recc/detail',
            data    : {
                reccId
            }
        });
    }


    // 添加、编辑此推荐
    updateRecc(recc){
        return _mm.request({
            type    : 'post',
            url     : '/recc/set_recc',
            data    : recc
        });
    }


}
