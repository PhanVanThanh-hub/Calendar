export interface Month{
    month:string,
    id:string[]
}

export interface Day{
    id:string,
    day:string,
    listId:string[]
}

export interface Event{
    id?:string,
    title:string,
    detail:string,
    background:string,
    color:string,
    dayEvent:string,
    startTime:string,
    endTime:string,
}