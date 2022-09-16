export default class API {
  constructor(widget) {
    this.widget = widget;
  }

  controlButtons(ticketObj, serverUrl) { 
    const ticketForm = this.widget.querySelector(`[data-id=${ticketObj.type}-form]`);
    const submitBtn = ticketForm.querySelector('[data-id=ok]');
    ticketForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      if (ticketObj.name === '') return;
      const formData = new FormData();
      formData.append('id', ticketObj.id);
      formData.append('name', ticketObj.name);
      formData.append('description', ticketObj.description);
      formData.append('status', ticketObj.status);
      formData.append('created', new Date().toLocaleString());
  
      const TicketUrl = `${serverUrl}/?method=${ticketObj.type}`;
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
      if (ticketObj.type !== 'removeTicket') ticketForm.reset();
      this.widget.remove();
    });

    const cancelBtn = ticketForm.querySelector('[data-id=cancel]');
    cancelBtn.addEventListener('click', () => {
      ticketForm.reset();
      this.widget.remove();
    });
  }

  addTicketDescription(selectedTicket, serverUrl) {
    const inputField = this.widget.querySelector('[data-id=description]');
    const ticketUrl = `${serverUrl}/?method=ticketById&id=${selectedTicket.dataset.id}`;
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

  showDescription(selectedTicket, ticketObj, serverUrl) {
    if (this.widget.querySelector('.modal')) return;
    if (!ticketObj.description.classList.contains('hidden')) {
      ticketObj.description.classList.add('hidden');
      return;
    }

    const ticketURL = `${serverUrl}/?method=ticketById&id=${selectedTicket.dataset.id}`;
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
          ticketObj.description.textContent = recievedDescription;
          ticketObj.description.classList.toggle('hidden');
        } catch (e) {
          console.error(e);
        }
      }
    });

    xhr.send();
  }
}
