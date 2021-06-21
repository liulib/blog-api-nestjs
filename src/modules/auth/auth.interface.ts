export interface JwtPayLoad {
  id: number;
  account: string;
}

export interface LoginRes {
  token: string;
  menuList: any;
  username: string;
}
