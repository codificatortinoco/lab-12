document.addEventListener('DOMContentLoaded', loadContacts);

const contactForm = document.getElementById('contact-form');
const contactsList = document.getElementById('contacts-list');

let isEditing = false;
let currentEmail = '';

contactForm.addEventListener('submit', handleFormSubmit);

function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.forEach(contact => {
        displayContact(contact);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value; // Get the address value

    const contact = { name, email, phone, address }; // Include address in the contact object
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    if (isEditing) {
        // Update existing contact
        const index = contacts.findIndex(c => c.email === currentEmail);
        contacts[index] = contact;
        localStorage.setItem('contacts', JSON.stringify(contacts));
        isEditing = false;
        currentEmail = '';
    } else {
        // Add new contact
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    
    refreshContactsList();
    contactForm.reset();
}

function displayContact(contact) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${contact.name} - ${contact.email} - ${contact.phone} - ${contact.address}</span> <!-- Display address -->
        <button class="edit-button" onclick="editContact('${contact.email}')">Edit</button>
        <button class="delete-button" onclick="deleteContact('${contact.email}')">Delete</button>
    `;
    contactsList.appendChild(li);
}

function editContact(email) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts.find(c => c.email === email);
    
    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('address').value = contact.address; // Set address in the form

    isEditing = true;
    currentEmail = email;
}

function deleteContact(email) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts = contacts.filter(contact => contact.email !== email);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    refreshContactsList();
}

function refreshContactsList() {
    contactsList.innerHTML = '';
    loadContacts();
}