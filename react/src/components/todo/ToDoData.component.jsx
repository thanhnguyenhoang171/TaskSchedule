import { List, Button, Radio, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import taskApi from '../../api/taskAPI';

import './style.css';
import React, { useState } from 'react';

export const ToDoData = (props) => {
    const { data, setData } = props;
    const [status, setStatus] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');

 
    const handleOnChangeStatus = async (id, value) => {
        await taskApi.update(id, { isCompleted: value });
        setStatus((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const style = {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    };


    const handleEdit = (id, title) => {
        setEditingId(id);
        setEditedTitle(title);
    };


    const handleSaveTitle = async (id) => {
        try {
            await taskApi.update(id, { title: editedTitle });

            const updatedData = data.map((item) =>
                item.id === id ? { ...item, title: editedTitle } : item,
            );
            setData(updatedData);

            setEditingId(null); // Thoát chế độ chỉnh sửa
        } catch (error) {
            console.error('Lỗi khi cập nhật tiêu đề:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const removeData = await taskApi.delete(id);
            if (removeData.data.deletedCount === 1) {
                alert('Remove a task successfully!');
                const deleted = data.filter((item) => item.id !== id);
                setData(deleted);
            } else {
                alert('Remove a task fail!');
            }
        } catch (error) {
            console.log('Error removing a task: ', error);
        }
    };

    return (
        <div className='todo-data'>
            {!Array.isArray(data) || data.length === 0 ? (
                <img
                    src='/animation-footage-of-people-fill-out-a-form-done-job-long-paper-document-and-to-do-list-with-checkboxes-concept-video.jpg'
                    alt='No tasks'
                />
            ) : (
                <List
                    itemLayout='horizontal'
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Radio.Group
                                    style={style}
                                    onChange={(e) =>
                                        handleOnChangeStatus(
                                            item.id,
                                            e.target.value,
                                        )
                                    }
                                    value={status[item.id] || item.isCompleted}
                                    options={[
                                        { value: 1, label: 'Not Started' },
                                        { value: 2, label: 'Start' },
                                        { value: 3, label: 'In Progress' },
                                        { value: 4, label: 'Finished' },
                                    ]}
                                />,
                                editingId === item.id ? (
                                    <Button
                                        type='text'
                                        icon={<SaveOutlined />}
                                        onClick={() => handleSaveTitle(item.id)}
                                    />
                                ) : (
                                    <Button
                                        type='text'
                                        icon={<EditOutlined />}
                                        onClick={() =>
                                            handleEdit(item.id, item.title)
                                        }
                                    />
                                ),
                                <Button
                                    type='text'
                                    icon={<DeleteOutlined />}
                                    danger
                                    onClick={() => handleDelete(item.id)}
                                />,
                            ]}
                        >
                            <List.Item.Meta
                                description={
                                    editingId === item.id ? (
                                        <Input
                                            value={editedTitle}
                                            onChange={(e) =>
                                                setEditedTitle(e.target.value)
                                            }
                                            onPressEnter={() =>
                                                handleSaveTitle(item.id)
                                            }
                                            onBlur={() =>
                                                handleSaveTitle(item.id)
                                            }
                                            autoFocus
                                        />
                                    ) : (
                                        item.title
                                    )
                                }
                            />
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};
