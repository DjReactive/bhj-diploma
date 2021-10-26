/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const toggle = document.querySelector(".sidebar-toggle");
    const body = document.querySelector("body");
    toggle.onclick = () => {
      body.classList.toggle("sidebar-open");
      body.classList.toggle("sidebar-collapse");
    }
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const logIn = document.querySelector(".menu-item_login");
    const logOut = document.querySelector('.menu-item_logout');
    const register = document.querySelector('.menu-item_register');
    let modal;
    logIn.onclick = () => App.getModal('login').open();
    logOut.onclick = () => User.logout((unsetFunc) => {
      App.setState("init");
      unsetFunc();
    });
    register.onclick = () => App.getModal('register').open();
  }
}
