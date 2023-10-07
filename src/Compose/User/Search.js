import React, {useEffect, useState} from 'react';
import {Card, Space, Table, Tag} from "antd";
import moment from 'moment';
import Search from "antd/es/input/Search";
import {Link} from "react-router-dom";
import {getBooksContains} from "../../Service/api";
import {getUser} from "../../Service/userApi";

const column = [
    {
        title: "title",
        dataIndex: "title",
        key: "title",
        defaultSortOrder: "ascend",
        sortDirections: ["ascend", "descend"],
        render: (text, record) => <Link to={`/details/${record.id}`}>{text}</Link>
    },
    {
        title: "isbn",
        dataIndex: "isbn",
        key: "isbn",
        defaultSortOrder: "ascend",
        sortDirections: ["ascend", "descend"],
    },
    {
        title: "authors",
        dataIndex: "authorsArray",
        key: "authors",
        render: (tags) => (<>
            {tags.map((author) => author + " ")}
        </>)
    },
    {
        title: "types",
        dataIndex: "typesArray",
        key: "types",
        render: (record) => (
            record.map((item) => <Tag color={"blue"}>{item}</Tag>)
        )

    },
    {
        title: "price",
        dataIndex: "price",
        key: "price",
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: "isExist",
        dataIndex: "isExist",
        key: "isExist",
        sort: (a, b) => a.isExist - b.isExist,
        render: (_, record) => record.isExist === -1 ? "已删除" : record.isExist,
    },
    {
        title: "Publish Time",
        dataIndex: "publishTime",
        key: "publishTime",
        render: (date) => moment(date).format("YYYY-MM-DD"),
    }
]
const SearchBar = () => {
    const [sear, setSear] = useState("");
    const [book, setBook] = useState([]);

    const handleSearch = (text) => {
        console.log(getUser())
        if(text === "")
            setSear("");
        else
            setSear(text);
    }

    const getBooksContain = (text) => {
        if(text === "")
            setBook([]);
        else
            getBooksContains(text).then((res) => {
                setBook(res);
            })
    }

    useEffect(() => {
        getBooksContain(sear)
    }, [sear])

    return (
        <div>
            <Card title="Search Books!">
                <Space direction={"vertical"} size={"middle"} style={{display:'flex'}}>
                    <Search placeholder="Search Books" onSearch={handleSearch}></Search>
                    <Table columns={column} dataSource={book} pagination={{pageSize: 15}}></Table>
                </Space>
            </Card>
        </div>
    );
}

export default SearchBar;