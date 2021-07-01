import React, { Component } from 'react'

import Cookie from "js-cookie"
import { Skeleton } from 'antd';
import { Layout } from 'antd';
import { useState, useEffect } from 'react';
import { Select, Form, Input, DatePicker, TimePicker, Col, Button, List, Row, Steps, message, Menu, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Tabs, Radio, Space, Breadcrumb, Table, Tag, Drawer, Message, Popover } from 'antd';
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






const success = () => {
    message.success('Successfully saved product');
};

const error = () => {
    message.error('error saving product');
};



export default function Home() {

    //const router = useRouter()

    let history = useHistory();

    const [tenderdata, setTenderdata] = useState()
    const [searchText, setSearchText] = useState()
    const [searchedColumn, setSearchedColumn] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [categories, setCategories] = useState([])
    const [attributes, setAttributes] = useState([])
    const [dvisible, setdVisible] = useState(false);

    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    const showDrawer = () => {
        setdVisible(true);
    };
    const onClose = () => {
        setdVisible(false);
    };

    
const handleReset = clearFilters => {
    clearFilters();
    //this.setState({ searchText: '' });
    setSearchText('')
};

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        Home.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => Home.searchInput.select(), 100);
            }
        },
        render: text =>
            Home.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[Home.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        console.log(values);

        const formData = new URLSearchParams();
        formData.append('name', values.name);
        formData.append('category', values.category);
        formData.append('atid', values.attributes);

        fetch("https://localhost:5001/products", {
            method: "POST",
            body: formData.toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "same-origin"
        }).then(function (response) {
            console.log(response)
            form.resetFields();
            setIsModalVisible(false)
            success()
            window.location.reload()

        }).catch(function (error) {
            console.log(error)
        })


        /*const mary = {
            name: values.name,
            category: values.category,
            size: values.size,
            color: values.color
        }

        fetch("https://localhost:5001/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
            body: JSON.stringify(mary)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            });*/
    };

    const onFinishdrawer = (values) => {
        console.log(values);

        const formData = new URLSearchParams();
        formData.append('name', values.name1);
        formData.append('category', values.recid1);

        fetch("https://localhost:5001/products", {
            method: "PUT",
            body: formData.toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "same-origin"
        }).then(function (response) {
            console.log(response)
            form.resetFields();
            setIsModalVisible(false)
            success()
            window.location.reload()

        }).catch(function (error) {
            console.log(error)
        })

    };
    const onCategoryFinish = (values) => {
        console.log(values);

        const formData = new URLSearchParams();
        formData.append('name', values.name);

        fetch("https://localhost:5001/productCategories", {
            method: "POST",
            body: formData.toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "same-origin"
        }).then(function (response) {
            console.log(response)
            success()
            window.location.reload()
        }).catch(function (error) {
            console.log(error)
            error()
        })


    };

    const onAttributeFinish = (values) => {
        console.log(values);

        const formData = new URLSearchParams();
        
        formData.append('price', values.price);
        formData.append('size', values.size);
        formData.append('color', values.color);
        formData.append('attname', values.nameof);

        fetch("https://localhost:5001/productAttributes", {
            method: "POST",
            body: formData.toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "same-origin"
        }).then(function (response) {
            console.log(response)
            success()
            window.location.reload()

        }).catch(function (error) {
            console.log(error)
            error()
        })


    };

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form2.setFieldsValue({
            //note: 'Hello world!',
            size1: sessionStorage.getItem('size'),
            color1: sessionStorage.getItem('color'),
            name1: sessionStorage.getItem('name'),
            category1: sessionStorage.getItem('category'),
            recid1: sessionStorage.getItem('record'),

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

    const tailLayoutw = {
        wrapperCol: { offset: 48, span: 46 },
    };

    const content = (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onCategoryFinish}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input category name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Create Category
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );

    const contentattributes = (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onAttributeFinish}
            >
                <Form.Item
                    label="Name"
                    name="nameof"
                    rules={[{ required: true, message: 'Please input category name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input price!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Size"
                    name="size"
                    rules={[{ required: true, message: 'Please input category size!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Color"
                    name="color"
                    rules={[{ required: true, message: 'Please input category color!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Create Attribute
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );

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

        fetch("https://localhost:5001/productAttributes", {
            method: "GET",
            headers: {}
        })
            .then(res => res.json())
            .then(data => {
                //this.setState({ htma: data });
                console.log(data);
                setAttributes(data)
            })
            .catch(console.log);


        console.log("categories")
        console.log("categories" + categories)
    }, [])


    const onRow = r => ({
        onClick: () => {
            console.log('values', r)
            sessionStorage.setItem('color', r.color)
            sessionStorage.setItem('size', r.size)
            sessionStorage.setItem('name', r.name)
            sessionStorage.setItem('category', r.category)
            sessionStorage.setItem('record', r.recid)

            showDrawer()
            onFill()
            /*return (
                router.push('/tenders/single')
            )*/
        }
    });

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'recid',
            key: 'recid',
            render: text =>
                <>
                    {text}
                </>,

        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text =>
                <>
                    {text}
                </>,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],

        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: text => <><a>{text}</a></>,
            ...getColumnSearchProps("category"),
            sorter: (a, b) => a.category.length - b.category.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            render: text => <>{text}</>,
            ...getColumnSearchProps("size"),
            sorter: (a, b) => a.size.length - b.size.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            render: text => <>{text}</>,
            ...getColumnSearchProps('color'),
            sorter: (a, b) => a.color.length - b.color.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: text => <>{text}</>,
            ...getColumnSearchProps('price'),
            sorter: (a, b) => a.price.length - b.price.length,
            sortDirections: ['descend', 'ascend'],
        },

    ]


    return <>
        <Layout style={{ backgroundColor: "#f8f8ff", height: "100vh" }} className="fullwidth">


            { /*<Head /> */}

            <Content style={{ padding: '0 50px', color: '#f8f8ff' }}>
                <Drawer
                    title="Update Product Name"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={dvisible}
                >
                    <Form {...layout} form={form2} name="control-hooks" onFinish={onFinishdrawer}>
                        <Form.Item name="recid1" label="Id" rules={[{ required: false }]}>
                            <Input readOnly={true} />
                        </Form.Item>
                        <Form.Item name="name1" label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="category1" label="Category" rules={[{ required: false }]}>
                            <Input readOnly={true} />
                        </Form.Item>
                        <Form.Item name="size1" label="Size" rules={[{ required: false }]}>
                            <Input readOnly={true} />
                        </Form.Item>
                        <Form.Item name="color1" label="Color" rules={[{ required: false }]}>
                            <Input readOnly={true} />
                        </Form.Item>

                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('gender') === 'other' ? (
                                    <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                        <Form.Item {...tailLayoutw}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
 
                        </Form.Item>
                    </Form>
                </Drawer>

                <Modal title="Create new item" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>


                    <Form
                        form={form}
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
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>


                        <Popover content={content} title="Create category" placement="right">

                            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Select product category"
                                    allowClear
                                >
                                    {categories.map(team => (
                                        <option value={team.categoryid}>
                                            {team["categoryname"]}
                                        </option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Popover>

                        <Popover content={contentattributes} title="Create Attribute" placement="right">
                        <Form.Item name="attributes" label="Attributes" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select attribute for product"
                                allowClear
                            >
                                {attributes.map(team => (
                                    <option value={team.attrid}>
                                        {team["attname"]}
                                    </option>
                                ))}
                            </Select>
                        </Form.Item>
                        </Popover>


                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Tenders</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '0px 0', height: 800 }}>
                    { /*<Sidebar />*/}
                    <Content className="centerdiv" style={{ paddingLeft: 100, backgroundColor: "#fff", paddingRight: 100 }} >
                        <div className="fullwidth" style={{ paddingTop: 40 }}>
                            <div style={{ paddingBottom: 40 }}>
                                <Button type="primary" onClick={showModal}>Create New</Button>
                            </div>
                            <Table columns={columns} dataSource={tenderdata} onRow={onRow} />
                        </div>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </>
}