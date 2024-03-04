import React, { useState } from 'react';
import { Button, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

function AddClass() {
    const navigate=useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [className, setClassName] = useState('');
    const [date, setDate] = useState('');
    const [present, setPresent] = useState(false);

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Class Added',
        });
      };

    const handleSubmit = (event) => {
        event.preventDefault();

        const responseBody = {
            subject_name: className,
            date,
            present
        };

        fetch('https://is-it-75.onrender.com/addclass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token:localStorage.getItem('token')
            },
            body: JSON.stringify(responseBody)
        })
        .then(async response => {
            const value = await response.json();
            const msg = value.msg;
            if(msg==`Not Signed In`){
                navigate('/');
            }else {
                messageApi.success(msg);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageApi.error('Failed to add class. Please try again.');
        });

        // Reset form after submission
        setClassName('');
        setDate('');
        setPresent(false);
    };

    return (
        <>
        {contextHolder}
        <div className="form-container add-form">
            <h2>Add Class</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>
                    Class Name:
                    <select
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required>
                        <option value="">Select a class</option>
                        <option value="OOP">OOP</option>
                        <option value="DBMS">DBMS</option>
                        <option value="DMS">DMS</option>
                        <option value="MPMC">MPMC</option>
                        <option value="SSOS">SSOS</option>
                        <option value="EVS">EVS</option>
                    </select>   
                </label>

                </div>
                <div>
                    <label>
                        Date:
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="checkbox-label">
                        Present:
                        <input
                            type="checkbox"
                            checked={present}
                            onChange={(e) => setPresent(e.target.checked)}
                        />
                    </label>
                </div>
                <button type="submit">Add Class</button>
            </form>
        </div>
        </>
    );
}

export default AddClass;
