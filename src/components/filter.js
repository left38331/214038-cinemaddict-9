export const createFilterLayout = ({name, count}) => `
  <a href="#${name}" class="main-navigation__item ${name === `all` ? `main-navigation__item--active` : ``} ">${name === `all` ? `All movies` : name[0].toUpperCase() + name.substring(1)}${name === `all` ? `` : ` <span class="main-navigation__item-count">${count}</span>`}</a>
`;
