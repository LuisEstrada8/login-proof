export interface UsersResponse {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: Users[],
}

export interface Users {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}