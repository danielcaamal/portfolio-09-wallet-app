export interface BaseFindAllDto<T> {
  filterDto?: T;
  isCounter?: boolean;
  skip?: number;
  recordsByPage?: number;
}

export interface ResponseFindAllDto<T> {
  records: T[];
  totalRecords: number;
}
