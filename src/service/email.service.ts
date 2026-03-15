import ejs from 'ejs';
import path from 'node:path';
import transporter from '../config/email.config';

const templatePath = path.join(
  process.cwd(),
  'src',
  'templates',
  'login-seccess.ejs',
);
const sendMail = async (user: {
  name: string;
  email: string;
  ip: string;
  device: string;
  location: string;
}) => {
  const template = await ejs.renderFile(templatePath, {
    appName: 'SecureAuth',
    userName: user.name,
    loginTime: new Date().toLocaleString(),
    ip: user.ip,
    device: user.device,
    location: user.location,
    securityLink: 'https://yourapp.com/security',
  });
  await transporter
    .sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Login Alert',
      html: template,
    })
    .catch((error) => console.log(error))
    .then(() => console.log('Email sent'));
};

export default sendMail;
