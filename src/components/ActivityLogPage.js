import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

const ActivityLogPage = () => {
    const [logs, setLogs] = useState([]);

    // Định nghĩa hàm fetchLogs để lấy dữ liệu log từ backend
    const fetchLogs = () => {
        api.get("/admin/logs") // Đúng phương thức GET
            .then(response => setLogs(response.data))
            .catch(error => console.error("Error fetching logs:", error));
    };
    
    useEffect(() => {
        fetchLogs(); // Gọi hàm khi component được mount
    }, []);

    const deleteLog = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa log này?")) {
            api.delete(`/admin/logs/${id}`)
                .then(() => {
                    alert("Log deleted successfully.");
                    fetchLogs(); // Gọi lại fetchLogs() sau khi xóa log
                })
                .catch(error => alert("Error deleting log"));
        }
    };

    const deleteAllLogs = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ nhật ký?")) {
            api.delete(`/admin/logs`)
                .then(() => {
                    alert("All logs deleted successfully.");
                    fetchLogs(); // Gọi lại fetchLogs() sau khi xóa toàn bộ log
                })
                .catch(error => alert("Error deleting all logs"));
        }
    };

    return (
        <div className="container mt-5">
            <h2>Activity Logs</h2>
            <button className="btn btn-danger mb-3" onClick={deleteAllLogs}>
                Delete All Logs
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Action</th>
                        <th>Timestamp</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.username}</td>
                            <td>{log.action}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteLog(log.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityLogPage;
