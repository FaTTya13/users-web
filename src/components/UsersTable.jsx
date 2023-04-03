import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Checkbox from "./Checkbox";

const UsersTable = (props) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = (e) => {
    if (isCheckAll) {
      setIsCheck([]);
    } else {
      setIsCheck(props.users.map((user) => user.id));
    }
    setIsCheckAll(!isCheckAll);
  };

  const handleClick = (id) => {
    if (isCheck.includes(id)) {
      setIsCheck(isCheck.filter((item) => item !== id));
    } else {
      setIsCheck([...isCheck, id]);
    }
  };

  useEffect(() => {
    props.setUsersId(isCheck);
    props.setisSync(true);
  }, [isCheck]);

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>
            <Checkbox
              type="checkbox"
              name="selectAll"
              id="selectAll"
              handleClick={handleSelectAll}
              isChecked={isCheckAll}
            />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Registry Date</th>
          <th>Last Login Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user, index) => (
          <tr key={user.id}>
            <td>
              <Checkbox
                id={user.id}
                type="checkbox"
                handleClick={() => handleClick(user.id)}
                isChecked={isCheck.includes(user.id)}
              />
            </td>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.createddate.slice(4, 24)}</td>
            <td>{user.lastlogindate.slice(4, 24)}</td>
            <td>{user.userstatus}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;