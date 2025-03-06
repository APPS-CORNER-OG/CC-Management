<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Onneshon Coaching Center Notice Box</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="stylesnot.css">
</head>
<body>
    <div class="hero-section">
        <div class="hero-content">
            <h1>Onneshon Notice Box</h1>
            <p>Official Announcements and Updates</p>
        </div>
        <button id="newNoticeBtn" class="floating-btn">
            <i class="fas fa-plus"></i>
        </button>
    </div>

    <div class="container">
        <div id="noticeContainer" class="notice-container"></div>
    </div>

    <!-- Notice Form -->
    <div id="noticeForm" class="notice-form">
        <div class="notice-form-container">
            <div class="form-header">
                <h2><span id="formTitle">New Notice</span></h2>
                <button type="button" class="close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <form id="noticeForm">
                <div class="form-group">
                    <input type="text" id="noticeTitle" class="modern-input" placeholder=" " required>
                    <label for="noticeTitle">Notice Title</label>
                </div>

                <div class="form-group">
                    <textarea id="noticeContent" class="modern-textarea" placeholder=" " maxlength="300" required></textarea>
                    <label for="noticeContent">Notice Content</label>
                    <div class="form-footer">
                        <div class="char-count"><span id="charCount">0</span>/300</div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="hideNoticeForm()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Publish Notice</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>