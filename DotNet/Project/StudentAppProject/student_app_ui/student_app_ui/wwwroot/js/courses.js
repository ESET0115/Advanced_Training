$(function () {
    loadCourses();
    $('#btn-add-course').on('click', openAddCourseModal);
});

function getToken() { return localStorage.getItem('jwtToken'); }

async function loadCourses() {
    const token = getToken();
    if (!token) { window.location = '/Auth/Login'; return; }

    try {
        const res = await fetch('https://localhost:7030/api/Courses', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const courses = await res.json();
        const rows = courses.map(c => `
            <tr>
                <td>${c.courseId}</td>
                <td>${c.courseCode}</td>
                <td>${c.courseName}</td>
                <td>${c.department || ''}</td>
                <td>${c.semester || ''}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editCourse(${c.courseId})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCourse(${c.courseId})">Delete</button>
                </td>
            </tr>
        `).join('');
        $('#coursesTable tbody').html(rows);
    } catch (err) {
        console.error(err);
        alert('Failed to load courses');
    }
}

async function openAddCourseModal() {
    const html = `
    <div class="modal fade" id="courseModal">
      <div class="modal-dialog"><div class="modal-content">
        <form id="courseForm">
          <div class="modal-header"><h5 class="modal-title">Add Course</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
          <div class="modal-body">
            <input id="CourseId" type="hidden" />
            <div class="mb-3"><label>Course Code</label><input id="CourseCode" class="form-control" required /></div>
            <div class="mb-3"><label>Course Name</label><input id="CourseName" class="form-control" required /></div>
            <div class="mb-3"><label>Department</label><input id="Department" class="form-control"/></div>
            <div class="mb-3"><label>Semester</label><input id="Semester" class="form-control" type="number"/></div>
          </div>
          <div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
        </form>
      </div></div>
    </div>`;
    $('#studentModalPlaceholder').html(html);
    const modal = new bootstrap.Modal(document.getElementById('courseModal'));
    modal.show();

    $(document).on('submit', '#courseForm', async function (e) {
        e.preventDefault();
        await saveCourse();
    });
}

async function saveCourse() {
    const token = getToken();
    const id = $('#CourseId').val();
    const payload = {
        courseId: id ? parseInt(id) : 0,
        courseCode: $('#CourseCode').val(),
        courseName: $('#CourseName').val(),
        department: $('#Department').val(),
        semester: $('#Semester').val() ? parseInt($('#Semester').val()) : null
    };

    try {
        if (!id) {
            const res = await fetch('https://localhost:7030/api/Courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error('Create failed');
        } else {
            const res = await fetch(`https://localhost:7030/api/Courses/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error('Update failed');
        }
        bootstrap.Modal.getInstance(document.getElementById('courseModal')).hide();
        loadCourses();
    } catch (err) {
        console.error(err);
        alert('Failed to save course');
    }
}

async function editCourse(courseId) {
    const token = getToken();
    try {
        const res = await fetch(`https://localhost:7030/api/Courses/${courseId}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const c = await res.json();

        // reuse add modal but fill values
        await openAddCourseModal();
        $('#CourseId').val(c.courseId);
        $('#CourseCode').val(c.courseCode);
        $('#CourseName').val(c.courseName);
        $('#Department').val(c.department || '');
        $('#Semester').val(c.semester || '');
    } catch (err) {
        console.error(err);
        alert('Failed to load course');
    }
}

async function deleteCourse(id) {
    if (!confirm('Delete this course?')) return;
    const token = getToken();
    try {
        const res = await fetch(`https://localhost:7030/api/Courses/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        if (!res.ok) throw new Error('Delete failed');
        loadCourses();
    } catch (err) {
        console.error(err);
        alert('Failed to delete course');
    }
}
