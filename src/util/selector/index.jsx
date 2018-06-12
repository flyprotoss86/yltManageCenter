import React        from 'react';
import './selector.scss'

// 选择器
export default class Index extends React.Component{
    constructor(props){
        // list{value, text}, value, title, onPropsSelectChange, selectFirst
        super(props);
        this.state = {
            selectedVal      : '',
            isFirstRecvProps : true
        }
    }

    // componentDidMount(){
    componentWillReceiveProps(nextProps){
        if(this.state.isFirstRecvProps) {
            this.setState({
                isFirstRecvProps: false
            }, ()=>{

                this.props = nextProps
                if(this.props.value){
                    this.setState({
                        selectedVal :this.props.value
                    }, ()=>{this.onPropsSelectChange()})
                } else {
                    this.setState({
                        selectedVal :
                            this.props.selectFirst && this.props.list.length > 0 ?
                                this.props.list[0].value : ''
                    }, ()=>{this.onPropsSelectChange()})
                }

            })
        } else {
            return false
        }
    }

    onSelectChange(e){
        let newValue = e.target.value || 0;
        this.setState({
            selectedVal     : newValue
        }, ()=>{
            this.onPropsSelectChange()
        });
    }

    // 传给父组件选中的结果
    onPropsSelectChange() {
        // 判断props里的回调函数存在
        let onPropsSelectChange = typeof this.props.onPropsSelectChange === 'function';
        onPropsSelectChange && this.props.onPropsSelectChange(this.state.selectedVal);
    }
    render(){
        return (
            <div className="col-md-10">
                <select className="form-control cate-select"
                    value={this.state.selectedVal}
                    onChange={(e) => this.onSelectChange(e)}>
                    <option value="">{this.props.title}</option>
                    {
                        this.props.list.map(
                            (obj, index)=> <option value={obj.value} key={index}>{obj.text}</option>
                        )
                    }
                </select>
                {this.props.children}
            </div>
        )
    }
}