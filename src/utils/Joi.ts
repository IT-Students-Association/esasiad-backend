import {Joi as JoiStandard} from "express-validation";
const Joi = {...JoiStandard, objectId: require('joi-objectid')(JoiStandard)};
export default Joi;