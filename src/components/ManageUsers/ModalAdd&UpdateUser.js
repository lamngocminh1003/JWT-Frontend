import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import _ from "lodash";
import { fetchAllGroups } from "../../services/groupService";
import { createNewUser, updateUser } from "../../services/userService";
const ModalAddNewUser = (props) => {
  const [groupArr, setGroupArr] = useState("");
  const fetchAllGroupsService = async () => {
    let res = await fetchAllGroups();
    console.log("res", res);
    if (res && res.DT.length > 0 && res.EC === 1) {
      setGroupArr(res.DT);
      setUserData({ ...userData, groupId: res.DT[0].id });
    }
  };
  const defaultUserData = {
    email: "",
    phone: "",
    userName: "",
    gender: "Male",
    groupId: groupArr && groupArr.length > 0 ? groupArr[0].id : "",
    address: "",
    password: "",
  };
  const [userData, setUserData] = useState(defaultUserData);

  let {
    handleUpdateTable,
    fetchUsers,
    actionModalUser,
    isShowModal,
    setIsShowModal,
    dataModal,
  } = props;
  const validInputsDefault = {
    email: true,
    phone: true,
    userName: true,
    gender: true,
    groupId: true,
    address: true,
    password: true,
  };
  const [validInput, setValidInput] = useState(validInputsDefault);

  const handleClose = async () => {
    setUserData(defaultUserData);
    setIsShowModal(false);
    await fetchUsers();
    setValidInput(validInputsDefault);
  };
  useEffect(() => {
    if (actionModalUser === "CREATE") {
      if (groupArr && groupArr.length > 0) {
        setUserData({ ...userData, groupId: groupArr[0].id });
      }
    }
  }, [actionModalUser]);
  useEffect(() => {
    fetchAllGroupsService();
  }, []);
  useEffect(() => {
    if (actionModalUser === "CREATE") {
      setUserData({
        ...defaultUserData,
        groupId: groupArr[0].id,
        gender: "Male",
      });
    }
    if (actionModalUser === "UPDATE") {
      setUserData(dataModal);
    }
  }, [dataModal]);

  const checkValidInputs = () => {
    if (actionModalUser === "UPDATE") {
      return true;
    }
    setValidInput(validInputsDefault);
    let arr = ["email", "phone", "groupId", "password"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        toast.error(`Empty input ${arr[i]}`);
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);
        check = false;
        break;
      }
    }
    return check;
  };
  const handleOnClickAdd = async () => {
    let check = checkValidInputs();
    if (check === true) {
      let res =
        actionModalUser === "CREATE"
          ? await createNewUser(userData)
          : await updateUser(userData);
      if (res && res.EC === 0) {
        //success
        setUserData({
          ...defaultUserData,
          groupId: groupArr && groupArr.length > 0 ? groupArr[0].id : "",
          gender: "Male",
        });
        toast.success(res.EM);
        handleUpdateTable({
          userData,
        });
        fetchUsers();
        handleClose();
      }
      if (res && res.EC === 1) {
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput[res.DT] = false;
        setValidInput(_validInput);
        toast.error(res.EM);
      }
      if (res && res.EC === -2) {
        toast.error(res.EM);
      }
    }
  };
  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };
  console.log("userData", userData);
  return (
    <>
      <Modal backdrop="static" centered show={isShowModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 text-uppercase text-primary">
            {actionModalUser === "CREATE" ? "Create new user" : "Update user"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Email
            </span>
            <input
              type="text"
              className={
                validInput.email ? "form-control" : "form-control is-invalid"
              }
              disabled={actionModalUser === "UPDATE" ? true : false}
              placeholder="Enter your email"
              value={userData.email}
              onChange={(event) => {
                handleOnChangeInput(event.target.value, "email");
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Username (<span className="text-danger">*</span>):
            </span>
            <input
              type="text"
              className={
                validInput.userName ? "form-control" : "form-control is-invalid"
              }
              placeholder="Enter your userName"
              value={userData.userName}
              onChange={(event) => {
                handleOnChangeInput(event.target.value, "userName");
              }}
            />
          </div>
          {actionModalUser === "CREATE" && (
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Password
              </span>
              <input
                type="password"
                className={
                  validInput.password
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Enter your password"
                value={userData.password}
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "password");
                }}
              />
            </div>
          )}
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Gender
            </span>
            <select
              value={userData.gender}
              className={
                validInput.gender ? "form-select" : "form-select is-invalid"
              }
              onChange={(event) => {
                handleOnChangeInput(event.target.value, "gender");
              }}
            >
              <option defaultValue="Male">Male</option>
              <option value="Female">Female </option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Phone
            </span>
            <input
              disabled={actionModalUser === "UPDATE" ? true : false}
              type="text"
              className={
                validInput.phone ? "form-control" : "form-control is-invalid"
              }
              placeholder="Enter your phone"
              value={userData.phone}
              onChange={(event) => {
                handleOnChangeInput(event.target.value, "phone");
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Address
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your address"
              value={userData.address}
              onChange={(event) => {
                handleOnChangeInput(event.target.value, "address");
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Group
            </span>
            <select
              value={userData.groupId}
              className={
                validInput.groupId ? "form-select" : "form-select is-invalid"
              }
              onChange={(event) => {
                handleOnChangeInput(event.target.value, "groupId");
              }}
              s
            >
              {groupArr &&
                groupArr.length > 0 &&
                groupArr.map((item, index) => {
                  return (
                    <option key={`groupId-${index}`} value={item.id}>
                      {item.des}
                    </option>
                  );
                })}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleOnClickAdd()}>
            {actionModalUser === "CREATE" ? "Save" : "Update"}{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalAddNewUser;
