import React, { useEffect, useState } from 'react';
import { Button, message, Space } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

function AddClass() {
    const navigate=useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [date, setDate] = useState('');
    const [present, setPresent] = useState(false);
    const location = useLocation();
    const [subjectName, setSubjectName] = useState("");


    useEffect(() => {
        setSubjectName(location.state ? location.state.subject_name : "");
      }, [location.state]);

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Class Added',
        });
      };

    const handleSubmit = (event) => {
        event.preventDefault();

        const responseBody = {
            subject_name: subjectName,
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
                navigate('/signin');
            }else {
                messageApi.success(msg);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageApi.error('Failed to add class. Please try again.');
        });

        // Reset form after submission
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
                    <h3>{subjectName}</h3>
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
