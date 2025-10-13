import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { token, user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
         console.log("Token:", token);
        const res = await fetch("http://localhost:3000/member-data", {
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

  return (
    <div className="container">
      <h1>My profile</h1>
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;