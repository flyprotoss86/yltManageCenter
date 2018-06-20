import React        from 'react';
import './selector.scss'

// 选择器
export default class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedVal      : ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if((this.props.selectValue === undefined || this.props.selectValue === nextProps.selectValue)
            &&
            (this.props.list === undefined || this.props.list === nextProps.list)
        )
        {
            return false
        }
        console.log(this.props , nextProps, this.props.selectValue, this.props.selectValue !== undefined)

        this.setState({
            selectedVal     : (nextProps.selectValue !== undefined ? nextProps.selectValue : (
                (nextProps.list && nextProps.list.length > 0) ? nextProps.list[0].value : ''
            ))
        }, ()=>{
            this.onPropsSelectChange()
        })
    }

    onSelectChange(e){
        let newValue = e.target.value || 0;
        this.setState({
            selectedVal     : newValue
        }, ()=>{
            console.log(this.state.selectedVal)
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
                <span>{this.props.title}</span>
                <select className="form-control cate-select"
                    value={this.state.selectedVal}
                    onChange={(e) => this.onSelectChange(e)}>
                    {
                        this.props.list && this.props.list.map(
                            (obj, index)=> <option value={obj.value} key={index}>{obj.text}</option>
                        )
                    }
                </select>
                {this.props.children}
            </div>
        )
    }
}