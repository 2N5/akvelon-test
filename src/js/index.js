import { url, errorMessage, contentType } from './constants';
import randomId from './randomId';
import '../scss/style.scss';

const appTitle = document.getElementById('app-title');
const appActions = document.getElementById('app-actions');
const appTable = document.getElementById('app-table');
const appForm = document.getElementById('app-form');
const table = document.querySelector('.table tbody');
const form = document.getElementById('form');
const actionAdd = document.querySelector('[data-action="add"]');
const actionCancel = document.querySelector('[data-action="cancel"]');

function showForm() {
  appTitle.textContent = 'Create Invoice';

  appActions.style.display = 'none';
  appTable.style.display = 'none';
  appForm.style.display = 'block';
}

function hideForm() {
  appTitle.textContent = 'Invoices';

  appActions.style.display = 'block';
  appTable.style.display = 'block';
  appForm.style.display = 'none';

  form.reset();
}

function editItem(e, item) {
  e.preventDefault();

  document.getElementById('item-id').value = item.id;
  document.getElementById('item-number').value = item.querySelector(
    '.item-number'
  ).textContent;
  document.getElementById('item-date_created').value = item.querySelector(
    '.item-date_created'
  ).textContent;
  document.getElementById('item-date_supplied').value = item.querySelector(
    '.item-date_supplied'
  ).textContent;
  document.getElementById('item-comment').value = item.querySelector(
    '.item-comment'
  ).textContent;

  showForm();
}

function deleteItem(e, item) {
  e.preventDefault();

  const confirmation = confirm(
    `delete entry number: ${item.querySelector('.item-number').textContent}?`
  );

  if (confirmation) {
    fetch(`${url}/${item.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        document.getElementById(`${item.id}`).remove();
      })
      .catch(() => {
        alert(errorMessage);
        document.getElementById(`${item.id}`).remove();
      });
  }
}

function addItem(data, list) {
  const itemId = data.id || randomId();
  const item = `<tr id="${itemId}" class="item">
    <td class="item-date_created item-date">${data.date_created}</td>
    <td class="item-number text-main">${data.number}</td>
    <td class="item-date_supplied item-date">${data.date_supplied || '—'}</td>
    <td class="item-comment">${data.comment || '—'}</td>
    <td class="item-actions">
      <button type="button" class="btn btn-sm" data-action="edit" aria-label="edit invoice">
        <span class="icon-edit"></span>
      </button>
      <button type="button" class="btn btn-sm" data-action="delete" aria-label="delete invoice">
        <span class="icon-delete"></span>
      </button>
    </td>
  </tr>`;

  list.insertAdjacentHTML('beforeend', item);

  const newItem = document.getElementById(`${itemId}`);
  const actionEdit = newItem.querySelector('[data-action="edit"]');
  const actionDelete = newItem.querySelector('[data-action="delete"]');

  actionEdit.addEventListener('click', e => {
    editItem(e, newItem);
  });
  actionDelete.addEventListener('click', e => {
    deleteItem(e, newItem);
  });
}

function init() {
  actionAdd.addEventListener('click', showForm);

  actionCancel.addEventListener('click', hideForm);

  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.id = data.id || randomId();
    data.number = +data.number || data.number;

    fetch(`${url}/?id=${data.id}`)
      .then(response => response.json())
      .then(json => {
        if (json.length) {
          fetch(`${url}/${data.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': contentType
            },
            body: JSON.stringify(data)
          })
            .then(answer => answer.json())
            .then(answerData => {
              document.getElementById(answerData.id).remove();

              addItem(answerData, table);
            })
            .catch(() => {
              alert(errorMessage);

              document.getElementById(data.id).remove();

              addItem(data, table);
              hideForm();
            });
        } else {
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': contentType
            },
            body: JSON.stringify(data)
          })
            .then(answer => {
              return answer.json();
            })
            .then(answerData => {
              addItem(answerData, table);
            })
            .catch(() => {
              alert(errorMessage);

              addItem(data, table);
              hideForm();
            });
        }
      })
      .then(() => hideForm())
      .catch(() => {
        alert(errorMessage);

        if (document.getElementById(data.id)) {
          document.getElementById(data.id).remove();
        }

        addItem(data, table);
        hideForm();
      });
  });

  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(elData => {
        addItem(elData, table);
      });
    })
    .catch(() => {
      alert(errorMessage);
    });
}

init();
