var nunjucks = require('nunjucks');
var mailTransporter = require('nodemailer').createTransport(global.config.email.url);
const {common_provider} = require('../database/providers');
const {EMAIL_TEMPLATE} = require('../database/models')
const skipMail = global.config.email.skip;//if true mail body will be consoled

const url = config.url;

mailTransporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Mail server is ready to take our messages");
    }
});

var sendEmail = exports.sendEmail = (to, subject, html, from = global.config.email.auth.user) => {
    if (skipMail) return html;
    return mailTransporter.sendMail({
        from: `TheWealthGap Admin <${from}>`,
        to: to,
        subject: subject,
        html: html
    })
}
/*
exports.sendEmailConfirmUser = async (to, otp) => {
    let template = await user_provider.getEmailTemplateByName(user_provider.emailTemplates["Registration-Customer"]);
    return new Promise((resolve, reject) => {
        nunjucks.renderString(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
        <body bgcolor="#ededed">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ededed" >
        <tr><td>
        <table width="60%" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFF" align="center" style="border-radius:10px; border:1px solid #ededed; box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.25); margin: auto;">
        <tr><td valign="top" align="left" style="padding: 0px 15px; background-color: black; text-align: center">
        <img src="${url}/assets/images/feminy-logo.png" alt="Logo" title="Logo" border="0" style="width: 140px;"/>
        </td><tr><td valign="top" style="padding: 0px 40px;" height="200">${template.content}</td></tr>
        <tr><td style="padding: 15px" align="center" bgcolor="#FFF">
        <p style="font:normal 12px Arial, Helvetica, sans-serif;">Copyright @2020 Feminy, All rights reserved.</p>
        </td></tr></table></td></tr></table></body></html>`, {otp}, (err, str) => {
            if (err) reject(err);
            else resolve(sendEmail(to, 'Account Verification', str))
        })
    })
}

exports.sendVendorRegistrationEmail = async (email, password) => {
    let template = await user_provider.getEmailTemplateByName(user_provider.emailTemplates["Registration-Vendor"]);
    return new Promise((resolve, reject) => {
        nunjucks.renderString(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
        <body bgcolor="#ededed">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ededed" >
        <tr><td>
        <table width="60%" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFF" align="center" style="border-radius:10px; border:1px solid #ededed; box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.25); margin: auto;">
        <tr><td valign="top" align="left" style="padding: 0px 15px">
        <img src="${url}/assets/images/feminy-logo.png" alt="Feminy logo" title="Feminy logo" border="0" style="width: 140px;"/>
        </td><tr><td valign="top" style="padding: 0px 40px;" height="200">${template.content}</td></tr>
        <tr><td style="padding: 15px" align="center" bgcolor="#FFF">
        <p style="font:normal 12px Arial, Helvetica, sans-serif;">Copyright @2020 Feminy, All rights reserved.</p>
        </td></tr></table></td></tr></table></body></html>`, {email, password}, (err, str) => {
            if (err) reject(err);
            else resolve(sendEmail(email, 'Registration Successfull', str))
        })
    })
}

exports.sendTwoFactorEmail = async (to, otp) => {
    //let template=await user_provider.getEmailTemplateByName(user_provider.emailTemplates.SchoolCreate);
    return new Promise((resolve, reject) => {
        nunjucks.renderString(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
        <body bgcolor="#ededed">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ededed" >
        <tr><td>
        <table width="60%" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFF" align="center" style="border-radius:10px; border:1px solid #ededed; box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.25); margin: auto;">
        <tr><td valign="top" align="left" style="padding: 0px 15px">
        <img src="${url}/assets/images/feminy-logo.png" alt="Feminy logo" title="Feminy logo" border="0" style="width: 140px;"/>
        </td><tr><td valign="top" style="padding: 0px 40px;" height="200">
        <br>
        <p>Hello Admin,</p>
        <p>Your login OTP is</p>
        <br>
        <h2 style="background: #03A9F4;padding: 10px 20px;display: inline;color: #fff;">{{ otp }}</h2>
        <br> <br>
        <p>Thank You</p>
        <p>Admin</p>
        </td></tr>
        <tr><td style="padding: 15px" align="center" bgcolor="#FFF">
        <p style="font:normal 12px Arial, Helvetica, sans-serif;">Copyright @2020 Feminy, All rights reserved.</p>
        </td></tr></table></td></tr></table></body></html>`, {otp}, (err, str) => {
            if (err) reject(err);
            else resolve(sendEmail(to, 'Feminy Login OTP', str))
        })
    })
}

exports.sendReplyEmail = async (to, message) => {
    return new Promise((resolve, reject) => {
        nunjucks.renderString(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
        <body bgcolor="#ededed">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ededed" >
        <tr><td>
        <table width="60%" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFF" align="center" style="border-radius:10px; border:1px solid #ededed; box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.25); margin: auto;">
        <tr><td valign="top" align="left" style="padding: 0px 15px; background-color: black; text-align: center">
        <img src="${url}/assets/images/feminy-logo.png" alt="Logo" title="Logo" border="0" style="width: 140px;"/>
        </td><tr><td valign="top" style="padding: 0px 40px;" height="200">${message}</td></tr>
        <tr><td style="padding: 15px" align="center" bgcolor="#FFF">
        <p style="font:normal 12px Arial, Helvetica, sans-serif;">Copyright @2020 Feminy, All rights reserved.</p>
        </td></tr></table></td></tr></table></body></html>`, {}, (err, str) => {
            if (err) reject(err);
            else resolve(sendEmail(to, 'Reply from Feminy', str))
        })
    })
}
*/


exports.sendForgotPasswordEmail = async (to, link) => {
    let template = await common_provider.getEmailTemplateByName(EMAIL_TEMPLATE.template.forgot_password);
    return new Promise((resolve, reject) => {
        nunjucks.renderString(`
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        </head>
        <body bgcolor="#ededed">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ededed" >
        <tr>
        <td>
        <table width="60%" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFF" align="center" style="border-radius:10px; border:1px solid #ededed; box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.25); margin: auto;">
        <tr><td valign="top" align="center" style="padding: 0px 15px">
        <img src="${url}/assets/images/UNICORN_LOGO_FOR_APP.png" alt="TheWealthGap logo" title="TheWealthGap logo" border="0" style="width: 140px;"/>
        </td><tr><td valign="top" style="padding: 0px 40px;" height="200">${template.content}</td></tr>
        <tr><td style="padding: 15px" align="center" bgcolor="#FFF">
        <p style="font:normal 12px Arial, Helvetica, sans-serif;">Copyright @2020 TheWealthGap, All rights reserved.</p>
        </td></tr></table></td></tr></table></body></html>`,
            {link: link}, (err, str) => {
            if (err) reject(err);
            else resolve(sendEmail(to, 'Reset Password Link', str))
        })
    })
}


exports.renderFile = (file, ctx) => {
    return new Promise((res, rej) => {
        nunjucks.render(file, {siteurl: global.config.url, ...ctx}, (err, result) => {
            if (err) rej(err);
            res(result);
        })
    })
}
