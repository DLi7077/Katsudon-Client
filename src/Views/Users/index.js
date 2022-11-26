import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoaded,
  startLoading,
  stopLoading,
} from "../../Store/Reducers/progress";
import { get, pick } from "lodash";
import UserFilter from "../../Components/Filters/UserSearchBar";
import UserProfile from "../../Components/User/UserProfile";
import UserAPI from "../../Api/UserAPI";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Users(props) {
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.progress);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currrentUserDetails, setCurrentUserDetails] = useState(null);
  const [userProfileLoading, setUserProfileLoading] = useState(false);

  async function getAllUsers() {
    dispatch(startLoading());
    await UserAPI.getAllUsers()
      .then((res) => {
        const allUsers = res.users.map((userDetails) => {
          return pick(userDetails, ["_id", "username", "profile_picture_url"]);
        });
        setUsers(allUsers);
        setTimeout(() => {
          dispatch(setLoaded());
        }, 100);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(stopLoading());
        }, 600);
      });
  }

  async function getSelectedUserDetails(user_id) {
    await UserAPI.getUserProfile(user_id).then((res) => {
      setCurrentUserDetails(res.user);
    });
  }

  // Runs on page load, fetches all users
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  // Runs on User Selection, loads user profile card
  useEffect(() => {
    setUserProfileLoading(true);
    selectedUser && getSelectedUserDetails(selectedUser);
    setTimeout(() => {
      setUserProfileLoading(false);
    }, 100);
  }, [selectedUser]);

  return (
    <div
      className="content-container"
      style={{ backgroundColor: props.backgroundColor, position: "relative" }}
    >
      <div className="user-page-content-container">
        <div className="user-page-search-container">
          {progress.loaded && (
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
          {progress.loaded && userProfileLoading && (
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
          {!userProfileLoading && !!currrentUserDetails && (
            <>
              <UserProfile userInfo={currrentUserDetails} />
              <Link
                to={`/profile?user_id=${get(selectedUser, "_id")}`}
                className="problem-link"
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
