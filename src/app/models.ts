export interface Exercise {
    id: string;
    title: string;
    imgUrl: string;
}

export interface Set {
    id: string;
    createdAt: Date;
    createdBy: string;
    exerciseID: string;
    repetitions: number;
    weight: number;
}

export interface User {
    id: string;
    email: string;
    password: string;
}
