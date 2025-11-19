import ConstanttModule from "./ConstantModule/ConstantModule";
import EventBusModule from "./EventBusModule/EventBusModule";
import OptionModule from "./OptionModule/OptionModule";
import TypeOptionModule from "./OptionModule/typeOptionModule";
import StructAndVarRelationIntegrateModule from "./StructAndVarRelationIntegrateModule/StructAndVarRelationIntegrateModule";
import StructureModule from "./StructureModule/StructureModule";
import VariableModule from "./VariableModule";
import PopUpModule from "./PopUpModule";

export type ApiModuleImpl = {
  init?: (api: ApiInterface) => void;
  [key: string]: any;
};

export interface ApiInterface {
  eventBus: typeof EventBusModule;
  constant: typeof ConstanttModule;
  option: typeof OptionModule;
  structAndVarRelationIntegrate: typeof StructAndVarRelationIntegrateModule;
  structure: typeof StructureModule;
  variable: typeof VariableModule;
  typeOption: typeof TypeOptionModule;
  popUp: typeof PopUpModule;
  init: () => void;
}

class API<T extends Record<string, ApiModuleImpl> = {}>
  implements ApiInterface
{
  eventBus: typeof EventBusModule = EventBusModule;
  constant: typeof ConstanttModule = ConstanttModule;
  option: typeof OptionModule = OptionModule;
  structAndVarRelationIntegrate: typeof StructAndVarRelationIntegrateModule =
    StructAndVarRelationIntegrateModule;
  structure: typeof StructureModule = StructureModule;
  variable: typeof VariableModule = VariableModule;
  typeOption: typeof TypeOptionModule = TypeOptionModule;
  popUp: typeof PopUpModule = PopUpModule;

  constructor() {}

  init() {
    Object.values(this).forEach((module: ApiModuleImpl) => {
      if (typeof module.init === "function") {
        module.init(this);
      }
    });
  }
}

let api = new API();

api.init();

export default api;
