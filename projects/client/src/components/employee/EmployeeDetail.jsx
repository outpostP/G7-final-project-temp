import { Avatar, Button, Switch, Td, Tr, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCashier } from "../../services/reducer/employeeReducer";
import { UpdateCashierModal } from "./UpdateCashier";
import { ResetPasswordModal } from "./ChangePassword";
import axios from "axios";

const baseUrl = "http://localhost:8000/";

const updateStatus = async (userId, isActive) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.patch(
      `${baseUrl}profile/status`,
      {
        cashierId: userId,
        isActive: isActive,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return ["success", data];
  } catch (err) {
    console.log(err.message);
    return "error";
  }
};

export const EmployeeDetail = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.dataEmployee.dataUser);
  const [editModalStates, setEditModalStates] = useState({});
  const [resetModalStates, setResetModalStates] = useState({});
  const [switchStates, setSwitchStates] = useState({});
  const toast = useToast();

  const handleToast = (props, content) => {
    toast({
      description: content,
      status: props,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const handleSwitchChange = async (itemId) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [itemId]: !prevStates[itemId],
    }));
    await updateStatus(itemId, !switchStates[itemId]);
    if (!switchStates[itemId]) {
      handleToast("success", "Enable");
    } else {
      handleToast("error", "Disable");
    }
    dispatch(getAllCashier());
  };

  const openResetModal = (itemId) => {
    setResetModalStates((prevStates) => ({
      ...prevStates,
      [itemId]: true,
    }));
  };

  const closeResetModal = (itemId) => {
    setResetModalStates((prevStates) => ({
      ...prevStates,
      [itemId]: false,
    }));
  };

  const openEditModal = (itemId) => {
    setEditModalStates((prevStates) => ({
      ...prevStates,
      [itemId]: true,
    }));
  };

  const closeEditModal = (itemId) => {
    setEditModalStates((prevStates) => ({
      ...prevStates,
      [itemId]: false,
    }));
  };

  const getImage = (image) => {
    return `${baseUrl}${image}`;
  };

  useEffect(() => {
    dispatch(getAllCashier());
  }, [dispatch]);

  useEffect(() => {
    const initialSwitchStates = {};
    result.forEach((item) => {
      initialSwitchStates[item.id] = item.User_Profile.isActive;
    });
    setSwitchStates(initialSwitchStates);
  }, [result]);

  return result.map((item, index) => {
    const isSwitchOn = switchStates[item.id] || false;
    return (
      <>
        <Tr key={item.id}>
          <Td>{index + 1}</Td>
          <Td>
            <Button variant="unstyled">
              <Avatar
                size="md"
                name={item.username}
                src={`${baseUrl}${item.User_Profile.avatar}`}
              />
            </Button>
          </Td>
          <Td>{item.username}</Td>
          <Td>{item.email}</Td>
          <Td>
            <Button colorScheme="blue" onClick={() => openResetModal(item.id)}>
              Reset
            </Button>
            <ResetPasswordModal
              isOpen={resetModalStates[item.id] || false}
              onClose={() => closeResetModal(item.id)}
              item={item}
            />
          </Td>
          <Td>
            <Button colorScheme="blue" onClick={() => openEditModal(item.id)}>
              Edit
            </Button>
            <UpdateCashierModal
              isOpen={editModalStates[item.id] || false}
              onClose={() => closeEditModal(item.id)}
              item={item}
            />
          </Td>
          <Td>
            <Switch
              colorScheme="teal"
              isChecked={isSwitchOn}
              onChange={() => handleSwitchChange(item.id)}
            />
          </Td>
        </Tr>
      </>
    );
  });
};
