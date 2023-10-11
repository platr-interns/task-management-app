export interface Task {
    userId: string;
    bucketId: string;
    _id: string;
    name: string;
    status: 'none' | 'ongoing' | 'completed';
    hovered: boolean;
    editable: boolean;
}

export interface Bucket {
    userId: string;
    _id: string;
    name: string;
    newName: string;
    tasks: Task[];
    hovered: boolean;
    editable: boolean;
    saveMode: boolean;
}

export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T[];
}
export interface LoginResponse {
    status: string;
    message: string;
    data: {
        _id: string;
        name: string;
        email: string;
        password: string;
        buckets: string[]; // Assuming buckets is an array of strings
        tasks: any[]; // Assuming tasks is an array of any type
        __v: number;
    };
}
