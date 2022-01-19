export interface JwtPayLoad {
  id: number;
  account: string;
}

export interface LoginRes {
  token: string;
  menuList: any;
  username: string;
}

export interface GithubLoginRes {
  token: string;
  username: string;
}

export interface GithubRes {
  access_token: string;
  token_type: string;
}

export interface GithubUserInfo {
  login: string;
  id: string;
  avatar_url: string;
}
