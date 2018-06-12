import MUtil    from 'util/mm.jsx'

const _mm       = new MUtil();

export default class HospitalFeature{

    // 根据医院获取功能列表
    getFeatureList(hospitalId){
        let url     = '/hospitalfeature/list',
            data    = {
                hospitalId
            };
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }

    // 获取功能详情
    getFeatureDetail(featureId, hospitalId){
        return _mm.request({
            type    : 'post',
            url     : '/hospitalfeature/detail',
            data    : {
                featureId,
                hospitalId
            }
        });
    }


    // 添加/编辑此医院功能
    updateFeature(feature){
        return _mm.request({
            type    : 'post',
            url     : '/feature/set_feature',
            data    : feature
        });
    }


}
