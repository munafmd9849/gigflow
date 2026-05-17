export interface ApiResponse<TData> {
  success: boolean;
  message: string;
  data: TData;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}
