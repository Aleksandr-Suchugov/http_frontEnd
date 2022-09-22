export default class Widgets {
  static newTicketHTML() {
    return `
    <div data-widget="addTicket" class="modal widget-add" encType="multipart/form-data">
      <h2>Создать запрос</h2>  
      <form data-id="addTicket-form" class="widget-form">
        <label>
          Имя запроса
          <textarea rows=1 data-id="name" name="name" required class="widget-input"></textarea>
        </label>
        <label>
          Детали запроса
          <textarea rows=3 data-id="description" name="description" class="widget-input"></textarea>
        </label>
        <div class="widget-form-controls">
          <button data-id="cancel" class="widget-button">Отменить</button>  
          <button type="submit" data-id="ok" class="widget-button">Создать</button> 
        </div>     
      </form>
    </div>`;
  }

  static removeTicketHTML() {
    return `
    <div data-widget="removeTicket" class="modal widget-remove">
      <h2>Хотите закрыть запрос?</h2>  
      <div class="widget-form">
        <div class="widget-form-controls">
          <button data-id="cancel" class="widget-button">Отменить</button>  
          <button data-id="ok" class="widget-button">Закрыть</button> 
        </div> 
      </div>
    </div>`;
  }

  static editTicketHTML() {
    return `
    <div data-widget="editTicket" class="modal widget-edit">
      <h2>Редактировать тикет</h2>  
      <form data-id="editTicket-form" class="widget-form" encType="multipart/form-data">
        <label>
          Краткое описание
            <textarea rows=1 data-id="name" name="name" required class="widget-input"></textarea>
        </label>
        <label>
          Подробное описание
            <textarea rows=3 data-id="description" name="description" class="widget-input"></textarea>
        </label>
        <div class="widget-form-controls">
          <button data-id="cancel" class="widget-button">Отмена</button>  
          <button type="submit" data-id="ok" class="widget-button">Ок</button> 
        </div>     
      </form>
    </div>`;
  }

  static getTicketHTML(ticket) {
    return `
    <div data-id="${ticket.id}" class="ticket-wrapper">
      <div class="ticket-body">
        <div data-status="${ticket.status}" class="ticket-status">
          <span class="ticket-status-checkbox hidden">&#10004;</span>
        </div>
        <div class="ticket-name"><p>${ticket.name}</p></div>
        <div class="ticket-timestamp">
          <span>${ticket.created}</span>
        </div>
        <div class="ticket-edit-button">
          <span>&#9998;</span>
        </div>
        <div class="ticket-remove-button">
          <span>&#10006;</span>
        </div>
      </div>
      <div class="ticket-description hidden"><p>${ticket.description}</p></div>
    </div>`;
  }
}
