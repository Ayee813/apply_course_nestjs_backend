import { IPagination } from './pagination.interface';

export interface PaginationResponse<T> {
  data: T[];
  pagination: IPagination;
}
