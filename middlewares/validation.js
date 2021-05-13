const gateman = require('gateman');
var {deleteFiles} = require('../utility');
gateman.setGlobal({
    name: /^[a-zA-Z]+(([ ][a-zA-Z ])?[a-zA-Z]*)*$/,
    firstname: /^[a-zA-Z]{2,}$/,
    phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    link: /^(?:https:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
    time: /^[0-9][0-9]:[0-9][0-9]$/,
    inout: /^(in|out)$/,
    order_status: /^(approved|cancelled|delivered)$/,
    query_type: /^(feedback|query)$/,
    price: (val) => isNaN(+val) ? 'Please enter valid price' : null,
    rating: (val) => (+val >= 1 && +val <= 5) ? null : 'Rating must be between 1-5',
    mongoObjectID: /^[a-f\d]{24}$/i
});

const validate = (schema, customMessages, customValidators) => {
    const validatorFn = gateman(schema, customMessages, customValidators);
    return async (req, res, next) => {
        /*req.errors = validatorFn(req.body,{flatten:true});
        next();*/
        // console.log(req.body)
        let error = validatorFn(req.body, {flatten: true});
        if (!error) next();
        else {
            try {
                if (req.files)
                    await deleteFiles(req.files.map(f => f.path))
                else if (req.file)
                    await deleteFiles(req.file.path)
            } catch (e) {
                console.log('file delete error', e);
            }
            let keys = Object.keys(error);
            if (keys.length)
                sendError(res, error, error[keys[0]], 200);
            else
                sendError(res, error, 'Validation error', 200);
        }
    }
}

exports.role = validate({
    role_name: 'required'
})

exports.adminUser = validate({
    firstname: 'required',
    lastname: 'required',
    mobile: "phone",
    address: "string",
    email: 'required|email',
    password: 'required|minlength:6',
    user_type: 'required|string',
})

exports.user = validate({
    firstname: 'required',
    lastname: 'required',
    mobile: "phone",
    address: "string",
    email: 'required|email',
    password: 'required|minlength:6',
    user_type: 'required|string',
    company_id: 'required|mongoObjectID'
})

exports.resetPassword = validate({
    password: 'required'
})
exports.content=validate({
    content: 'string|required'
});