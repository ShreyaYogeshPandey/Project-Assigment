document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('student-form');
    const studentTable = document.getElementById('student-table').getElementsByTagName('tbody')[0];
    const addStudentBtn = document.getElementById('add-student');

    // Load data from localStorage
    const students = JSON.parse(localStorage.getItem('students')) || [];

    // Function to render table rows
    const renderTable = () => {
        studentTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = studentTable.insertRow();
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
        });
        localStorage.setItem('students', JSON.stringify(students));
    };

    // Add student
    addStudentBtn.addEventListener('click', () => {
        const name = document.getElementById('student-name').value.trim();
        const id = document.getElementById('student-id').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact-number').value.trim();

        // Validation
        if (!name || !/^[A-Za-z ]+$/.test(name)) return alert('Enter a valid name');
        if (!id || isNaN(id)) return alert('Enter a valid ID');
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) return alert('Enter a valid email');
        if (!contact || isNaN(contact)) return alert('Enter a valid contact number');

        students.push({ name, id, email, contact });
        renderTable();
        form.reset();
    });

    // Edit and Delete functions
    window.editStudent = (index) => {
        const student = students[index];
        document.getElementById('student-name').value = student.name;
        document.getElementById('student-id').value = student.id;
        document.getElementById('email').value = student.email;
        document.getElementById('contact-number').value = student.contact;

        students.splice(index, 1);
        renderTable();
    };

    window.deleteStudent = (index) => {
        students.splice(index, 1);
        renderTable();
    };

    // Initial rendering
    renderTable();
});
