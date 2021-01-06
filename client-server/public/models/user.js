class User
{
    constructor(name, gender, birth, country, email, password, photo, admin)
    {
        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }
    get id()
    {
        return this._id;
    }
    get register()
    {
        return this._register;
    }
    get name()
    {
        return this._name;
    }
    get gender()
    {
        return this._gender;
    }
    get birth()
    {
        return this._birth;
    }
    get country()
    {
        return this._country;
    }
    get email()
    {
        return this._email;
    }
    get password()
    {
        return this._password;
    }
    get photo()
    {
        return this._photo;
    }
    get admin()
    {
        return this._admin;
    }

    set photo(value)
    {
        this._photo = value;
    }

    set id(value)
    {
        this._id = value;
    }
    loadFromJSON(json)
    {
        for(let name in json)
        {
            switch(name)
            {
                case '_register':
                    this[name] = new Date(json[name]);
                    break;

                default:
                    this[name] = json[name];
            }
        }
    }
    static getUsersStorage()
    {
        let users = [];

        // if(sessionStorage.getItem("users"))
        if(localStorage.getItem("users"))
        {
            // users = JSON.parse(sessionStorage.getItem("users"));
            users = JSON.parse(localStorage.getItem("users"));
        }

        return users;
    }
    getNewId()
    {
        let id = parseInt(localStorage.getItem("usersID"));

        if(!id) id = 0;
        id++;
        localStorage.setItem("usersID", id);
        return id;
    }
    toJSON()
    {
        let json = {};

        Object.keys(this).forEach(key => {
            this[key] !== undefined && (json[key] = this[key]);
        });

        return json;
    }
    save()
    {
        return new Promise((resolve, reject) => {
            let promise;
            
            if(this._id)
            {
                promise = HttpRequest.put(`/users/${this._id}`, this.toJSON());
            }
            else
            {
                promise = HttpRequest.post(`/users`, this.toJSON());
            }
    
            promise.then(data => {
                this.loadFromJSON(data);
                resolve(this);
            }).catch(e => reject(e))
        });
    }
    remove()
    {
        let users = User.getUsersStorage();

        users.forEach((userData, index) => {
            if(this._id == userData._id)
            {
                users.splice(index, 1);
            }
        });

        localStorage.setItem("users", JSON.stringify(users));
    }
}