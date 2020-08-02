export interface paginated<T> {
    pageIndex: number,
    totalPages: number,
    items: T[],
    hasPreviousPage: boolean,
    hasNextPage: boolean
}