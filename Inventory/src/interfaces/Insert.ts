export interface update {
    db : string;
    inventory : [
        string, number
    ][],
    type: type
};

enum type {
    insert = 'insert',
    update = 'update'
}

export type insert = [string, number][];