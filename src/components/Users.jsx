import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable";
import { Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const [isSync, setisSync] = useState(null);
  const [usersId, setUsersId] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    setisSync(false);
    axios({
      method: "GET",
      url: "https://users-api-vxh0.onrender.com/users",
    })
      .then((response) => {
        if (response.data) {
          setUsers(response.data);
          response.data.some((data) => {
            if (data.id === Number(cookies.get("user-info"))) {
              data.userstatus === "blocked"
                ? props.setisBlocked(true)
                : props.setisBlocked(false);
            }
          });
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [isSync]);

  const deleteUser = (usersId) => {
    usersId.map((id) => {
      axios({
        method: "DELETE",
        url: `https://users-api-vxh0.onrender.com/users/${id}`,
        data: id,
      });
    });
    if (usersId.includes(Number(cookies.get("user-info")))) {
      cookies.remove("user-info", { path: "/" });
      props.setisBlocked(true);
    }
    setisSync(true);
  };

  const blockUser = (usersId) => {
    usersId.map((id) => {
      axios({
        method: "PUT",
        url: `https://users-api-vxh0.onrender.com/users/${id}`,
        data: {
          userstatus: "blocked",
        },
      });
    });
    if (usersId.includes(Number(cookies.get("user-info")))) {
      cookies.remove("user-info", { path: "/" });
      props.setisBlocked(true);
    }
    setisSync(true);
  };

  const unblockUser = (usersId) => {
    usersId.map((id) => {
      axios({
        method: "PUT",
        url: `https://users-api-vxh0.onrender.com/users/${id}`,
        data: {
          userstatus: "active",
        },
      });
    });
    setisSync(true);
    props.setisBlocked(false);
  };

  return (
    <>
      <h1 className="text-center">Users Panel</h1>
      <div>
        <Button
          variant="warning"
          className="mb-2 ms-2"
          type="button"
          onClick={() => blockUser(usersId)}
        >
          Block
        </Button>
        <Button
          variant="primary"
          className="mb-2 ms-2"
          type="button"
          onClick={() => unblockUser(usersId)}
        >
          Unblock
        </Button>
        <Button
          variant="danger"
          className="mb-2 ms-2"
          type="button"
          onClick={() => deleteUser(usersId)}
        >
          Delete
        </Button>
      </div>
      <UsersTable setUsersId={setUsersId} users={users} setisSync={setisSync} />
    </>
  );
};

export default Users;