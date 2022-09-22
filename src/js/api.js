export default class API {
  static controlButtons(ticket, type, serverURL) {
    const modal = document.querySelector('.modal');
    const form = document.querySelector('.widget-form');
    const submitBtn = document.querySelector('button[data-id=ok]');
    submitBtn.addEventListener('submit', (ev) => {
      ev.preventDefault();
      if (ticket.name === '') return;
      const formData = new FormData();
      formData.append('id', ticket.id);
      formData.append('name', ticket.name);
      formData.append('description', ticket.description);
      formData.append('status', ticket.status);
      formData.append('created', new Date().toLocaleString());

      const ticketURL = `${serverURL}/?method=${type}`;
      const xhr = new XMLHttpRequest();
      xhr.open('POST', ticketURL);
      document.body.style.cursor = 'wait';
      document.style.cursor = 'wait';

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            setTimeout(() => {
              document.body.style.cursor = '';
              document.style.cursor = '';
              document.location.reload();
            }, 1000);
          } catch (e) {
            console.error(e);
          }
        }
      });
      xhr.send(formData);
      modal.remove();
    });

    const cancelBtn = document.querySelector('button[data-id=cancel]');
    cancelBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      modal.remove();
    });
  }

  static addTicketDescription(ticket, serverURL) {
    const inputField = document.querySelector('[data-id=editTicket]');
    const ticketURL = `${serverURL}/?method=ticketById&id=${ticket.id}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', ticketURL);
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

  static showDescription(checkBox, ticket, serverURL) {
    if (document.querySelector('.modal')) return;
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

  static changeStatus(checkBox, ticket, serverURL) {
    if (document.querySelector('.modal')) return;
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
      default:
        console.error('Change status function failes..');
        return;
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
        }
      }
    });

    xhr.send(formData);
  }
}
