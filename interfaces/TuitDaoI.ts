import Tuit from "../models/Tuit";

export default interface TuitDaoI {
    findAllTuits(): Promise<Tuit[]>;
    findTuitById(tid: string): Promise<Tuit | null>;
    findTuitsByUser(uid: string): Promise<Tuit[]>;
    createTuit(tuit: Tuit): Promise<Tuit>;
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    deleteTuit(tid: string): Promise<any>;
}
