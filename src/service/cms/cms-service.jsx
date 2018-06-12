/*
* @Author: Rosen
* @Date:   2018-01-31 13:19:15
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:52:34
*/
import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

export default class CMS{
    // 获取新闻列表
    getCmsNewsList(listParam){
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url                         = '/manage/cmsnews/list.do';
            data.pageNum                = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/manage/cmsnews/search.do';
            data.pageNum                = listParam.pageNum;
            data[listParam.searchType]  = listParam.keyword;
        }
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }
    // 获取商品详情
    getNews(productId){
        return _mm.request({
            type    : 'post',
            url     : '/manage/cmsnews/detail.do',
            data    : {
                productId : productId || 0
            }
        });
    }

    /*
    *  分类相关
    */
    // 根据父分类id获取分类列表
    getCategoryList(parentCategoryId){
        return _mm.request({
            type    : 'post',
            url     : '/manage/cmscategory/get_category.do',
            data    : {
                categoryId : parentCategoryId || 0
            }
        });
    }


}
