import Profile from "../../Components/Profile";

export default function ProfilePage(props) {
  const x = <Profile />;
  return (
    <div className="content-container">
      <div style={{ padding: "2rem" }}>{x}</div>
    </div>
  );
}
