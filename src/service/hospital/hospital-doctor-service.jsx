import MUtil    from 'util/mm.jsx'

const _mm       = new MUtil();

export default class Doctor{

    // 获取医生列表
    getDoctorList(listParam){
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url             = '/manage/doctor/list';
            data.pageNum    = listParam.pageNum;
            data.hospitalId    = listParam.hospitalId;
            data.departmentId    = listParam.departmentId;
        }
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }
    // 获取医生详情
    getDoctorDetail(doctorId){
        return _mm.request({
            type    : 'post',
            url     : '/manage/doctor/detail',
            data    : {
                doctorId : doctorId
            }
        });
    }
    // 添加医生
    saveDoctor(doctor){
        return _mm.request({
            type    : 'post',
            url     : '/manage/doctor/add_doctor',
            data    : doctor
        });
    }
    // 编辑医生
    updateDoctor(doctor){
        return _mm.request({
            type    : 'post',
            url     : '/manage/doctor/set_doctor',
            data    : doctor
        });
    }


}
