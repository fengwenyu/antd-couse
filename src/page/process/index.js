import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'antd';
import { connect } from 'dva';
import '../../app.css';
import './process.css';
import { DatePicker } from 'antd';
import { Form, Row, Col, Input, Button, Icon,} from 'antd';

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
    dataIndex: 'status',
    key: 'status',
},{
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
      {/*<a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>*/}
    </span>
    ),
}];

const data = [{
    goodsNo: '100835',
    goodsName: '测试商品',
    num: '32',
    sourceId: '800323',
    sourceName: '澳洲 安格斯牛排',
    sourceNum: '54',
    unit: 'kg',
    boxRule: '1',
    sourceType: '主材',
    status: getStatus('1'),
}];
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
        case 2:
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
    };

    handleSearch = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
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
                <Table columns={columns} dataSource={data} />
            </span>
        );
    }

}



export default Process;

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(Process);
ReactDOM.render(
    <div>
        <WrappedAdvancedSearchForm />
        <div className="search-result-list">Search Result List</div>
    </div>,document.body
);