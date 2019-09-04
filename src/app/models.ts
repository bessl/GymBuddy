export interface Exercise {
    id: string;
    title: string;
    imgUrl: string;
}

export enum Rating {
    BAD,
    OK,
    GOOD
}

export interface Set {
    id: string;
    createdAt: Date;
    createdBy: string;
    exerciseID: string;
    repetitions: number;
    weight: number;
    rating: Rating;
}

export interface User {
    id: string;
    email: string;
    password: string;
}
