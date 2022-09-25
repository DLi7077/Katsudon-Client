import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserProfile from "../../Components/User/UserProfile";
import { CircularProgress, IconButton } from "@mui/material";
import getSearchParams from "../../Utils/getSearchParams";
import UserAPI from "../../Api/UserAPI";
import SolutionTable from "../../Components/SolutionTable";
import SolutionModal from "../../Components/SolutionModal";
import "./styles.css";
import SkillBox from "../../Components/User/Skillbox";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import banner from "../../Assets/banner.jpg";
import { get, omit, pick } from "lodash";
import currentUser from "../../Utils/UserTools";

import { currentUserS } from "../../Utils/UserTools";

const classes = {
  follow: {
    position: "absolute",
    top: "4px",
    right: "5px",
    color: "white",
  },
};

export default function ProfilePage(props) {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [solutions, setSolutions] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [awaitFollow, setAwaitFollow] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [solutionDisplay, setSolutionDisplay] = useState(false);
  const [problemBlock, setProblemBlock] = useState({});
  const [solutionsBlock, setSolutionsBlock] = useState({});
  const [sortBy, setSortBy] = useState("last_solved_at");
  const [sortDir, setSortDir] = useState(1);
  const [queryParams, setQueryParams] = useState({
    user_id: get(getSearchParams(location), "user_id") ?? currentUser("_id"),
    sortBy: sortBy,
    sortDir: "desc",
  });

  async function getUserDetails() {
    setLoading(true);
    if (!queryParams.user_id) {
      setLoading(false);
      return;
    }
    await UserAPI.getUserProfile(queryParams)
      .then((res) => {
        setUserInfo(res.user);
      })
      .catch(() => {
        setUserInfo(null);
      })
      .finally(
        setTimeout(() => {
          setLoading(false);
        }, 200)
      );
  }

  async function getSolutions() {
    setTableLoading(true);
    await UserAPI.getUserSolutions(queryParams).then((res) => {
      setSolutions(res);
    });

    setTimeout(() => {
      setTableLoading(false);
    }, 500);
  }

  const directionMapping = {
    0: null,
    1: "desc",
    2: "asc",
  };

  function handleSortDirChange(sortBy) {
    const currDirection = (sortDir + 1) % 3;
    setQueryParams({
      ...queryParams,
      sortBy: sortBy,
      sortDir: directionMapping[currDirection],
    });
    setSortBy(sortBy);
    setSortDir(currDirection);
  }

  function updateSkillQuery(tagList) {
    setQueryParams(
      tagList.length
        ? { ...queryParams, tags: tagList }
        : omit(queryParams, "tags")
    );
  }

  function handleOpenSolutionModel(problem, solutions) {
    setProblemBlock(problem);
    setSolutionsBlock(solutions);
    setSolutionDisplay(true);
  }

  function handleCloseSolutionModel() {
    setProblemBlock({});
    setSolutionsBlock({});
    setSolutionDisplay(false);
  }

  async function handleFollowClick() {
    setAwaitFollow(true);

    const followFunction = (currentUser("following") ?? []).includes(
      userInfo._id
    )
      ? UserAPI.unfollowUser
      : UserAPI.followUser;

    await followFunction(userInfo._id, currentUser("auth_token"))
      .then((res) => {
        localStorage.setItem(
          "katsudon-lc-following",
          JSON.stringify(get(res.users[0], "following"))
        );
      })
      .then(async () => {
        await UserAPI.getUserProfile(queryParams)
          .then((res) => {
            setUserInfo(res.user);
          })
          .catch(() => {
            setUserInfo(null);
          })
          .finally(setLoading(false));
      })
      .catch((e) => {
        console.log("error trying to follow/unfollow user");
      });

    setAwaitFollow(false);
  }

  useEffect(() => {
    setQueryParams({
      ...queryParams,
      ...pick(getSearchParams(location), "user_id"),
    });
    if (!queryParams.user_id) {
      setQueryParams({
        ...queryParams,
        user_id: currentUser("_id"),
      });
    }
    getUserDetails();
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    getSolutions();
    // eslint-disable-next-line
  }, [queryParams]);

  return (
    <div
      className="content-container"
      style={{ backgroundColor: props.backgroundColor, padding: 0 }}
    >
      <img src={banner} style={{ width: "100%" }} alt="elaina eating" />
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress
            style={{ color: props.color, width: "8rem", height: "8rem" }}
          />
        </div>
      )}

      {userInfo && !isLoading && (
        <>
          <div className="profile-page-container">
            <div className="user-profile-wrapper">
              {awaitFollow && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    height: "350px",
                    minWidth: "250px",
                    backgroundColor: "black",
                    border: "2px solid #FF66EB",
                    borderRadius: "8px",
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
              {!awaitFollow && (
                <>
                  {currentUser("_id") !== userInfo._id && (
                    <IconButton
                      style={classes.follow}
                      onClick={handleFollowClick}
                    >
                      {(currentUser("following") ?? []).includes(
                        userInfo._id
                      ) ? (
                        <PersonRemoveAlt1Icon
                          style={{ fontSize: "2rem", color: "#FF7A7A" }}
                        />
                      ) : (
                        <PersonAddAlt1Icon
                          style={{ fontSize: "2rem", color: "#7AFF87" }}
                        />
                      )}
                    </IconButton>
                  )}
                  <UserProfile userInfo={userInfo} borderColor="#FF66EB" />
                </>
              )}

              <SkillBox
                solved={userInfo.solved}
                updateSkillQuery={updateSkillQuery}
              />
            </div>
            <div style={{ overflow: "auto" }}>
              <SolutionTable
                solutions={solutions.rows}
                handleOpenSolutionModel={handleOpenSolutionModel}
                headerColor={props.color}
                backgroundColor={"#382E37"}
                handleSortDirChange={handleSortDirChange}
                loading={tableLoading}
                queryParams={queryParams}
                sortBy={sortBy}
                sortDir={sortDir}
              />
            </div>
            <SolutionModal
              open={solutionDisplay}
              handleClose={handleCloseSolutionModel}
              problem={problemBlock}
              solutions={solutionsBlock}
            />
          </div>
        </>
      )}
      {!isLoading && !userInfo && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            color: "white",
          }}
        >
          Invalid User
        </div>
      )}
    </div>
  );
}
