import nodemailer = require('nodemailer');
import { baseConfig } from '../configManager';

export const transporter = nodemailer.createTransport(
  {
    host: 'smtp.exmail.qq.com',
    port: 465,
    secure: true,
    auth: {
      user: baseConfig.email.user,
      pass: baseConfig.email.password,
    },
  },
  {
    from: baseConfig.email.user,
  },
);
