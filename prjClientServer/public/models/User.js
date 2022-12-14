class User{
    constructor(name, gender, birth, country, email, password, photo, admin){

        //começa com underline = _propriedade, que por convenção trata-se de atributos privados
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

    get id(){
        return this._id;
    }

    get register(){
        return this._register;
    }

    //não é uma regra, é uma convenção, uma boa prática coletiva
    get name(){
        return this._name;
    }

    get gender(){
        return this._gender;
    }

    get birth(){
        return this._birth;
    }

    get country(){
        return this._country;
    }

    get email(){
        return this._email;
    }

    get photo(){
        return this._photo;
    }

    get password(){
        return this._password;
    }

    get admin(){
        return this._admin;
    }

    //set = método para atribuição de valores
    set photo(value){
        this._photo = value;
    }
    //model = sempre que envolver manipulação de dados
    //DAO = data Acess Object, uma abstração do controle dos dados
    loadFromJSON(json){
        for (let name in json){
            switch(name){
                case '_register':
                    this[name] = new Date(json[name]);
                break;
                default:
                  if(name.substring(0, 1) === '_') { 
                    this[name] = json[name]
                };
            }
        }
    }

   static getUserStorage(){
        
        return Fetch.get('/users');

    }

    toJSON(){

        let json = {};

        Object.keys(this).forEach(key => {
          if (this[key] !== undefined) json[key] = this[key];
        });

        return json;
    }

    save(){

      return new Promise((resolve, reject) =>{

        let promise;

        if (this.id){

        promise = Fetch.put(`/users/${this.id}`, this.toJSON());
        
        } else {

        promise = Fetch.post(`/users`, this.toJSON());
        
        }

        promise.then(data =>{
            this.loadFromJSON(data);

            resolve(this);

        }).catch(e =>{

            reject(e);
            
        }); //fechando cacth

     }); //fechando promise

    }

    remove(){

       return Fetch.delete(`/users/${this.id}`);

    }
}

//método construtor é um método chamado automaticamente quando invocamos a classe