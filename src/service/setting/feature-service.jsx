import MUtil    from 'util/mm.jsx'

const _mm       = new MUtil();

export default class Feature{

    // 获取功能列表
    getFeatureList(listParam){
        let url     = '/feature/list',
            data    = {};
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }

    // 获取功能详情
    getFeatureDetail(featureId){
        return _mm.request({
            type    : 'post',
            url     : '/feature/detail',
            data    : {
                featureId : featureId
            }
        });
    }

    // 编辑/添加功能
    updateFeature(feature){
        return _mm.request({
            type    : 'post',
            url     : '/feature/set_feature',
            data    : feature
        });
    }


}
