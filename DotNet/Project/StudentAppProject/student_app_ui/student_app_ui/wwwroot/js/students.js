$(function () {
    // Load students on page ready
    loadStudents();

    $('#btn-logout').on('click', function () {
        localStorage.removeItem('jwtToken');
        window.location = '/Auth/Login';
    });

    $('#btn-add-student').on('click', function () {
        openStudentModal(); // opens blank modal for create
    });
    $('#btnCourses').on('click', function () {
        window.location = '/Courses/List';// opens blank modal for create
    });
    // delegate events for dynamic elements
    $('#studentsTable tbody').on('click', '.btn-view-courses', function () {
        const id = $(this).data('id');
        viewCourses(id);
    });

    $('#studentsTable tbody').on('click', '.btn-edit-student', function () {
        const id = $(this).data('id');
        editStudent(id);
    });

    // submit handler for edit form (modal)
    $(document).on('submit', '#studentEditForm', function (e) {
        e.preventDefault();
        saveStudent();
    });
});

function getToken() {
    return localStorage.getItem('jwtToken') || '';
}

async function loadStudents() {
    const token = getToken();
    if (!token) {
        window.location = '/Auth/Login';
        return;
    }

    try {
        const res = await fetch('https://localhost:7030/api/Students', {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (res.status === 401) {
            alert('Unauthorized. Please login again.');
            localStorage.removeItem('jwtToken');
            window.location = '/Auth/Login';
            return;
        }

        const students = await res.json();
        const rows = students.map(s => `
            <tr>
                <td>${s.studentId}</td>
                <td>${s.rollNumber}</td>
                <td>${s.name}</td>
                <td>${s.email || ''}</td>
                <td>${s.phone || ''}</td>
                <td>${s.course?.courseName || ''}</td>
                <td>
                    <button class="btn btn-sm btn-info btn-view-courses" data-id="${s.studentId}">Courses</button>
                    <button class="btn btn-sm btn-warning btn-edit-student" data-id="${s.studentId}">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStudent(${s.studentId})">Delete</button>
                </td>
            </tr>
        `).join('');
        $('#studentsTable tbody').html(rows);
    } catch (err) {
        console.error(err);
        alert('Failed to load students');
    }
}

async function viewCourses(studentId) {
    const token = getToken();
    try {
        // If your API has a route like /api/students/{id} with included courses:
        const res = await fetch(`https://localhost:7030/api/Students/${studentId}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const student = await res.json();
        // student.course if one course, or you may need /api/courses?studentId=...
        let html = `<div class="modal" id="coursesModal" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
            <div class="modal-header"><h5 class="modal-title">Courses for ${student.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
            <div class="modal-body">`;

        // If student.Course is single object:
        if (student.course) {
            html += `<ul class="list-group">
                <li class="list-group-item"><strong>${student.course.courseCode}</strong> - ${student.course.courseName}</li>
            </ul>`;
        } else if (student.courses && student.courses.length) {
            student.courses.forEach(c => {
                html += `<li class="list-group-item">${c.courseCode} - ${c.courseName}</li>`;
            });
        } else {
            html += `<p class="text-muted">No courses found.</p>`;
        }

        html += `</div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div></div></div></div>`;
        $('#studentModalPlaceholder').html(html);
        const modalEl = document.getElementById('coursesModal');
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    } catch (err) {
        console.error(err);
        alert('Failed to load courses');
    }
}

async function editStudent(id) {
    const token = getToken();
    try {
        const res = await fetch(`https://localhost:7030/api/Students/${id}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const s = await res.json();

        // load modal partial (server-side partial or we already have markup)
        const modalHtml = await fetch('/Students/EditModal').then(r => r.text());
        $('#studentModalPlaceholder').html(modalHtml);

        // Populate modal fields
        $('#StudentId').val(s.studentId);
        $('#RollNumber').val(s.rollNumber);
        $('#Name').val(s.name);
        $('#Email').val(s.email || '');
        $('#Phone').val(s.phone || '');

        // load courses into select
        await loadCoursesIntoSelect();

        $('#CourseId').val(s.courseId || '');

        const modalEl = document.getElementById('studentEditModal');
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    } catch (err) {
        console.error(err);
        alert('Failed to load student');
    }
}

async function openStudentModal() {
    const modalHtml = await fetch('/Students/EditModal').then(r => r.text());
    $('#studentModalPlaceholder').html(modalHtml);
    $('#StudentId').val('');
    $('#RollNumber').val('');
    $('#Name').val('');
    $('#Email').val('');
    $('#Phone').val('');
    await loadCoursesIntoSelect();
    const modal = new bootstrap.Modal(document.getElementById('studentEditModal'));
    modal.show();
}

async function loadCoursesIntoSelect() {
    const token = getToken();
    try {
        const res = await fetch('https://localhost:7030/api/Courses', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const courses = await res.json();
        const options = courses.map(c => `<option value="${c.courseId}">${c.courseName} (${c.courseCode})</option>`).join('');
        $('#CourseId').html(`<option value="">-- none --</option>` + options);
    } catch (err) {
        console.error(err);
    }
}

async function saveStudent() {
    const token = getToken();
    const id = $('#StudentId').val();
    const payload = {
        studentId: id ? parseInt(id) : 0,
        rollNumber: $('#RollNumber').val(),
        name: $('#Name').val(),
        email: $('#Email').val(),
        phone: $('#Phone').val(),
        courseId: $('#CourseId').val() ? parseInt($('#CourseId').val()) : null
    };

    try {
        if (!id) {
            // create
            const res = await fetch('https://localhost:7030/api/Students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error('Create failed');
        } else {
            // update
            const res = await fetch(`https://localhost:7030/api/Students/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error('Update failed');
        }

        bootstrap.Modal.getInstance(document.getElementById('studentEditModal')).hide();
        loadStudents();
    } catch (err) {
        console.error(err);
        alert('Failed to save student');
    }
}

async function deleteStudent(id) {
    if (!confirm('Delete this student?')) return;
    const token = getToken();
    try {
        const res = await fetch(`https://localhost:7030/api/Students/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        if (!res.ok) throw new Error('Delete failed');
        loadStudents();
    } catch (err) {
        console.error(err);
        alert('Failed to delete student');
    }
}
