import ReactDOM from 'react-dom';
import { Table } from 'antd';
import { connect } from 'dva';
import '../../app.css';
import './process.css';
import { DatePicker } from 'antd';
import { Form, Row, Col, Input, Button, Icon,} from 'antd';
import React, { Component }  from 'react'
import 'whatwg-fetch'

function onChange(date, dateString) {
    console.log(date, dateString);
    query.createDate=date;
}
function disabledTime(date) {
    var nowDate = new Date().getTime();
    return date>=new Date();
}

const query={
    createDate:null,
};
const dateFormat = 'YYYY-MM-DD';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

/*定义table*/
const columns = [{
    title: '商品编码',
    dataIndex: 'goodsNo',
    key: 'goodsNo',
   /* render: text => <a href="javascript:;">{text}</a>,*/
}, {
    title: '商品名称',
    dataIndex: 'goodsName',
    key: 'goodsName',
}, {
    title: '商品数量',
    dataIndex: 'num',
    key: 'num',
},{
    title: '物料编码',
    dataIndex: 'sourceId',
    key: 'sourceId',
},{
    title: '物料名称',
    dataIndex: 'sourceName',
    key: 'sourceName',
},{
    title: '物料消耗量',
    dataIndex: 'sourceNum',
    key: 'sourceNum',
},{
    title: '实际单位',
    dataIndex: 'unit',
    key: 'unit',
},{
    title: '规格',
    dataIndex: 'boxRule',
    key: 'boxRule',
},{
    title: '类型',
    dataIndex: 'sourceType',
    key: 'sourceType',
},{
    title: '状态',
    dataIndex: 'statusMsg',
    key: 'statusMsg',
},{
    title: '操作',
    key: 'action',
    render: (text, record) => (
        getOperate(record.status)
    )

}];

function getOperate(status){
    if(status==='1'){
        return <Button
            type="primary"
            htmlType="submit">
            禁用
        </Button>
    }else{
        return <Button
            type="primary"
            htmlType="submit">
            开启
        </Button>
    }
}


function getStatus(status) {
    if(!status){
        return "未知";
    }
    var statusMsg ="";
    switch(status)
    {
        case '1':
            statusMsg = "正常";
            break;
        case '2':
            statusMsg = "废弃";
            break;
        default:
            break;
    }
    return statusMsg;
}

class Process extends React.Component {
    state = {
        expand: false,
        deptNo:"",
        goodsNo:"",
        data: [],
        pagination: {},
        loading: false,
    };

    handleSearch = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
        fetch("/api/hello/process/data",{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"aa":"bb"})
        })
        .then(function(response) {
            return response.json()
        }).then((json) => {
            console.log('parsing success', json);
            if(json!=null && json.length>0){
                for(var i=0;i<json.length;i++){
                    json[i].statusMsg=getStatus(json[i].status);
                }
                this.setState({
                    loading: false,
                    data: json
                });
            }else {

            }

        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };


    deptNoChange = (event) => {
       this.setState({
           deptNo:event.target.value
       })
    };
    goodsNoChange = (event) => {
       this.setState({
           goodsNo:event.target.value
       })
    };


    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        return (
            <span>
                <Form layout="inline"  onSubmit={this.handleSearch}>
                    <Form.Item label="部门：">
                        {getFieldDecorator('deptNo', {
                            rules: [{ required: true, message: '请输入部门编号!' }],
                        })(
                            <Input  style={{ color: 'rgba(0,0,0,.25)' }} size="small" value={this.state.deptNo} placeholder="请输入部门编号" onChange={this.deptNoChange} />
                        )}
                    </Form.Item>
                    <Form.Item label="商品编码：">
                        {getFieldDecorator('goodsNo', {
                            rules: [{ required: true, message: '请输入商品编码!' }],
                        })(
                            <Input style={{  color: 'rgba(0,0,0,.25)' }}  size="small" value={this.state.goodsNo} placeholder="请输入商品编码" onChange={this.goodsNoChange} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                        >
                           查询
                        </Button>
                    </Form.Item>
                </Form>
                <Table columns={columns} dataSource={this.state.data} pagination={this.state.pagination}
                       loading={this.state.loading} />
            </span>
        );
    }

}




const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(Process);
export default WrappedAdvancedSearchForm;
ReactDOM.render(
    <div>
        <WrappedAdvancedSearchForm />
        <div className="search-result-list">Search Result List</div>
    </div>,document.getElementById('root')
);