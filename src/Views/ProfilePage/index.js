import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserProfile from "../../Components/UserProfile";
import { PAGETHEME } from "../../Constants/colors";
import CircularProgress from "@mui/material/CircularProgress";
import getSearchParams from "../../Utils/getSearchParams";
import UserAPI from "../../Api/UserAPI";
import SolutionTable from "../../Components/SolutionTable";
import SolutionModal from "../../Components/SolutionModal";
import "./styles.css";
import { get } from "lodash";

export default function ProfilePage(props) {
  const queryParams = getSearchParams(useLocation());
  const username = get(queryParams, "user");
  const [userInfo, setUserInfo] = useState(null);
  const [solutions, setSolutions] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [solutionDisplay, setSolutionDisplay] = useState(false);
  const [problemBlock, setProblemBlock] = useState({});
  const [solutionsBlock, setSolutionsBlock] = useState({});

  async function getUserDetails(username) {
    setLoading(true);
    let user_id;

    await UserAPI.getUserProfile(username)
      .then((res) => {
        setUserInfo(res.user);
        user_id = res.user._id;
      })
      .catch(() => {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });

    await UserAPI.getUserSolutions(user_id).then((res) => {
      setSolutions(res);
    });

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  const handleOpenSolutionModel = (problem, solutions) => {
    setProblemBlock(problem);
    setSolutionsBlock(solutions);
    setSolutionDisplay(true);
  };

  const handleCloseSolutionModel = () => {
    setProblemBlock({});
    setSolutionsBlock({});
    setSolutionDisplay(false);
  };

  useEffect(() => {
    getUserDetails(username);
  }, [username]);

  return (
    <div className="content-container">
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
            style={{ color: PAGETHEME.Purple, width: "8rem", height: "8rem" }}
          />
        </div>
      )}
      {userInfo && !isLoading && (
        <>
          <div className="profile-page-container">
            <UserProfile userInfo={userInfo} />
            <SolutionTable
              solutions={solutions}
              handleOpenSolutionModel={handleOpenSolutionModel}
              style={{ color: PAGETHEME.Purple }}
            />
            <SolutionModal
              open={solutionDisplay}
              handleClose={handleCloseSolutionModel}
              problem={problemBlock}
              solutions={solutionsBlock}
            />
          </div>
        </>
      )}
      {!userInfo && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: "2rem",
            color: "white",
          }}
        >
          "{username}" is not a valid user
        </div>
      )}
    </div>
  );
}
