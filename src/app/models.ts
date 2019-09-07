export interface Exercise {
    id: string;
    title: string;
    imgUrl: string;
    day: number;
}

export interface Set {
    id?: string;
    createdAt: number;
    createdBy: string;
    exerciseId: string;
    repetitions: number;
    weight: number;
    rating: number;
}

export interface LoginCredential {
    email: string;
    password: string;
}
