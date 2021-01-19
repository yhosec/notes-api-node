enum Environments {
    local_environment = 'local'
}

class Environment {
    private environment: String;

    constructor(environment: String) {
        this.environment = environment;
    }

    getPort(): Number {
        if (this.environment === Environments.local_environment) {
            return 3000;
        } else {
            return 3000;
        }
    }

}

export default new Environment(Environments.local_environment);
