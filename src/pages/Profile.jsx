import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import defaultAvatar from "../assets/images/default-avatar.jpg";
import { useNavigate } from "react-router-dom";
import TwoFALink from "../components/profile/2falink";

const Profile = () => {
  const { token, user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://passforge-api.onrender.com';
        const res = await fetch(`${apiUrl}/member-data`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUserData();
    else setLoading(false);
  }, [token, setUser]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No users logged in</p>;

  const handleLogoutAll = async () => {
    if (!window.confirm("Are you sure you want to logout from all devices?")) {
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://passforge-api.onrender.com';
      const response = await fetch(`${apiUrl}/api/users/logout_all`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Logged out from all devices.");
        setUser(null);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/");
      } else {
        alert(data.message || "Failed to logout.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Network error. Please try again later.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://passforge-api.onrender.com';
      const response = await fetch(`${apiUrl}/users`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Your account has been deleted.");
        setUser(null);
        localStorage.removeItem("token");
        navigate("/");
      } else {
        alert(data.message || "Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div className="container-profile">
      <h1>My profile</h1>
      <div className="profile-content">
        <img
          src={user.avatar || defaultAvatar}
          alt={`${user.name}'s avatar`}
          className="avatar"
        />
      
        <div className="profile-card">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <TwoFALink />
          <div className="buttons-profile">
            <button onClick={() => navigate("/edit-profile")}>Edit profile</button>
            <button onClick={handleDelete}>Delete profile</button>
          </div>
        </div>
      </div>

      <div className="security-section">
        <h2>Security Settings</h2>

        <div className="sessions-section">
          <h3>Active Sessions</h3>
          <ul>
            <li>
              Current session - {new Date().toLocaleString()}
            </li>
          </ul>
        </div>

        <button className="btn" onClick={handleLogoutAll}>
          Logout from all devices
        </button>
      </div>

      <div className="buttons-profile">
        <button className="btn">Download the extension</button>
        <button className="btn">Export my data</button>
      </div>
    </div>
  );
};

export default Profile;