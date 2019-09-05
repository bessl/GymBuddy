export interface Exercise {
    id: string;
    title: string;
    imgUrl: string;
}

export interface Set {
    id?: string;
    createdAt: number;
    createdBy: string;
    exerciseID: string;
    repetitions: number;
    weight: number;
    rating: number;
}

export interface LoginCredential {
    email: string;
    password: string;
}
