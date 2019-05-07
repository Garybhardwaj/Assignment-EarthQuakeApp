// This model is to bind the specific data fields from API  
export class EQApiResponse{
    public place:string;
    public type:string;
    public time:Date;
    public magnitude:number;
    public location:[number,number]
}