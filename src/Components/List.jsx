import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";

export function List() {
  const [dataArray, setDataArray] = useState([]);
  const location = useLocation();
  const [subjectName, setSubjectName] = useState("");
  const navigate=useNavigate();

  const handleConfirm = (subject_name, date, present, e) => {
    console.log(e);
    message.success("List item will be deleted");
    handleDelete(subject_name, date, present);
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Delete Cancled");
  };

  async function handleDelete(subject_name, date, present) {
    const responseBody = {
      subject_name,
      date,
      present,
    };
    const response = await fetch("https://is-it-75.onrender.com/delete", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(responseBody),
    });

    const value = await response.json();

    fetch(`https://is-it-75.onrender.com/viewall?subject_name=${subjectName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then(async (response) => {
        // if (!response.ok) {
        //   throw new Error("Failed to fetch data");
        // }
        const value = await response.json();
        setDataArray(value.finalList);
      })
      .catch((error) => {
        console.error("Error:", error);
        setDataArray([]); // Clear data array on error
      });
  }

  useEffect(() => {
    setSubjectName(location.state ? location.state.subject_name : "");
  }, [location.state]);

  useEffect(() => {
    if (subjectName) {
      fetch(
        `https://is-it-75.onrender.com/viewall?subject_name=${subjectName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      )
        .then(async (response) => {
          // if (!response.ok) {
          //   throw new Error("Failed to fetch data");
          // }
          const value = await response.json();
          const msg = value.msg;
          if (msg == `Not Signed In`) {
            navigate("/signin");
          }
          setDataArray(value.finalList);
        })
        .catch((error) => {
          console.error("Error:", error);
          setDataArray([]);
        });
    }
  }, [subjectName]);

  return (
    <div>
      {dataArray.length === 0 ? (
        <p>No data available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Subject Name</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataArray.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.subject_name}</td>
                <td>{item.date}</td>
                <td>{item.present ? "Present" : "Absent"}</td>
                <td>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={(e) => handleConfirm(item.subject_name, item.date, item.present, e)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button primary><i className="fa-solid fa-trash"></i></Button>
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
