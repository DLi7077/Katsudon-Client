import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserProfile from "../../Components/User/UserProfile";
import { CircularProgress } from "@mui/material";
import getSearchParams from "../../Utils/getSearchParams";
import UserAPI from "../../Api/UserAPI";
import SolutionTable from "../../Components/SolutionTable";
import SolutionModal from "../../Components/SolutionModal";
import "./styles.css";
import SkillBox from "../../Components/User/Skillbox";
import banner from "../../Assets/banner.jpg";

export default function ProfilePage(props) {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [solutions, setSolutions] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const [solutionDisplay, setSolutionDisplay] = useState(false);
  const [problemBlock, setProblemBlock] = useState({});
  const [solutionsBlock, setSolutionsBlock] = useState({});
  const [queryParams, setQueryParams] = useState(getSearchParams(location));
  const [sortBy, setSortBy] = useState("problem_id");
  const [sortDir, setSortDir] = useState(0);

  async function getUserDetails() {
    setLoading(true);
    await UserAPI.getUserProfile(queryParams)
      .then((res) => {
        setUserInfo(res.user);
      })
      .catch(() => {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });

    setTimeout(() => {
      setLoading(false);
    }, 500);
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

  function addFilter(queryParam) {
    setQueryParams({
      ...queryParams,
      ...queryParam,
    });
  }

  const directionMapping = {
    0: null,
    1: "desc",
    2: "asc",
  };

  const handleSortDirChange = (sortBy) => {
    const currDirection = (sortDir + 1) % 3;
    addFilter({
      sortBy: sortBy,
      sortDir: directionMapping[currDirection],
    });
    setSortBy(sortBy);
    setSortDir(currDirection);
  };

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
    getUserDetails();
  }, []);

  useEffect(() => {
    getSolutions();
  }, [queryParams]);

  return (
    <div
      className="content-container"
      style={{ backgroundColor: props.backgroundColor }}
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
              <UserProfile userInfo={userInfo} borderColor="#FF66EB" />
              <SkillBox solved={userInfo.solved} />
            </div>
            <div>
              <div>
                <SolutionTable
                  solutions={solutions.rows}
                  handleOpenSolutionModel={handleOpenSolutionModel}
                  headerColor={props.color}
                  backgroundColor={"#382E37"}
                  handleSortDirChange={handleSortDirChange}
                  loading={tableLoading}
                  addFilter={addFilter}
                  queryParams={queryParams}
                  sortBy={sortBy}
                  sortDir={sortDir}
                />
              </div>
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
          "{"sdfsf"}" is not a valid user
        </div>
      )}
    </div>
  );
}
