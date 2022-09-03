import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Switch, Table } from 'antd';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import SearchBar from '../../../components/SearchBar';
import Portal from "../../../components/Portal/Portal";
import { getAllFaqcategory, changeIsPubishStatus, deleteFaqcategory, searchFaqCategory } from '../../../store/faqCategorySlice';
import { faqCategoryActions } from '../../../store';
moment().format();

const ViewFaq = () => {
    useEffect(() => {
        dispatch(getAllFaqcategory());
    }, [])

    const dispatch = useDispatch();
    const [switchChecked, setSwitchChecked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const faqCategories = useSelector(state => state.faqCategory.list);

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
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            align: "center",
        },
        {
            title: 'Display Order',
            dataIndex: 'displayOrder',
            key: 'displayOrder',
            align: "center",
        },
        {
            title: 'Created Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: "center",
            render: (__, record) => {
                return <p>{moment(record?.createdAt).format('ll')}</p>
            }
        },
        {
            title: 'Is Publish',
            dataIndex: 'isPublish',
            key: 'isPublish',
            align: "center",
            render: (__, record) => {
                return <Switch
                    checked={record.isPublish}
                    onChange={(checked) => {
                        setIsDisabled(true);
                        dispatch(changeIsPubishStatus({ _id: record?._id, enableSwitch: () => setIsDisabled(false) }));
                        setSwitchChecked(prevState => !prevState);
                    }}
                    disabled={isDisabled} defaultChecked={record?.isPublish} />;
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
                    {/* <Link
                        style={{ "color": "black" }}
                        to={`/admin/editFaq/${record?._id}`}
                    >
                        <AiFillEdit />
                    </Link> */}
                    <AiFillEdit
                        style={{ "color": "black", "cursor": "pointer" }}
                        onClick={() => {
                            console.log("actions")
                            dispatch(faqCategoryActions.editItem(record))
                        }}
                    />
                    <a
                        style={{ "color": "red" }}
                        onClick={() => {
                            setDeleteId(record?._id);
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
                    dispatch(deleteFaqcategory({ _id: deleteId, }));
                    dispatch(faqCategoryActions.initializeEditItem());
                    setDeleteConfirmation(false);
                }}
                onReject={() => setDeleteConfirmation(false)}
            />}
            {/* <SearchBar
                onSearch={(value) => { dispatch(searchFaqCategory({ searchKey: value })) }}
                onNoString={() => { dispatch(getAllFaqcategory()) }}
            /> */}
            <Table dataSource={faqCategories} columns={columns} scroll={{ x: 1500 }} bordered size='small' />
        </div>
    )
}
export default ViewFaq;