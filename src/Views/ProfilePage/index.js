import Profile from "../../Components/Profile";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import "./styles.css";
import UserAPI from "../../Api/UserAPI";
import SolutionTable from "../../Components/SolutionTable";

export default function ProfilePage(props) {
  const user = "6306b34920cf5f80f7d0c20d";
  const username = "Devin";

  const [userInfo, setUserInfo] = useState({});
  const [solutions, setSolutions] = useState({});
  const [isLoading, setLoading] = useState(true);

  async function getUserDetails(user) {
    setLoading(true);

    await UserAPI.getUserSolutions(user).then((res) => {
      setSolutions(res);
    });
    await UserAPI.getUserProfile(username).then((res) => {
      setUserInfo(res.user);
    });

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  useEffect(() => {
    getUserDetails(user);
  }, []);

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
            style={{ color: "#BD7AFF", width: "8rem", height: "8rem" }}
          />
        </div>
      )}
      {!isLoading && (
        <div className="profile-page-container">
          <Profile
            userInfo={userInfo}
            difficultyDistribution={solutions.difficulty_distribution}
            x={solutions}
          />
          <SolutionTable solutions={solutions} style={{ color: "#BD7AFF" }} />
        </div>
      )}
    </div>
  );
}
