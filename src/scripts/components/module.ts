import ModuleInterface from "@/scripts/interfaces/module.interface"


export default class Module {
    private readonly config: ModuleInterface;

    constructor(config: ModuleInterface) {
        this.config = config;
        this.init();
    }

    init() {
        console.log("Module initialized", this.config);
    }
}