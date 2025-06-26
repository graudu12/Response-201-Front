import css from "./Contact.module.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectEditing } from "../../redux/contacts/selectors.js";
import { patchContact } from "../../redux/contacts/operations.js";
import { startEditing, stopEditing } from "../../redux/contacts/slice.js";

import BasicModal from "../BasicModal/BasicModal.jsx";

import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { IoAdd } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../../utils.js";
import toast from "react-hot-toast";



export default function Contact({ item }) {
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => selectEditing(state)[item.id]);
  const [name, setName] = useState(item.name);
  const [number, setNumber] = useState(item.number);

  const handleEditClick = () => {
    dispatch(startEditing({ id: item.id }));
  };

  const handleSaveClick = () => {
    const updatedContact = {
      id: item.id,
      name: name,
      number: number,
    };
    dispatch(patchContact(updatedContact))
      .unwrap()
      .catch(() => {
        toast.error(
          "Oops! It looks like there might be a problem with the contact that was updated!"
        );
      });
    dispatch(stopEditing({ id: item.id }));
  };

  return (
    <div className={css.contacts}>
      <Avatar {...stringAvatar(item.name)} />

      <div className={css.inputWrap}>
        <div className={css.iconWrap}>
          <FaUser />
          {isEditing ? (
            <input
              className={css.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <p className={css.name}>{item.name}</p>
          )}
        </div>
        <div className={css.iconWrap}>
          <FaPhone />
          {isEditing ? (
            <input
              className={css.input}
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          ) : (
            <p className={css.number}>{item.number}</p>
          )}
        </div>
      </div>

      <div className={css.btnWrap}>
        <IconContext.Provider
          value={{
            color: "white",
            size: "1.7em",
          }}
        >
          {isEditing ? (
            <button className={css.btn} onClick={handleSaveClick}>
              <IconContext.Provider
                value={{
                  color: "white",
                  size: "2em",
                }}
              >
                <IoAdd />
              </IconContext.Provider>
            </button>
          ) : (
            <button className={css.btn} onClick={handleEditClick}>
              <RiPencilFill />
            </button>
          )}
        </IconContext.Provider>
        <BasicModal item={item.id} />
      </div>
    </div>
  );
}
