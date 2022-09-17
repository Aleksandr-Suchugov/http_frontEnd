import API(container) from './api';
import Widgets from './widgets';

const port = 7070;
const serverURL = `http://localhost:${port}`;

const container = document.querySelector('.container');
const ticketsList = document.querySelector('.tickets-list');
const addTicketBtn = document.querySelector('.add-ticket');
const widget = new Widgets();
const api = new API(container);

document.addEventListener('DOMContentLoaded', () => {

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${serverURL}/?method=allTickets`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        // console.log('load from server is ok');
        const responsedTickets = xhr.response;
        // console.log('xhr.response: ', xhr.response);
        if (!responsedTickets.length) return;
        responsedTickets.forEach((ticket) => {
          // console.log(ticket);
          ticketsList.appendChild(widget.getTicket(ticket));
          const currentTicket = ticketsList.lastElementChild;
          const ticketStatus = currentTicket.querySelector('.ticket-status');
          const statusCheckbox = ticketStatus.querySelector('.ticket-status-checkbox');
          if (ticket.status === 'fixed') statusCheckbox.classList.remove('hidden');
          ticketStatus.addEventListener('click', () => {
            api.changeStatus(statusCheckbox, ticket, serverURL);
            api.controlButtons(ticket, 'changeTicketStatus', serverURL);
          });

          const ticketName = currentTicket.querySelector('.ticket-name');
          ticketName.addEventListener('click', () => api.showDescription(statusCheckbox, ticket, serverURL));
          
          const ticketEdit = currentTicket.querySelector('.ticket-edit-button');
          ticketEdit.addEventListener('click', () => {
            container.appendChild(widget.editTicketHTML);
            api.addTicketDescription(ticket, serverURL);
            api.controlButtons(ticket, 'editTicket', serverURL);
          });
  
          const ticketRemove = currentTicket.querySelector('.ticket-remove-button');
          ticketRemove.addEventListener('click', () => {
            container.appendChild(widget.removeTicketHTML);
            api.controlButtons(ticket, 'removeTicket', serverURL);
          });
        });
      } catch (e) {
        console.error(e);
        // throw e;
      }
    }
  });
  xhr.send();

  //  ADD TICKET BUTTON LOGIC
  addTicketBtn.addEventListener('click', () => {
    container.appendChild(widget.newTicketHTML);
    api.controlButtons(ticket, 'createTicket', serverURL);
  });
});
