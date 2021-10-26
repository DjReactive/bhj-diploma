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
   * Получает ID текущего выбранного счета
   * */
  static current(){
    let accTree = App.getWidget('accounts').element;
    let accounts = accTree.querySelectorAll('.account');
    for (let i=0; i < accounts.length; i++) {
      if (accounts[i].classList.contains('active'))
        return accounts[i].dataset.id;
    }
    return null;
  }

}
