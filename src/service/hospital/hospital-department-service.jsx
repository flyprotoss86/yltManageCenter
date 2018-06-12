import MUtil    from 'util/mm.jsx'

const _mm       = new MUtil();

export default class Department{

    // 获取医院部门列表
    getDepartmentList(listParam){
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url             = '/manage/department/list';
            data.pageNum    = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/manage/department/search.do';
            data.pageNum    = listParam.pageNum;
            data.orderNo    = listParam.orderNo;
        }
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }
    // 获取医院部门详情
    getDepartmentDetail(departmentId){
        return _mm.request({
            type    : 'post',
            url     : '/manage/department/detail',
            data    : {
                departmentId : departmentId
            }
        });
    }
    // 添加医院部门
    saveDepartment(department){
        return _mm.request({
            type    : 'post',
            url     : '/manage/department/add_department',
            data    : department
        });
    }
    // 编辑医院部门
    updateDepartment(department){
        return _mm.request({
            type    : 'post',
            url     : '/manage/department/set_department',
            data    : department
        });
    }


}
