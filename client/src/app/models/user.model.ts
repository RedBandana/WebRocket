export class User {
    _id?: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phone: string = '';
    type: UserType = UserType.GUEST;
    timeCreated?: Date = new Date();
    password: string = ''; 
}

export enum UserType {
    GUEST = 'guest',
    REQUESTER = 'requester',
    AGENT = 'agent',
    ADMINISTRATOR = 'administrator'
}