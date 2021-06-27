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

  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { toggleModal });
    }
    return child;
  });

  console.log(childrenWithProps)

  return(
    <>
      <button onClick={toggleModal}>{props.text}</button>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <button onClick={toggleModal}>閉じる</button>
        {childrenWithProps}
      </Modal>
    </>
  )
}

export default ModalWrapper;