export interface Task {
    userId: number;
    _id: number;
    name: string;
    status: 'none' | 'ongoing' | 'completed';
    completed: boolean;
    hovered: boolean;
    editable: boolean;
}

export interface Bucket {
    userId: number;
    _id: number;
    name: string;
    tasks: Task[];
    hovered: boolean;
    editable: boolean;
}

export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T[];
}
