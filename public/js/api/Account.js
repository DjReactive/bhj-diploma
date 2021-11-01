/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static url = '/account';
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    let user = User.current();
    if (!user) return;

    Account.list(user, (err, response) => {
      if (!err) response.data.forEach(item => {
        if (id === item.id) callback(item);
      })
    });
  }

  /**
   * Получает ID текущего выбранного счета ПРОБЛЕМА ЗДЕСЬ!
   * */
  static current(){
    let id = null, accTree = App.getWidget('accounts').element;
    let accounts = accTree.getElementsByClassName('account');
    Array.from(accounts).forEach(acc => {
      if (acc.classList.contains('active')) id = acc.dataset.id;
    });
    return id;
  }

}
