let notices = JSON.parse(localStorage.getItem('notices')) || [];
let editMode = false;
let currentNoticeId = null;

document.addEventListener('DOMContentLoaded', () => {
    displayNotices();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('newNoticeBtn').addEventListener('click', showNoticeForm);
    document.getElementById('noticeForm').addEventListener('submit', saveNotice);
    document.querySelector('.close-btn').addEventListener('click', hideNoticeForm);
    document.getElementById('noticeContent').addEventListener('input', updateCharCount);
}

function showNoticeForm() {
    document.getElementById('noticeForm').style.display = 'flex';
}

function hideNoticeForm() {
    document.getElementById('noticeForm').style.display = 'none';
    resetForm();
}

function updateCharCount() {
    document.getElementById('charCount').textContent = 
        document.getElementById('noticeContent').value.length;
}

function saveNotice(e) {
    e.preventDefault();
    const title = document.getElementById('noticeTitle').value;
    const content = document.getElementById('noticeContent').value;

    if (title && content) {
        const notice = {
            id: Date.now(),
            title,
            content,
            date: new Date().toLocaleDateString()
        };

        if (editMode) {
            const index = notices.findIndex(n => n.id === currentNoticeId);
            notices[index] = notice;
            editMode = false;
        } else {
            notices.unshift(notice);
        }

        localStorage.setItem('notices', JSON.stringify(notices));
        displayNotices();
        hideNoticeForm();
    }
}

function displayNotices() {
    const container = document.getElementById('noticeContainer');
    container.innerHTML = notices.map(notice => `
        <div class="notice-post">
            <h3>${notice.title}</h3>
            <p>${notice.content}</p>
            <div class="form-footer">
                <small>Published: ${notice.date}</small>
                <div>
                    <button onclick="editNotice(${notice.id})" class="btn btn-primary">Edit</button>
                    <button onclick="deleteNotice(${notice.id})" class="btn btn-secondary">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
}

function editNotice(id) {
    const notice = notices.find(n => n.id === id);
    document.getElementById('noticeTitle').value = notice.title;
    document.getElementById('noticeContent').value = notice.content;
    document.getElementById('formTitle').textContent = 'Edit Notice';
    currentNoticeId = id;
    editMode = true;
    showNoticeForm();
}

function deleteNotice(id) {
    notices = notices.filter(n => n.id !== id);
    localStorage.setItem('notices', JSON.stringify(notices));
    displayNotices();
}

function resetForm() {
    document.getElementById('noticeForm').reset();
    document.getElementById('formTitle').textContent = 'New Notice';
    editMode = false;
    currentNoticeId = null;
    updateCharCount();
}