const nodemailer = require('nodemailer');

exports.sendVendorRegistrationEmail = (data) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'avijit.team@gmail.com',
            pass: 'avijit_team'
        }
    });


    const mailOptions = {
        from: 'avijit.team@gmail.com',
        to: data.email,
        subject: 'Registration successfull',
        html: '<div>' +
                    '<h1>Hello '+ data.name +'</h1>'+
                    '<h1>Welcome to Feminie</h1>' + 
                    '<p>Your login credential is</p>'+ 
                    '<p><b>User id:'+ data.email +'</b></p>'+
                    '<p><b>Password:'+ data.password +'</b></p>'+
                '</div>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            if (res != null) res.json({status: 'error', msg: 'an error occured'});
        } else {
            console.log('Email sent: ' + info.response);
            if (res != null) res.json({status: 'success', msg: 'email sent ' + info.response});
        }
    });
}