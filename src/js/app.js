import API from './api';
import Widgets from './widgets';
import '../css/style.css';

const port = 7070;
const serverURL = `http://localhost:${port}`;

const container = document.querySelector('.container');
const ticketsList = document.querySelector('.tickets-list');
const addTicketBtn = document.querySelector('.add-ticket');

document.addEventListener('DOMContentLoaded', () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${serverURL}/?method=allTickets`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const responsedTickets = xhr.response;
        // console.log('xhr.response: ', xhr.response);
        if (!responsedTickets.length) return;
        responsedTickets.forEach((ticket) => {
          // console.log(ticket);
          ticketsList.insertAdjacentHTML('beforeend', Widgets.getTicketHTML(ticket));
          const currentTicket = ticketsList.lastElementChild;
          const ticketStatus = currentTicket.querySelector('.ticket-status');
          const statusCheckbox = ticketStatus.querySelector('.ticket-status-checkbox');
          if (ticket.status === 'fixed') statusCheckbox.classList.remove('hidden');
          ticketStatus.addEventListener('click', () => {
            API.changeStatus(statusCheckbox, ticket, serverURL);
            API.controlButtons(ticket, 'changeTicketStatus', serverURL);
          });

          const ticketName = currentTicket.querySelector('.ticket-name');
          ticketName.addEventListener('click', () => API.showDescription(statusCheckbox, ticket, serverURL));

          const ticketEdit = currentTicket.querySelector('.ticket-edit-button');
          ticketEdit.addEventListener('click', () => {
            container.insertAdjacentHTML('beforeend', Widgets.editTicketHTML());
            API.addTicketDescription(ticket, serverURL);
            API.controlButtons(ticket, 'editTicket', serverURL);
          });

          const ticketRemove = currentTicket.querySelector('.ticket-remove-button');
          ticketRemove.addEventListener('click', () => {
            container.insertAdjacentHTML('beforeend', Widgets.removeTicketHTML());
            API.controlButtons(ticket, 'removeTicket', serverURL);
          });
        });
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhr.send();

  addTicketBtn.addEventListener('click', () => {
    container.insertAdjacentHTML('beforeend', Widgets.newTicketHTML());
    const newTicket = {};
    newTicket.id = null;
    newTicket.name = container.querySelector('[data-id="name"]').value;
    newTicket.description = container.querySelector('[data-id="description"]').value;
    newTicket.status = 'in progress';
    newTicket.created = new Date().toLocaleString();
    API.controlButtons(newTicket, 'addTicket', serverURL);
  });
});
