import MUtil    from 'util/mm.jsx'

const _mm       = new MUtil();

export default class Hospital{




    // 获取医院列表
    getHospitalList(listParam){
        let url     = '/hospital/list',
            data    = {};
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }
    // 获取医院详情
    getHospitalDetail(hospitalId){
        return _mm.request({
            type    : 'post',
            url     : '/hospital/detail',
            data    : {
                hospitalId : hospitalId
            }
        });
    }
    // 添加医院
    saveHospital(hospital){
        return _mm.request({
            type    : 'post',
            url     : '/hospital/add_hospital',
            data    : hospital
        });
    }
    // 编辑医院
    updateHospital(hospital){
        return _mm.request({
            type    : 'post',
            url     : '/hospital/set_hospital',
            data    : hospital
        });
    }


}
