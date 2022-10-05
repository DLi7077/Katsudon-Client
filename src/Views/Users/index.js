import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { get, pick } from "lodash";
import UserFilter from "../../Components/Filters/UserSearchBar";
import UserProfile from "../../Components/User/UserProfile";
import UserAPI from "../../Api/UserAPI";
import "./styles.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Users(props) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currrentUserDetails, setCurrentUserDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [userProfileLoading, setUserProfileLoading] = useState(false);

  async function getAllUsers() {
    setLoading(true);
    await UserAPI.getAllUsers().then((res) => {
      const allUsers = res.users.map((userDetails) => {
        return pick(userDetails, ["_id", "username", "profile_picture_url"]);
      });

      setUsers(allUsers);
    });

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  async function getSelectedUserDetails(user_id) {
    await UserAPI.getUserProfile(user_id).then((res) => {
      setCurrentUserDetails(res.user);
    });
  }

  // Runs on page load, fetches all users
  useEffect(() => {
    getAllUsers();
  }, []);

  // Runs on User Selection, loads user profile card
  useEffect(() => {
    setUserProfileLoading(true);
    selectedUser && getSelectedUserDetails(selectedUser);
    setTimeout(() => {
      setUserProfileLoading(false);
    }, 500);
  }, [selectedUser]);

  return (
    <div
      className="content-container"
      style={{ backgroundColor: props.backgroundColor, position: "relative" }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            translate: "-50% -50%",
          }}
        >
          <CircularProgress
            style={{ color: props.color, width: "8rem", height: "8rem" }}
          />
        </div>
      )}
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
        <div
          className="user-page-user-profile-container"
          style={{ position: "relative" }}
        >
          {!isLoading && userProfileLoading && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                translate: "-50% -50%",
              }}
            >
              <CircularProgress
                style={{
                  color: props.color,
                  width: "4rem",
                  height: "4rem",
                }}
              />
            </div>
          )}
          {!userProfileLoading && currrentUserDetails && (
            <>
              <UserProfile userInfo={currrentUserDetails} />
              <Link
                to={`/profile?user_id=${get(selectedUser, "_id")}`}
                className='problem-link'
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
