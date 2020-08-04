import React from 'react';
import {
  FaYoutube as Youtube,
  FaGithub as Github,
  FaStackOverflow as StackOverflow,
  FaLinkedin as Linkedin,
  FaTwitter as Twitter,
  FaInstagram as Instagram,
} from 'react-icons/fa';
import { IoIosMail as Mail } from 'react-icons/io';

const iconSize = 32;

const links = [
  {
    name: 'Github',
    renderLink: () => <Github size={iconSize} />,
    url: 'https://github.com/andrekovac',
  },
  {
    name: 'Stack Overflow',
    renderLink: () => <StackOverflow size={iconSize} />,
    url: 'http://stackoverflow.com/users/3210677/andru',
  },
  {
    name: 'LinkedIn',
    renderLink: () => <Linkedin size={iconSize} />,
    url: 'https://www.linkedin.com/in/andrekovac/',
  },
  {
    name: 'Youtube',
    renderLink: () => <Youtube size={iconSize} />,
    url: 'https://www.youtube.com/channel/UCC_JohqFyLklUrl_1fDJARw',
  },
  {
    name: 'Instagram',
    renderLink: () => <Instagram size={iconSize} />,
    url: 'https://www.instagram.com/andre.kovac/',
  },
  {
    name: 'Twitter',
    renderLink: () => <Twitter size={iconSize} />,
    url: 'https://twitter.com/andrekovac',
  },
  {
    name: 'Email',
    renderLink: () => <Mail size={iconSize} />,
    url: 'mailto:info@andrekovac.com',
  },
];

export default links;
