import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Switch, Avatar, Image, Table } from 'antd';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import SearchBar from '../../../components/SearchBar';
import { pwpActions } from '../../../store';
import Portal from "../../../components/Portal/Portal";
import { deleteFaq, getAllFaq, changeIsPubishStatus, searchFaq } from '../../../store/faqSlice';
moment().format();

const ViewFaq = () => {
    useEffect(() => {
        dispatch(pwpActions.changePwp(["Dashboard", "View Faq"]))
        dispatch(getAllFaq());
    }, [])

    const dispatch = useDispatch();
    const [switchChecked, setSwitchChecked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const faqs = useSelector(state => state.faq.list);
    const columns = [
        {
            title: 'Id',
            key: 'index',
            render: (text, record, index) => index + 1,
            fixed: 'left',
            align: "center",
            width: '5%'
        },
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            fixed: 'left',
            align: "center",
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: "center",
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            align: "center",
        },
        {
            title: 'Created Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: "center",
            render: (__, record) => {
                return <p>{moment(record.createdAt).format('ll')}</p>
            }
        },
        {
            title: 'Is Publish',
            dataIndex: 'isPublish',
            key: 'isPublish',
            align: "center",
            render: (__, record) => {
                return <Switch onChange={(checked) => {
                    setIsDisabled(true);
                    dispatch(changeIsPubishStatus({ _id: record._id, enableSwitch: () => setIsDisabled(false) }));
                    setSwitchChecked(prevState => !prevState);
                }}
                    disabled={isDisabled} defaultChecked={record.isPublish} />;
            }
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            align: "center",
            width: "10%",
            render: (_, record) => (
                <Space size="middle" style={{ fontSize: "1.5rem", "color": "black" }}>
                    <Link
                        style={{ "color": "black" }}
                        to={`/admin/editFaq/${record._id}`}>
                        <AiFillEdit />
                    </Link>
                    <a
                        style={{ "color": "red" }}
                        onClick={() => {
                            setDeleteId(record._id);
                            setDeleteConfirmation(true);
                        }}
                    >
                        <AiFillDelete />
                    </a>
                </Space >
            ),
        },
    ];
    return (
        <div style={{
            "display": "flex",
            "alignItems": "center",
            "flexDirection": "column",
        }}>
            {deleteConfirmation && <Portal
                confirmationMessage="Are you sure you want to delete this item?"
                onConfirm={() => {
                    dispatch(deleteFaq({ _id: deleteId }));
                    setDeleteConfirmation(false);
                }}
                onReject={() => setDeleteConfirmation(false)}
            />}
            <SearchBar
                onSearch={(value) => { dispatch(searchFaq({ searchKey: value })) }}
                onNoString={() => { dispatch(getAllFaq()) }}
            />
            <Table dataSource={faqs} columns={columns} scroll={{ x: 1500 }} bordered size='small' />
        </div>
    )
}
export default ViewFaq;