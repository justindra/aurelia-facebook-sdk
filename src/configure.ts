export interface ConfigInterface {
    appId: string;
    lang: string;
}

export class Configure {
    private _config: any;

    constructor() {
        this._config = {
            appId: '',
            lang: 'en_US'
        };
    }

    options(obj: ConfigInterface) {
        Object.assign(this._config, obj);
    }

    get(key: string) {
        return this._config[key];
    }

    set(key: string, val: any) {
        this._config[key] = val;
        return this._config[key];
    }
}