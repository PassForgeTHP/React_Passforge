import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/images/default-avatar.jpg";
import useSettingsStore from "../stores/settingsStore";
import TwoFALink from "../components/profile/2falink";
import SEO from "../components/SEO";

const EditProfile = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const { autoLockTimeout, setAutoLockTimeout } = useSettingsStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || null);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user[name]", name);
    formData.append("user[email]", email);
    if (avatar) formData.append("user[avatar]", avatar);
    if (password) formData.append("user[password]", password);
    if (passwordConfirmation) formData.append("user[password_confirmation]", passwordConfirmation);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://passforge-api.onrender.com';
      const response = await fetch(`${apiUrl}/users`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setMessage("Profile updated successfully!");
        setTimeout(() => {
          navigate("/profile");
        }, 800);
      } else {
        setMessage(`${data.message || "Update failed."}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Network error. Please try again later.");
    }
  };

  const handleLogoutAll = async () => {
    if (!window.confirm("Are you sure you want to logout from all devices?")) {
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://passforge-api.onrender.com';
      const response = await fetch(`${apiUrl}/api/users/logout_all`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
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
      <SEO
        title="PassForge | Edit Profile"
        description="Edit your PassForge account details securely. Update your name, email, avatar, and password while managing account settings and privacy options."
        canonical="https://pass-forge-en.netlify.app/edit-profile"
      />
      <h1>Edit my profile</h1>
      {message && <div className="card-alerte"><p className="status-message">{message}</p></div>}

      <div className="profile-content">
        <div className="avatar-container">
          <label htmlFor="avatar"></label>
          <img
            src={preview || user?.avatar || defaultAvatar}
            alt="avatar preview"
            className="avatar"
          />
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="avatar" className="btn">
            Change avatar
          </label>
        </div>

        <div className="form-edit">
          <form onSubmit={handleSubmit}  encType="multipart/form-data" >

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} className="email-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} className="email-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">New Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} className="email-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirmation">Confirm Password:</label>
              <input
                id="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)} className="email-input"
              />
            </div>

            <div className="form-actions">
              <button type="submit">Update Profile</button>
            </div>
          </form>
        </div>
       </div>

       <div className="actions">
        <div className="buttons-profile"> 
          <button className="btn">Download the extension</button>
          <button className="btn" onClick={() => navigate("/profile")}>go to my profile</button>
        </div>
        <div>
          <button onClick={handleDelete} className="btn">Delete profile</button>
        </div>
      </div>
      
    </div>
  );
};

export default EditProfile;