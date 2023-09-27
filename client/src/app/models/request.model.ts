export class Request {
  _id?: string = '';
  agentId: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  mainInterest: MainInterestType = MainInterestType.NONE;
  introducedBy: string = '';
  timeCreated?: Date = new Date();
}

export enum MainInterestType {
    NONE = 0,
    OPPORTUNITY = 1,
    SITUATION = 2,
}