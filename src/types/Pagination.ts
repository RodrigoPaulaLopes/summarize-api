import { Summarize } from "../entities/Summarize.entity";

class Pagination {
    data: Summarize[];
    pagination: PaginationInfo
}
class PaginationInfo {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export default Pagination;



