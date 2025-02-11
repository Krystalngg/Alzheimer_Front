import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get("/admin/users")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    const makeAdmin = (id) => {
        api.post(`/admin/set-admin/${id}`)
            .then(() => alert("User promoted to admin"))
            .catch(error => alert("Error updating user role"));
    };

    return (
        <div className="container mt-5">
            <h2>Admin Panel - User Management</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.role !== "ADMIN" && (
                                    <button onClick={() => makeAdmin(user.id)} className="btn btn-primary">
                                        Promote to Admin
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
