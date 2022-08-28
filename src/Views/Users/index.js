import { useEffect, useState } from "react";
import { get, pick } from "lodash";
import UserFilter from "../../Components/Filters/UserSearchBar";
import UserProfile from "../../Components/UserProfile";
import UserAPI from "../../Api/UserAPI";
import "./styles.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Users(props) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currrentUserDetails, setCurrentUserDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);

  async function getAllUsers() {
    await UserAPI.getAllUsers().then((res) => {
      const allUsers = res.users.map((userDetails) => {
        return pick(userDetails, ["username", "profile_picture_url"]);
      });

      setUsers(allUsers);
    });
  }

  async function getSelectedUserDetails(selectedUser) {
    const username = get(selectedUser, "username");
    await UserAPI.getUserProfile(username).then((res) => {
      setCurrentUserDetails(res.user);
    });
  }

  // Runs on page load, fetches all users
  useEffect(() => {
    setLoading(true);

    getAllUsers();

    setLoading(false);
  }, []);

  // Runs on User Selection, loads user profile card
  useEffect(() => {
    setLoading(true);

    selectedUser && getSelectedUserDetails(selectedUser);

    setLoading(false);
  }, [selectedUser]);

  return (
    <div
      className="content-container"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="user-page-content-container">
        <div className="user-page-search-container">
          {!isLoading && (
            <UserFilter
              allUsers={users}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          )}
        </div>
        <div className="user-page-user-profile-container">
          {!isLoading && currrentUserDetails && (
            <>
              <UserProfile userInfo={currrentUserDetails} />
              <Link
                to={`/profile?user=${get(selectedUser, "username")}`}
                style={{ textDecoration: "none" }}
              >
                <Button style={{ color: "white", fontSize: "1.25rem" }}>
                  View Profile
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
