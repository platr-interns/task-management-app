export interface Task {
    userId: number;
    _id: string;
    name: string;
    status: 'none' | 'ongoing' | 'completed';
    hovered: boolean;
    editable: boolean;
}

export interface Bucket {
    userId: number;
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
