import { Request } from "../models/request.model";

export interface RequestState {
    request: Request;
    loading: boolean;
    error: any;
}