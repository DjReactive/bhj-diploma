/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let select, option = '', user = User.current();
    Account.list(user, (err, response) => {
      if (!err) {
        response.data.forEach(acc => {
          option += `<option value="${acc.id}">${acc.name}</option>`;
        });
        select = this.form.querySelector("select");
        select.innerHTML = option;
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   **/
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (!err) {
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        App.update();
      } else alert (err);
    });
  }
}
