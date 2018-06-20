import MUtil    from 'util/mm.jsx'

const _mm       = new MUtil();

export default class HospitalMenu {

    // 根据医院获取菜单列表
    getMenuList(hospitalId){
        let url     = '/menu/list',
            data    = {
                hospitalId
            };
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }

    // 获取菜单详情
    getMenuDetail(menuId){
        return _mm.request({
            type    : 'post',
            url     : '/menu/detail',
            data    : {
                menuId
            }
        });
    }

    // 添加/编辑此菜单
    updateMenu(menuInfo){
        return _mm.request({
            type    : 'post',
            url     : '/menu/set_menu',
            data    : menuInfo
        });
    }

}
