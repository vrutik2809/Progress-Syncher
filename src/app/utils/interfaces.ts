export interface Text  {
    is_read: boolean;
}

export interface Image {
    is_viewed: boolean;
}

export interface Video {
    watched_len: number;
    total_len: number;
}

export interface PDF {
    read_pages: number;
    total_pages: number;
}