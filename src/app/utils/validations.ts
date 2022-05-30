import Joi from 'joi';

const validateText = (params: any) => {
    const schema = Joi.object().keys({
        is_read: Joi.boolean().required()
    }).options({
        abortEarly: false
    });
    return schema.validate(params);
}

const validateImage = (params: any) => {
    const schema = Joi.object().keys({
        is_viewed: Joi.boolean().required()
    }).options({
        abortEarly: false
    });
    return schema.validate(params);
}

const validateVideo = (params: any) => {
    const schema = Joi.object().keys({
        watched_len: Joi.number().min(0).max(Joi.ref('total_len')).required(),
        total_len: Joi.number().min(0).required()
    }).options({
        abortEarly: false
    });
    return schema.validate(params);
}

const validatePDF = (params: any) => {
    const schema = Joi.object().keys({
        read_pages: Joi.number().min(0).max(Joi.ref('total_pages')).required(),
        total_pages: Joi.number().min(0).required()
    }).options({
        abortEarly: false
    });
    return schema.validate(params);
}

const compValidateMap = new Map<string, (params: any) => Joi.ValidationResult<any>>();
compValidateMap.set('Text', validateText);
compValidateMap.set('Image', validateImage);
compValidateMap.set('Video', validateVideo);
compValidateMap.set('PDF', validatePDF);

export { compValidateMap };