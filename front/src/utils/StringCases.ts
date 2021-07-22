import humps from 'humps'

// https://tech-broccoli.life/articles/engineer/use-npm-package-humps/
export const parseSnakeToCamel = (obj) => {
  return humps.camelizeKeys(obj)
}