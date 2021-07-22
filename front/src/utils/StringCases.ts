import humps from 'humps'

// https://tech-broccoli.life/articles/engineer/use-npm-package-humps/
export const parseSnakeToCamel = (obj: object): object => {
  return humps.camelizeKeys(obj)
}