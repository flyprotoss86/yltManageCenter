import MUtil    from 'util/mm.jsx'

const _mm       = new MUtil();

export default class Version{

    // 获取大版本列表（支持功能列表）
    getVersionList(){
        let url             = '/manage/version/list'
        return _mm.request({
            type    : 'post',
            url     : url
        });
    }

    // 添加版本（大版本支持情况  A|B|C）
    saveVersion(version){
        return _mm.request({
            type    : 'post',
            url     : '/manage/version/add_version',
            data    : version
        });
    }

    // 编辑版本
    updateVersion(version){
        return _mm.request({
            type    : 'post',
            url     : '/manage/version/set_version',
            data    : version
        });
    }


    // 添加发布版本
    savePublish(publish){
        return _mm.request({
            type    : 'post',
            url     : '/manage/publish/add_publish',
            data    : publish
        });

    }

    // 编辑发布版本
    updatePublish(publish){
        return _mm.request({
            type    : 'post',
            url     : '/manage/publish/set_publish',
            data    : publish
        });

    }

    // 获取发布历史记录
    getVersionPublishList(versionNum){
        let url     = '/manage/publish/list',
            data    = {};
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }

}
