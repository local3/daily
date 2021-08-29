import React, { useContext } from "react";
import { AuthContext } from "../../store/Auth";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useLayoutStyles } from "../../styles/js/layout";
import "../../styles/css/layout.scss";

const getIsDisplayError = (formErrors, attribute) => {
  return formErrors?.filter(formError => formError.attribute === attribute).length >= 1
}

const genHelperText = (formErrors, attribute) => {
  console.log(formErrors, attribute)
  console.log(formErrors?.find(formError => formError.attribute === attribute)?.msgParts)
  return formErrors?.find(formError => formError.attribute === attribute)?.msgParts.map(msgPart => `${convertToJaAttribute(attribute)}${msgPart}`).join(",")
}

const convertToJaAttribute = (attribute) => {
  const attributePairList = [
    { en: 'email', ja: 'メールアドレス'},
    { en: 'password', ja: 'パスワード'},
    { en: 'password_confirmation', ja: '確認用パスワード'}
  ]

  return attributePairList.find(attributePair => attributePair.en === attribute)?.ja
}

const InputWithError = ({　children, formErrors, attribute }) => {

  return (
    <>
      {React.Children.map(children, (child, i) => {
        if (
          !React.isValidElement(child)
        ) {
          return;
        }
        return React.cloneElement(
          child as React.ReactElement,
          {
            error: getIsDisplayError(formErrors, attribute),
            helperText: getIsDisplayError(formErrors, attribute) && genHelperText(formErrors, attribute)
          }
        );
      })}
    </>
  );
};

export default InputWithError;
