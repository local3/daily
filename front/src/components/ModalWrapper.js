import React, { useState, useContext } from 'react'
// import { AuthContext } from "../store/Auth"
import Modal from "react-modal"
Modal.setAppElement("#root")

const ModalWrapper = (props) => {

  // ログイン中でないと押せない仕様にするとき使うかも
  // const auth = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false)
  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return(
    <>
      <button onClick={toggleModal}>{props.text}</button>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        { props.children }
      </Modal>
    </>
  )
}

export default ModalWrapper;