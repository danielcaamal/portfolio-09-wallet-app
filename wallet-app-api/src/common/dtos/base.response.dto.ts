export interface BaseFindAllDto<T> {
  filterDto?: T;
  isCounter?: boolean;
  skip?: number;
  order?: any;
  recordsByPage?: number;
}

export interface ResponseFindAllDto<T> {
  records: T[];
  totalRecords: number;
}
