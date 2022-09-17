export default class API {
  constructor(widget) {
    this.widget = widget;
  }

  controlButtons(ticket, type, serverURL) { 
    const ticketForm = this.widget.querySelector(`[data-id=${type}-form]`);
    const submitBtn = ticketForm.querySelector('[data-id=ok]');
    submitBtn.addEventListener('submit', (ev) => {
      ev.preventDefault();
      if (ticket.name === '') return;
      const formData = new FormData();
      formData.append('id', ticket.id);
      formData.append('name', ticket.name);
      formData.append('description', ticket.description);
      formData.append('status', ticket.status);
      formData.append('created', new Date().toLocaleString());
  
      const TicketUrl = `${serverURL}/?method=${type}`;
      const xhr = new XMLHttpRequest();
      xhr.open('POST', TicketUrl);
      document.body.style.cursor = 'wait';
      this.widget.style.cursor = 'wait';
  
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            setTimeout(() => {
              document.body.style.cursor = '';
              this.widget.style.cursor = '';
              document.location.reload();
            }, 1000);
          } catch (e) {
            console.error(e);
          }
        }
      });
      xhr.send(formData);
      if (type !== 'removeTicket') ticketForm.reset();
      this.widget.remove();
    });

    const cancelBtn = ticketForm.querySelector('[data-id=cancel]');
    cancelBtn.addEventListener('click', () => {
      ticketForm.reset();
      this.widget.remove();
    });
  }

  addTicketDescription(ticket, serverURL) {
    const inputField = this.widget.querySelector('[data-id=description]');
    const ticketUrl = `${serverURL}/?method=ticketById&id=${ticket.id}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', ticketUrl);
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const responsedDescription = xhr.response;
          if (!responsedDescription) return;
          inputField.value = responsedDescription;
        } catch (e) {
          console.error(e);
        }
      }
    });
  
    xhr.send();
  }

  showDescription(checkBox, ticket, serverURL) {
    if (this.widget.querySelector('.modal')) return;
    if (!checkBox.classList.contains('hidden')) {
      checkBox.classList.add('hidden');
      return;
    }

    const ticketURL = `${serverURL}/?method=ticketById&id=${ticket.id}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', ticketURL);
    document.body.style.cursor = 'wait';

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const recievedDescription = xhr.response;
          setTimeout(() => {
            document.body.style.cursor = '';
          }, 1000);
          if (!recievedDescription) return;
          ticket.description.textContent = recievedDescription;
          ticket.description.classList.toggle('hidden');
        } catch (e) {
          console.error(e);
        }
      }
    });

    xhr.send();
  }

  changeStatus(checkBox, ticket, serverURL) {
    if (this.widget.querySelector('.modal')) return;
    let status;
    switch (ticket.status) {
      case 'in progress': 
        status = false;
        checkBox.classList.add('hidden');
      break;
      case 'fixed':
        status = true;
        checkBox.classList.remove('hidden');
      break;
    }
    const formData = new FormData();
    formData.append('id', ticket.id);
    formData.append('status', status);
  
    const ticketURL = `${serverURL}/?method=changeTicketStatus`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', ticketURL);
    document.body.style.cursor = 'wait';
  
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          // console.log('ticket status changed');
          setTimeout(() => {
            document.body.style.cursor = '';
          }, 500);
        } catch (e) {
          console.error(e);
          // throw e;
        }
      }
    });
  
    xhr.send(formData);
  }
}
