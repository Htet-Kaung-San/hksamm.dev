import React from 'react';

const socialLinks = [
  {
    id: 1,
    name: 'linkedin',
    icon: 'fa-brands fa-linkedin',
    link: 'https://www.linkedin.com/in/kavinda-maduranga-1302a71b7',
  },
  {
    id: 2,
    name: 'x',
    icon: 'fa-brands fa-x-twitter',
    link: 'https://twitter.com/kavindzMW',
  },
  {
    id: 4,
    name: 'facebook',
    icon: 'fa-brands fa-facebook',
    link: 'https://www.facebook.com/kavindzfovero/',
  },
  {
    id: 5,
    name: 'instagram',
    icon: 'fa-brands fa-instagram',
    link: 'https://www.instagram.com/',
  },
  {
    id: 6,
    name: 'github',
    icon: 'fa-brands fa-github',
    link: 'https://github.com/foverokavindz',
  },
];

const HeaderSocials = () => {
  return (
    <div className="home__socials">
      {socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.link}
          className={`home__social-link home__social-link--${link.name}`}
          target="_blank"
          rel="noreferrer"
        >
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  );
};

export default HeaderSocials;
