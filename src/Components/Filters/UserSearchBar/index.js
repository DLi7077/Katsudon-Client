import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import { Avatar } from "@mui/material";
import "./styles.css";

const selectStyles = {
  container: (provided, state) => ({
    padding: 0,
    width: "200px",
    flexGrow: 1,
  }),
  control: (provided, state) => ({
    borderRadius: 0,
    backgroundColor: "#3d3d3d",
  }),
  dropdownIndicator: (provided, state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    padding: 0,
  }),
  menu: (provided, state) => ({
    borderRadius: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    color: "white",
    fontSize: "1.25rem",
    backgroundColor: state.isFocused ? "#444444" : "#000000",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: "1.25rem",
    color: "white",
  }),
};

const classes = {
  searchIcon: {
    marginTop: "1px",
    color: "white",
    fontSize: "2.25rem",
  },
  nameLabel: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "1rem",
    color: "white",
  },
  avatarIcon: {
    width: "2.5rem",
    height: "2.5rem",
  },
};

/**
 * @description Provides a user search bar given a list of users
 * @param {any[]} users - an array of user objects
 * @returns A search bar component
 */
export default function UserSearchBar(props) {
  return (
    <div className="user-filter-section">
      <SearchIcon style={classes.searchIcon} />
      <Select
        clearIndicator={true}
        styles={selectStyles}
        value={props.selectedUser}
        onChange={props.setSelectedUser}
        options={props.allUsers}
        formatOptionLabel={(user) => {
          return (
            <div style={classes.nameLabel}>
              <Avatar
                style={classes.avatarIcon}
                src={user.profile_picture_url}
              />
              {user.username}
            </div>
          );
        }}
        placeholder="Search for a User..."
      />
    </div>
  );
}
