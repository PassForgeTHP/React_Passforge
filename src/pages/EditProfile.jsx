import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const EditProfile = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || null);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

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
      const response = await fetch("http://localhost:3000/users", {
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
      } else {
        setMessage(`${data.message || "Update failed."}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="container-profile">
      <h1>Edit my profile</h1>
      <form onSubmit={handleSubmit} className="profile-form" encType="multipart/form-data">

        <div className="form-group">
          <label htmlFor="avatar">Avatar:</label>
          {preview && (
            <img
              src={preview}
              alt="avatar preview"
              style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", marginBottom: "1rem" }}
            />
          )}
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="passwordConfirmation">Confirm Password:</label>
          <input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-update">Update Profile</button>
      </form>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default EditProfile;