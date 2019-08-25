import AbstractComponent from "./abstract-components";

export default class NavigationContainer extends AbstractComponent {
  getTemplate() {
    return `<nav class="main-navigation">
              <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
            </nav>`;
  }
}
