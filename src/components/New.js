import React, { Component } from 'react'

import Cookie from "js-cookie"
import { Skeleton } from 'antd';
import { Layout } from 'antd';
import { useState, useEffect } from 'react';
import { Select, Form, Input, DatePicker, TimePicker, Col, Button, List, Row, Steps, message, Menu, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Tabs, Radio, Space, Breadcrumb, Table, Tag } from 'antd';
import { useHistory, Redirect } from "react-router-dom";
import { browserHistory } from 'react-router';
import { MemoryRouter, HashRouter, Link } from "react-router-dom";
import Highlighter from 'react-highlight-words';


const { Header, Footer, Sider, Content } = Layout;

const { TabPane } = Tabs;

const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 16 },
};


const onFinish = (values) => {
    console.log(values);

    /*fetch("https://localhost:5001/products", {
  method: "POST",
  body: "{
  "name": "test",
  "category": "2",
  "size": "23",
  "color": "blue"
}",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
  },
  credentials: "same-origin"
}).then(function(response) {
  response.status
  response.statusText
  response.headers
  response.url

  return response.text()
}).catch(function(error) {
  error.message
})*/

    fetch("https://localhost:5001/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
          },
          body:{
            name: values.name,
            category: values.category,
            size: values.size,
            color: values.color
          }
        })
          .then(res => res.json())
          .then(data => {
            this.setState({ bars: data });
            console.log("ðŸŒµ ", this.state.bars.message);
            if (
              String(this.state.bars.message).valueOf ==
              String("success").valueOf
            ) {
              this.setState({ loading: false });
              this.setState({ iconLoading: false });
              {
                message.success("Patient Successfully saved", 10);
              }
            }
          });
};

export default function New() {

    //const router = useRouter()

    let history = useHistory();

    const [tenderdata, setTenderdata] = useState()
    const [searchText, setSearchText] = useState()
    const [searchedColumn, setSearchedColumn] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [categories, setCategories] = useState([])
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };

    const { Option } = Select;

    const optionChange = (value) => {
        console.log(value)
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    useEffect(() => {

        fetch("https://localhost:5001/products", {
            method: "GET",
            headers: {}
        })
            .then(res => res.json())
            .then(data => {
                //this.setState({ htma: data });
                console.log(data);
                setTenderdata(data)
            })
            .catch(console.log);

        fetch("https://localhost:5001/productCategories", {
            method: "GET",
            headers: {}
        })
            .then(res => res.json())
            .then(data => {
                //this.setState({ htma: data });
                console.log(data);
                setCategories(data)
            })
            .catch(console.log);


        console.log("categories")
        console.log("categories" + categories)
    }, [])


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };



    return <>
        <Layout style={{ backgroundColor: "#f8f8ff", height: "100vh" }} className="fullwidth">


            { /*<Head /> */}

            <Content style={{ padding: '0 50px', color: '#f8f8ff' }}>


                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>New</Breadcrumb.Item>
                    <Breadcrumb.Item>Tenders</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '0px 0', height: 800 }}>
                    { /*<Sidebar />*/}
                    <Content className="centerdiv" style={{ paddingLeft: 100, backgroundColor: "#fff", paddingRight: 100 }} >
                        <div className="fullwidth" style={{ paddingTop: 40 }}>
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input a name!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                                    <Select
                                        placeholder="Select a category"
                                        allowClear
                                    >
                                        {categories.map(team => (
                                            <option value={team.categoryid}>
                                                {team["categoryname"]}
                                            </option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Color"
                                    name="color"
                                    rules={[{ required: true, message: 'Please input color' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
        label="Size"
        name="size"
        rules={[{ required: true, message: 'Please input size' }]}
      >
        <Input/>
      </Form.Item>


                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit" onClick={onFinish}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>

                        </div>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </>
}