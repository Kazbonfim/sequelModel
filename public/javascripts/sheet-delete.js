function deleteUser(userId) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `/users/delete/${userId}`;

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'userId';
    input.value = userId;

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
}