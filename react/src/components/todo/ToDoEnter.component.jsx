import { Button, Input, Space } from 'antd';
import './style.css';
import { useState } from 'react';
export const ToDoEnter = (props) => {
    const { addNewToDo } = props;
    const [valueInput, setValueInput] = useState();

    const handleClick = () => {
        addNewToDo(valueInput);
        setValueInput('');
    };
    const handleOnChange = (title) => {
        setValueInput(title);
    };
    return (
        <div className='todo-enter'>
            <Space.Compact>
                <Input
                    value={valueInput}
                    onChange={(event) => handleOnChange(event.target.value)}
                    placeholder='Enter your task'
                />
                <Button onClick={handleClick} type='primary'>
                    Add
                </Button>
                
            </Space.Compact>
        </div>
    );
};
