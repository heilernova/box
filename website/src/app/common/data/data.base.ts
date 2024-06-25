export class DataBase<T = any> {
    protected _loaded: boolean = false;
    protected _data: T[] = [];

    protected getData(){
        return this._data.slice();
    }

    protected setData(value: T[]){
        this._data = value;
        this._loaded = true;
    }

    public push(data: T){
        this._data.push(data);
    }
}