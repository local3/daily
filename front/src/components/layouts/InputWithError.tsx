import React from "react";
import "../../styles/css/layout.scss";
import { FormError } from "../../types";

// エラーを表示するかしないかを返す
const getIsDisplayError = (formErrors: FormError[], attribute: string): boolean => {
  return formErrors?.filter(formError => formError.attribute === attribute).length >= 1
}

const genHelperText = (formErrors: FormError[], attribute: string): string => {
  const formError = formErrors?.find(formError => formError.attribute === attribute)
  return formError?.msgParts.map(msgPart => `${convertToJaAttribute(attribute)}${msgPart}`).join(",") 
    ? formError?.msgParts.map(msgPart => `${convertToJaAttribute(attribute)}${msgPart}`).join(",") 
    : ''
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
