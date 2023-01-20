import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { get, pick } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updateFollowing } from "../../Store/Reducers/user";
import {
  setSnackbarSuccess,
  setSnackbarWarning,
} from "../../Store/Reducers/snackbar";
import { IconButton } from "@mui/material";
import useSolutionModal from "../../Hooks/useSolutionModal";
import UserProfile from "../../Components/User/UserProfile";
import UserAPI from "../../Api/UserAPI";
import SolutionTable from "../../Components/SolutionTable";
import getSearchParams from "../../Utils/getSearchParams";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import Banner from "./Banner";
import "./styles.css";
import {
  setLoaded,
  startLoading,
  stopLoading,
} from "../../Store/Reducers/progress";
import useSolutionQuery from "../../Hooks/useSolutionQuery";
import coalesceQuery from "../../Utils/coalesceQuery";
import SolutionFilter from "../../Components/Filters/SolutionFilter";
import SolutionCalendar from "../../Components/SolutionCalendar.js";
import SolutionDistribution from "../../Components/SolutionDistribution";

const classes = {
  follow: {
    position: "absolute",
    top: "4px",
    right: "5px",
    color: "white",
  },
  loadingFollow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "350px",
    minWidth: "250px",
    backgroundColor: "black",
    border: "2px solid #FF66EB",
    borderRadius: "8px",
  },
};

export default function ProfilePage(props) {
  const currentUser = useSelector((state) => state.user);
  const progress = useSelector((state) => state.progress);

  const dispatch = useDispatch();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState(null);
  const [solutions, setSolutions] = useState({});
  const [tableLoading, setTableLoading] = useState(true);
  const [solutionCalendar, setSolutionCalendar] = useState([]);

  const {
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
    problemTags,
    setProblemTags,
    difficulty,
    setDifficulty,
  } = useSolutionQuery();

  const [queryParams, setQueryParams] = useState(
    coalesceQuery(
      {
        user_id:
          get(getSearchParams(location), "user_id") ??
          get(currentUser, "user_id"),
        sortBy: sortBy,
        sortDir: sortDir,
        tags: problemTags,
        difficulty: difficulty,
      },
      ["tags", "difficulty"]
    )
  );

  function updateSkillQuery(tagList) {
    setProblemTags(tagList);
  }

  useEffect(() => {
    const compliedQuery = {
      user_id:
        get(getSearchParams(location), "user_id") ??
        get(currentUser, "user_id"),
      sortBy: sortBy,
      sortDir: sortDir,
      tags: problemTags,
      difficulty: difficulty === "All" ? "" : difficulty,
    };

    setQueryParams(coalesceQuery(compliedQuery, ["tags", "difficulty"]));
  }, [sortBy, sortDir, problemTags, difficulty, location, currentUser]);

  const { handleOpenSolutionModel, SolutionModalComponent } =
    useSolutionModal();

  // retrieves user's info for profile card
  async function getUserDetails() {
    if (!queryParams.user_id) {
      return;
    }

    const compliedQuery = {
      // ...queryParams,
      user_id:
        get(getSearchParams(location), "user_id") ??
        get(currentUser, "user_id"),
    };

    await UserAPI.getUserProfile(compliedQuery)
      .then(async (res) => {
        setUserInfo(res.user);
        const userId = get(res.user, "_id");
        await getSolutionCalendar(userId);
      })
      .catch(() => {
        setUserInfo(undefined);
      });
  }

  async function getSolutionCalendar(userId) {
    await UserAPI.getSolutionCalendar(userId).then((res) => {
      setSolutionCalendar(res.calendar);
    });
  }

  async function getSolutions() {
    setTableLoading(true);
    await UserAPI.getUserSolutions(queryParams)
      .then((res) => {
        setSolutions(res);
      })
      .finally(() => {
        setTableLoading(false);
      });
  }

  async function handleFollowClick() {
    if (!get(currentUser, "logged_in")) {
      dispatch(setSnackbarWarning("You must be logged in to follow users"));
      return;
    }

    const willUnfollow = (currentUser.following ?? []).includes(userInfo._id);

    const followFunction = willUnfollow
      ? UserAPI.unfollowUser
      : UserAPI.followUser;

    await followFunction(userInfo._id, get(currentUser, "auth_token"))
      .then((res) => {
        const updatedFollowingList = {
          following: get(res.users[0], "following"),
        };
        const otherUser = get(res.users[1], "username");
        dispatch(updateFollowing(updatedFollowingList));

        const followStatusMessage = `${
          willUnfollow ? "Unfollowed" : "Following"
        } ${otherUser}`;

        dispatch(setSnackbarSuccess(followStatusMessage));
      })
      .then(async () => {
        // refetch to update user's following list
        await UserAPI.getUserProfile(queryParams)
          .then((res) => {
            setUserInfo(res.user);
          })
          .catch(() => {
            setUserInfo(null);
          });
      })
      .catch((e) => {
        console.error("could not follow/unfollow user");
      });
  }

  useEffect(() => {
    dispatch(startLoading());

    setQueryParams({
      ...queryParams,
      ...(!!queryParams.user_id
        ? pick(getSearchParams(location), "user_id")
        : { user_id: get(currentUser, "user_id") }),
    });

    getUserDetails().then(() => {
      setTimeout(() => {
        dispatch(setLoaded());
        setTimeout(() => {
          dispatch(stopLoading());
        }, 600);
      }, 100);
    });
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    getSolutions();
    // eslint-disable-next-line
  }, [queryParams]);

  function FollowIcon() {
    return (
      <IconButton style={classes.follow} onClick={handleFollowClick}>
        {(currentUser.following ?? []).includes(userInfo._id) ? (
          <PersonRemoveAlt1Icon
            style={{ fontSize: "2rem", color: "#FF7A7A" }}
          />
        ) : (
          <PersonAddAlt1Icon style={{ fontSize: "2rem", color: "#7AFF87" }} />
        )}
      </IconButton>
    );
  }

  return (
    <div
      className="content-container"
      style={{ backgroundColor: props.backgroundColor, paddingTop: 0 }}
    >
      {userInfo && progress.loaded && (
        <>
          <Banner
            userId={get(userInfo, "_id")}
            bannerUrl={get(userInfo, "profile_banner_url")}
          />
          <div className="profile-page-container">
            <div className="profile-calendar-container">
              <div style={{ position: "relative", width: "fit-content" }}>
                <UserProfile userInfo={userInfo} borderColor="#FF66EB" />
                {get(currentUser, "user_id") !== userInfo._id && <FollowIcon />}
              </div>
              <SolutionDistribution solvedProblems={userInfo.solved} />
              <SolutionCalendar
                calendar={solutionCalendar}
                color={props.color}
              />
            </div>
            <div style={{ width: "100%" }}>
              <div className="solution-table-query-container">
                <SolutionFilter
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                  problemTags={problemTags}
                  setProblemTags={setProblemTags}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  sortDir={sortDir}
                  setSortDir={setSortDir}
                  solved={userInfo.solved}
                  selectedTags={problemTags}
                  updateSkillQuery={updateSkillQuery}
                />
                <SolutionTable
                  solutions={solutions.rows}
                  handleOpenSolutionModel={handleOpenSolutionModel}
                  headerColor={props.color}
                  backgroundColor={`${props.color}11`}
                  loading={tableLoading}
                />
              </div>
              <SolutionModalComponent />
            </div>
          </div>
        </>
      )}
      {!userInfo && progress.loaded && (
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
