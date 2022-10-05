import { Avatar, Modal } from "@mui/material";
import { get, map } from "lodash";
import React from "react";
import { Link } from "react-router-dom";

/**
 * @description Generates a follower list
 * @param {*} props given a list of usernames and associated profile pictures
 * @returns A follower list popup
 */
export default function FollowList(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="follow-list"
        style={{
          backgroundColor: "#18171C",
        }}
      >
        <div style={{ fontSize: "2rem" }}>
          {props.title}({(props.users ?? []).length})
        </div>
        {map(props.users, (user, idx) => {
          return (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                gap: "1rem",
              }}
            >
              <Avatar src={get(user, "profile_picture_url")} />
              <Link
                to={`/profile?user_id=${user._id}`}
                style={{
                  fontSize: "1.25rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <span className="hover-link">{get(user, "username")}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
