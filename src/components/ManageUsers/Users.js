import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../services/userService";
import Pagination from "./Pagination/Pagination";
import ModalAddNewUser from "./ModalAdd&UpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import "../ManageUsers/Users.scss";
const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [dataUsers, setDataUser] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [actionModalUser, setActionModalUser] = useState("");
  const [dataModal, setDataModal] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);
  const fetchUsers = async () => {
    let res = await fetchAllUsers(currentPage, currentLimit);
    if (res && res.EC === 1) {
      if (res.DT && res.DT.totalPages) {
        setTotalPages(res.DT.totalPages);
        setListUsers(res.DT.users);
      }
    }
  };
  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
    setDataUser(user);
  };
  const handleEditTable = (user) => {
    fetchUsers();
  };
  const handleEditUser = (user) => {
    setIsShowModal(true);
    setDataModal(user);
    setActionModalUser("UPDATE");
  };
  const handleDeleteUser = async (user) => {
    setShowDelete(true);
    setDataUser(user);
  };
  const handleDeleteFromModal = (user) => {
    fetchUsers();
  };
  const handleAddNew = () => {
    setIsShowModal(true);
    setActionModalUser("CREATE");
  };
  const handleRefresh = async () => {
    await fetchUsers();
  };
  return (
    <>
      <ModalDeleteUser
        setShowDelete={setShowDelete}
        showDelete={showDelete}
        dataUsers={dataUsers}
        handleDeleteFromModal={handleDeleteFromModal}
      />
      <ModalAddNewUser
        handleUpdateTable={handleUpdateTable}
        fetchUsers={fetchUsers}
        actionModalUser={actionModalUser}
        dataModal={dataModal}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
      <div className="user-header">
        <div className="h1 text-center text-primary m-3">Manage User</div>
        <div className="container">
          <div className="d-flex gap-3">
            <span>
              {" "}
              <button
                className="btn btn-primary"
                onClick={() => handleRefresh()}
              >
                {" "}
                <span className="me-2">
                  <i className="fa-solid fa-rotate "></i>
                </span>
                Refresh
              </button>
            </span>
            <span>
              {" "}
              <button
                className="btn btn-primary"
                onClick={() => handleAddNew()}
              >
                {" "}
                <i className="fa-solid fa-user-plus me-2"></i>
                Add new
              </button>
            </span>
          </div>
          <div className="table-container">
            <table className="table table-bordered table-hover mt-4 ">
              <thead>
                <tr className="table-info">
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">User name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Group</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </td>
                          <td>{item?.email}</td>
                          <td>{item?.userName}</td>
                          <td>{item?.phone}</td>
                          <td>{item?.gender}</td>
                          <td>{item?.group ? item.group.des : ""}</td>
                          <td>
                            {" "}
                            <div className="d-flex gap-3">
                              <span>
                                {" "}
                                <button
                                  className="btn btn-warning"
                                  onClick={() => handleEditUser(item)}
                                >
                                  {" "}
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                              </span>
                              <span>
                                {" "}
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteUser(item)}
                                >
                                  {" "}
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td colSpan={7} className="text-center">
                        No list user
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 0 && (
            <div className="row mt-3 ">
              <Pagination
                totalPages={totalPages}
                fetchUsers={fetchUsers}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Users;
