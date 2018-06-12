import MUtil    from 'util/mm.jsx'

const _mm       = new MUtil();

export default class MenuManage{

    // 根据渠道获取菜单列表
    getMenuList(listParam){
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url             = '/manage/menu/list';
            data.pageNum    = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/manage/menu/search.do';
            data.pageNum    = listParam.pageNum;
            data.orderNo    = listParam.orderNo;
        }
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }

    // 获取菜单详情
    getMenuDetail(menuId, groupId){
        return _mm.request({
            type    : 'post',
            url     : '/manage/menu/detail',
            data    : {
                menuId : menuId
            }
        });
    }

    // 为渠道添加菜单
    saveMenu(menu){
        return _mm.request({
            type    : 'post',
            url     : '/manage/menu/add_menu',
            data    : menu
        });
    }

    // 编辑此渠道菜单
    updateMenu(menu){
        return _mm.request({
            type    : 'post',
            url     : '/manage/menu/set_menu',
            data    : menu
        });
    }


}
