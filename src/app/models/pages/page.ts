export class Page {
    public url: string;
    public name: string;
    public icon: string;
    public selected: boolean;
    public loading: boolean;
    public section: boolean;

    constructor() { }

    public setUrl(url: string): Page {
        this.url = url;
        return this;
    }
    public setSection(section: boolean): Page {
        this.section = section;
        return this;
    }
    public setName(name: string): Page {
        this.name = name;
        return this;
    }
    public setIcon(icon: string): Page {
        this.icon = icon;
        return this;
    }
    public setLoading(loading: boolean): Page {
        this.loading = loading;
        return this;
    }

}