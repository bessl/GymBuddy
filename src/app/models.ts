export class Exercise {
    id: string;
    title: string;
    imgUrl: string;
}

export class Set {
    id: string;
    createdAt: Date;
    createdBy: string;
    exerciseID: string;
    repetitions: number;
    weight: number;
}

export class User {
    id: string;
    email: string;
    password: string;
}
