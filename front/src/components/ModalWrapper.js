import React, { useState, useContext } from 'react'
// import { AuthContext } from "../store/Auth"
import { Add } from '@material-ui/icons';
import { Button } from '@material-ui/core/';
import { useLayoutStyles } from '../styles/js/layout';
// Modal設定
import Modal from "react-modal"
// Modalをid="root"の一番上要素に指定することで全体を覆うことができる
Modal.setAppElement("#root")

const ModalWrapper = (props) => {
  const layoutClasses = useLayoutStyles()
  // ログイン中でないと押せない仕様にするとき使うかも
  // const auth = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false)
  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  // Modalの中身で、toggleModal()を使ってModalを閉じれるようにする
  // 汎用性を上げるためにchildrenにしており、個別でpropsを渡せないのでcomponentをcloneして入れ直している
  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { toggleModal });
    }
    return child;
  });

  // console.log(childrenWithProps)

  return(
    <>
      <Button onClick={toggleModal} className={layoutClasses.plusButton}>
        <Add />
      </Button>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <button onClick={toggleModal}>閉じる</button>
        {childrenWithProps}
      </Modal>
    </>
  )
}

export default ModalWrapper;