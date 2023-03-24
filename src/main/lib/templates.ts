interface ListItem {
  title: string;
  id: number;
  checked: boolean;
  edit: boolean;
}

export const listItem = ({ checked, edit, id, title }: ListItem): string => {
  if (edit) {
    return `
    <li>
      <form method="post" action="/tasks/update/${id}">
        <input type="text" name="title" value="${title}" />
        <input type="checkbox" name="checked" ${checked ? 'checked' : ''} />
        <button>Save</button>
        <a href="/">Cancel</a>
      </form>
    </li>
    `;
  }
  return `
  <li>
    <span style="${
      checked ? 'text-decoration: line-through;' : ''
    }">${title}</span>
    <a href="/?edit=${id}">Edit</a>
    <button formaction="/tasks/delete/${id}" form="delete-tasks-form">Delete</button>
  </li>`;
};
