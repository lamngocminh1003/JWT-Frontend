import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import _ from "lodash";
import { updateUser } from "../../services/userService";
const ModalEditUser = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [groupId, setGroupId] = useState("");
  const [id, setId] = useState("");
  let { handleEditTable, setShowEdit, showEdit, dataUsers } = props;
  const handleClose = () => setShowEdit(false);
  const handleShow = () => setShowEdit(true);
  const handleOnClickEdit = async () => {
    if (!userName && !email && !groupId) {
      toast.error("Invalid username & email && groupId!");
      return;
    }
    if (!userName) {
      toast.error("Invalid userName!");
      return;
    }
    if (!email) {
      toast.error("Invalid email!");
      return;
    }
    let res = await updateUser(
      id,
      email,
      userName,
      phone,
      address,
      gender,
      groupId
    );
    console.log("res", res);
    if (res && res.data && res.data.EC === 1) {
      //success
      setShowEdit(false);
      toast.success("Update user successfully");
      setEmail("");
      setAddress("");
      setGender("");
      setUserName("");
      setPhone("");
      setId("");
      setGroupId("");
      setPassword("");
      handleEditTable({
        userName: dataUsers.userName,
        id: dataUsers.id,
        email: dataUsers.email,
        phone: dataUsers.phone,
        address: dataUsers.address,
        groupId: dataUsers.groupId,
        gender: dataUsers.gender,
      });
    }
  };
  useEffect(() => {
    if (showEdit) {
      setUserName(dataUsers.userName);
      setAddress(dataUsers.address);
      setEmail(dataUsers.email);
      setGender(dataUsers.gender);
      setGroupId(dataUsers.groupId);
      setPhone(dataUsers.phone);
      setId(dataUsers.id);
    }
  }, [dataUsers]);
  return (
    <>
      <Modal backdrop="static" show={showEdit} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 text-uppercase text-primary">
            Edit user
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control" value={id} hidden />
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Username
            </span>
            <input
              type="text"
              className="form-control"
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Password
            </span>
            <input
              type="password"
              className="form-control"
              defaultValue="password"
              readOnly
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Address
            </span>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Email
            </span>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              GroupId
            </span>
            <input
              type="text"
              className="form-control"
              value={groupId}
              onChange={(event) => {
                setGroupId(event.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Gender
            </span>
            <input
              type="text"
              className="form-control"
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Phone
            </span>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleOnClickEdit()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalEditUser;
