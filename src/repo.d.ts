/** Github Repo data straight from the source */
export interface Repo {
  id: number,
  name: string,
  html_url: string,
  [other: string]: any,
}

export interface SimpleRepo {
  id: number,
  name: string,
  url: string,
}
