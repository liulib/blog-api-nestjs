export interface pageData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
