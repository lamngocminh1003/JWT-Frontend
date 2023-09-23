import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import _ from "lodash";
import { deleteUser } from "../../services/userService";
const ModalDeleteUser = (props) => {
  let { handleDeleteFromModal, setShowDelete, showDelete, dataUsers } = props;
  const handleClose = () => setShowDelete(false);
  const [userId, setId] = useState(dataUsers.id);
  const [userName, setUserName] = useState(dataUsers.userName);

  const handleOnClickDelete = async (userId) => {
    let id = userId;
    let res = await deleteUser(+id);
    if (res && res.EC === 1) {
      //success
      setShowDelete(false);
      toast.success("Delete user successfully");
      handleDeleteFromModal(dataUsers);
    } else {
      toast.error("Delete user error");
    }
  };
  useEffect(() => {
    if (showDelete) {
      setId(dataUsers.id);
      setUserName(dataUsers.userName);
    }
  }, [dataUsers]);
  return (
    <>
      <Modal show={showDelete} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 text-uppercase text-primary">
            Delete user
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control" value={userId} hidden />
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Do you want to delete {userName}'s user
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleOnClickDelete(userId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalDeleteUser;
