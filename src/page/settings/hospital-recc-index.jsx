import React        from 'react';
import MUtil        from 'util/mm.jsx'
import Hospital     from 'service/hospital/hospital-service.jsx'
import HospitalFeature      from 'service/setting/hospital-feature-service.jsx'
import Selector     from 'util/selector/index.jsx'
import Draggable    from 'react-draggable'
import FileUploader         from 'util/file-uploader/index.jsx'
require('./iconfont.js')

const _mm   = new MUtil();
const _feature = new HospitalFeature()
const _hospital = new Hospital()
const _blockWidth=100
export default class HospitalMenuList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:null,
            width:1,
            height:1,
            featureId:'',
            hospitalId:'',
            name:'',
            url:'',
            img:'',
            featureList:[],
            hospitalList:[],

            boxlist:[
                {id:'a0', x:0, y:0, width:1, height:1, hospitalId:1, featureId:1, bgimg:'http://img.happymmall.com/5908810c-d1c6-4a82-a97c-cbf0acf20329.png'},
                {id:'a1', x:1, y:0, width:1, height:1, hospitalId:2, featureId:2, bgimg:'http://img.happymmall.com/04f081ab-2e40-49e0-a607-91f28809cd51.png'},
                {id:'a2', x:0, y:1, width:1, height:1, hospitalId:1, featureId:3, bgimg:'http://img.happymmall.com/5908810c-d1c6-4a82-a97c-cbf0acf20329.png'},
                {id:'a3', x:1, y:1, width:1, height:1, hospitalId:2, featureId:4, bgimg:'http://img.happymmall.com/5908810c-d1c6-4a82-a97c-cbf0acf20329.png'},
                {id:'a4', x:0, y:2, width:2, height:1, hospitalId:1, featureId:1, bgimg:'http://img.happymmall.com/5908810c-d1c6-4a82-a97c-cbf0acf20329.png'},
            ]

        };
    }
    eventLoggerStart (e, data) {}
    eventLoggerDrag (e, data) {}
    eventLoggerStop (e, data) {
        var transX = /(-?\d+)px,\s*(-?\d+)/.exec(data.node.style.transform)[1]
        var transY = /(-?\d+)px,\s*(-?\d+)/.exec(data.node.style.transform)[2]
        transX = Math.round(transX/_blockWidth) * _blockWidth
        transY = Math.round(transY/_blockWidth) * _blockWidth
        let _blockObj = this.state.boxlist.filter(o => o.id === data.node.id)[0]
        _blockObj.x = transX / _blockWidth
        _blockObj.y = transY / _blockWidth
        data.node.style.transform = `translate(${transX}px, ${transY}px)`
        // console.log(this.state.boxlist)
    }
    componentDidMount(){
        // load HospitalList...
        _hospital.getHospitalList().then(res=>{
            this.setState({
                hospitalList: res.map(o=>{return {value:o.id, text:o.hospitalName}})
            }, ()=>{
                if(this.state.hospitalList.length>0){
                    this.setState({
                        hospitalId : this.state.hospitalList[0].value
                    })
                }
            })
        })


        // onClick={(e)=>{e.stopPropagation(); console.log('1'); console.log(e.target);  }}
    }

    onEdit(e){
        console.log('chk',e.currentTarget.parentElement.parentElement.id)
        if(this.state.id === e.currentTarget.parentElement.parentElement.id) {
            $('#'+e.currentTarget.parentElement.parentElement.id).removeClass('selected')
            this.setState({
                id: ''
            })
        } else {
            $('#'+e.currentTarget.parentElement.parentElement.id).addClass('selected').siblings().removeClass('selected')
            let item=this.state.boxlist.filter(o=>o.id===e.currentTarget.parentElement.parentElement.id)[0]
            this.setState({
                id: item.id,
                width: item.width,
                height: item.height,
                featureId: item.featureId,
                hospitalId: item.hospitalId,
                name:'',
                url:'',
                img:''
            })
        }
        e.stopPropagation()
    }
    onDelete(e){
        if(confirm('确认删除吗？')){
            //e.currentTarget.parentElement.parentElement.id
            let lst = this.state.boxlist
            lst.splice(lst.indexOf(lst.filter(o=>o.id===e.currentTarget.parentElement.parentElement.id)[0]),1)
            this.setState({boxlist:lst})
        }
        e.stopPropagation()
    }

    onAddItem(){
        // 检查医院、功能、宽度、高度、图片
        // console.log(this.state.tmpobj)
        let _width=parseInt(this.state.width)
        let _height=parseInt(this.state.height)
        if(!_width || _width>9 || _width<1){
            _mm.errorTips('请设置格子宽度：1～9')
            return
        }
        if(!_height || _height>9 || _height<1){
            _mm.errorTips('请设置格子高度：1～9')
            return
        }
        if(!this.state.img){
            _mm.errorTips('请设置格子图片')
            return
        }

        let maxY=0
        this.state.boxlist.forEach(o=>{
            if(o.y>maxY)
                maxY=o.y
        })
        let lst=this.state.boxlist
        if(this.state.id) {
            //更新
            _mm.errorTips('更新成功...')
        } else {
            //添加
            lst.push({
                id:'a'+new Date().getTime().toString().substr(0,9),
                x:0,
                y:maxY+1,
                width:this.state.width,
                height:this.state.height,
                featureId:this.state.featureId,
                hospitalId:this.state.hospitalId,
                bgimg:this.state.img
            })
            _mm.errorTips('添加成功...')
        }
        this.setState({
            id:'',
            width:1,
            height:1,
            featureId:this.state.featureId,
            hospitalId:this.state.hospitalId,
            name:'',
            url:'',
            img:''
        })
        this.setState({boxlist:lst}, ()=>{console.log('update lst')})
    }

    onUploadError(errmsg){
        console.log(errmsg)
    }
    onUploadSuccess(res){
        if(res.url) {
            this.setState({
                img: res.url
            })
        }
    }
    onHospitalChange(hospitalId){
        console.log('parent change: ', hospitalId)
        if(hospitalId){
            this.setState({
                hospitalId
            }, ()=>{
                _feature.getFeatureList(hospitalId).then(res => {
                    this.setState({
                        featureList: res.map(o=>{return {value:o.featureId, text:o.featureName}})
                    })
                }, errMsg => {
                    this.setState({
                        featureList : []
                    });
                    _mm.errorTips(errMsg);
                });

            })
        }
    }
    onSelectFeatureChange(featureId){
        console.log(featureId)
        this.setState({
            featureId
        })
    }

    onValueChange(e){
        this.setState({
            [e.target.name] : e.target.value.trim()
        });
    }

    render(){
        return (
            <div id="page-wrapper">

                <div className="col-md-3">
                    <div className="form-horizontal">

                        <div className="form-group">
                            <label className="col-md-12 control-label">请选择医院</label>
                            <div className="col-md-12">
                                <Selector list={this.state.hospitalList}
                                          selectValue={this.state.hospitalId}
                                          onPropsSelectChange={(hospitalId)=>this.onHospitalChange(hospitalId)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-12 control-label">请选择功能</label>
                            <div className="col-md-12">
                                <Selector list={this.state.featureList}
                                          onPropsSelectChange={(featureId)=>this.onSelectFeatureChange(featureId)}
                                          selectValue={this.state.featureId}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-12 control-label">请输入名称</label>
                            <div className="col-md-12">
                                <input type="text" className="form-control"
                                       placeholder="请输入名称"
                                       name="name"
                                       value={this.state.name}
                                       onChange={(e) => this.onValueChange(e)}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-12 control-label">请输入宽度(格子数)</label>
                            <div className="col-md-12">
                                <input type="text" className="form-control"
                                       placeholder="请输入宽度"
                                       name="width"
                                       value={this.state.width}
                                       onChange={(e) => this.onValueChange(e)}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-12 control-label">请输入高度(格子数)</label>
                            <div className="col-md-12">
                                <input type="text" className="form-control"
                                       placeholder="请输入高度"
                                       name="height"
                                       value={this.state.height}
                                       onChange={(e) => this.onValueChange(e)}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-12 control-label">请输入url地址</label>
                            <div className="col-md-12">
                                <input type="text" className="form-control"
                                       placeholder="请输入url地址"
                                       name="url"
                                       value={this.state.url}
                                       onChange={(e) => this.onValueChange(e)}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-12 control-label">请上传格子图片</label>
                            <div className="col-md-12">
                                <FileUploader onSuccess={(res)  => this.onUploadSuccess(res)}
                                              onError={(errMsg) => this.onUploadError(errMsg)}/>
                                <img style={{maxWidth:100,maxHeight:100}} src={this.state.img}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-12">
                                <button className="btn btn-primary btn-large btn-block" onClick={()=>{this.onAddItem()}}>{this.state.id?'更新':'添加'}</button>
                            </div>
                        </div>

                    </div>
                </div>




                <div className="col-md-9">
                    <div className="box-wrapper">
                        {this.state.boxlist.map(o=>{
                            return (
                                <Draggable
                                    key={`${o.id}`}
                                    handle={`.box-drag${o.id}`}
                                    defaultPosition={{x:o.x*_blockWidth, y:o.y*_blockWidth}}
                                    onStart={(e,data)=>{this.eventLoggerStart(e,data)}}
                                    onDrag={(e,data)=>{this.eventLoggerDrag(e,data)}}
                                    onStop={(e,data)=>{this.eventLoggerStop(e,data)}}>
                                    <div
                                        id={o.id}
                                        style={{width:`${o.width*_blockWidth}px`, height: `${o.height*_blockWidth}px`}}
                                        className={`box-drag box-drag${o.id}`}>
                                        <div style={{background:`url("${o.bgimg}") 0% 0% / cover`}}>
                                            <div className="chk" onClick={(e)=>{this.onEdit(e)}}>
                                                <svg className="icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-edit"></use>
                                                </svg>
                                            </div>
                                            <div className="del" onClick={(e)=>{this.onDelete(e)}}>
                                                <svg className="icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-delete"></use>
                                                </svg>
                                            </div>

                                        </div>
                                    </div>
                                </Draggable>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

