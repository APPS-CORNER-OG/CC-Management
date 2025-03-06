document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const newNoticeBtn = document.getElementById('newNoticeBtn');
    const noticeForm = document.getElementById('noticeForm');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('noticeFormElement');
    const noticeContainer = document.getElementById('noticeContainer');
    const textarea = document.getElementById('noticeContent');
    const charCount = document.getElementById('charCount');

    // State
    let isEditing = false;
    let currentEditId = null;

    // Event Listeners
    newNoticeBtn.addEventListener('click', showForm);
    closeBtn.addEventListener('click', hideForm);
    cancelBtn.addEventListener('click', hideForm);
    form.addEventListener('submit', handleSubmit);
    textarea.addEventListener('input', updateCharCount);

    // Initialize
    loadNotices();

    function showForm() {
        noticeForm.style.display = 'flex';
    }

    function hideForm() {
        noticeForm.style.display = 'none';
        resetForm();
    }

    function updateCharCount() {
        const length = textarea.value.length;
        charCount.textContent = length;
        const progress = document.querySelector('.progress-fill');
        progress.style.width = `${(length/300)*100}%`;
        progress.style.backgroundColor = length >= 280 ? 'var(--error-red)' : 'var(--primary-blue)';
    }

    function handleSubmit(e) {
        e.preventDefault();
        const title = document.getElementById('noticeTitle').value.trim();
        const content = document.getElementById('noticeContent').value.trim();

        if (!title || !content) {
            alert('Please fill in all fields');
            return;
        }

        const notice = {
            id: Date.now(),
            title,
            content,
            date: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            })
        };

        if (isEditing) {
            updateNotice(currentEditId, notice);
        } else {
            createNotice(notice);
        }

        hideForm();
    }

    function createNotice(notice) {
        const element = document.createElement('div');
        element.className = 'notice-post';
        element.dataset.id = notice.id;
        element.innerHTML = `
            <div class="action-buttons">
                <button class="btn-action btn-edit"><i class="fas fa-edit"></i></button>
                <button class="btn-action btn-delete"><i class="fas fa-trash"></i></button>
            </div>
            <h3>${notice.title}</h3>
            <p>${notice.content}</p>
            <div class="post-date">Posted: ${notice.date}</div>
        `;

        element.querySelector('.btn-edit').addEventListener('click', () => editNotice(notice.id));
        element.querySelector('.btn-delete').addEventListener('click', () => deleteNotice(notice.id));
        
        noticeContainer.prepend(element);
        saveNotices();
    }

    function editNotice(id) {
        const notice = document.querySelector(`[data-id="${id}"]`);
        document.getElementById('noticeTitle').value = notice.querySelector('h3').textContent;
        document.getElementById('noticeContent').value = notice.querySelector('p').textContent;
        currentEditId = id;
        isEditing = true;
        document.getElementById('formTitle').textContent = 'Edit Notice';
        showForm();
    }

    function updateNotice(id, newData) {
        const notice = document.querySelector(`[data-id="${id}"]`);
        notice.querySelector('h3').textContent = newData.title;
        notice.querySelector('p').textContent = newData.content;
        notice.querySelector('.post-date').textContent = `Updated: ${newData.date}`;
        saveNotices();
        isEditing = false;
        currentEditId = null;
    }

    function deleteNotice(id) {
        if (confirm('Delete this notice?')) {
            document.querySelector(`[data-id="${id}"]`).remove();
            saveNotices();
        }
    }

    function resetForm() {
        form.reset();
        charCount.textContent = '0';
        document.querySelector('.progress-fill').style.width = '0%';
        isEditing = false;
        currentEditId = null;
        document.getElementById('formTitle').textContent = 'New Notice';
    }

    function saveNotices() {
        const notices = Array.from(noticeContainer.children).map(notice => ({
            id: notice.dataset.id,
            title: notice.querySelector('h3').textContent,
            content: notice.querySelector('p').textContent,
            date: notice.querySelector('.post-date').textContent.replace(/(Posted|Updated): /, '')
        }));
        localStorage.setItem('notices', JSON.stringify(notices));
    }

    function loadNotices() {
        const notices = JSON.parse(localStorage.getItem('notices')) || [];
        notices.forEach(notice => {
            notice.id = notice.id || Date.now();
            createNotice(notice);
        });
    }
});
