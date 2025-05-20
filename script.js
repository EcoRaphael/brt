// Add this at the beginning of your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Authentication Elements
    const authModal = document.getElementById('authModal');
    const mainContent = document.getElementById('mainContent');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    // Forgot Password Elements
const forgotPasswordLink = document.getElementById('forgotPassword');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const backToLoginLink = document.getElementById('backToLogin');
const resetPasswordForm = document.getElementById('resetPasswordForm');

// Show Forgot Password Form
forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.auth-form.active').classList.remove('active');
    forgotPasswordForm.classList.add('active');
});

// Back to Login
backToLoginLink.addEventListener('click', function(e) {
    e.preventDefault();
    forgotPasswordForm.classList.remove('active');
    document.getElementById('login').classList.add('active');
    document.querySelector('.tab-btn[data-tab="login"]').classList.add('active');
});

// Reset Password Form
resetPasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;
    
    // In a real app, you would send this to a server
    alert(`Password reset link has been sent to ${email}`);
    forgotPasswordForm.classList.remove('active');
    document.getElementById('login').classList.add('active');
    document.querySelector('.tab-btn[data-tab="login"]').classList.add('active');
    resetPasswordForm.reset();
});

    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (isLoggedIn) {
        authModal.style.display = 'none';
        mainContent.style.display = 'block';
    } else {
        authModal.style.display = 'flex';
        mainContent.style.display = 'none';
    }
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === tabId) {
                    form.classList.add('active');
                }
            });
        });
    });
    
    // Login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // In a real app, you would validate against a server
        // For this frontend-only example, we'll use localStorage
        const admins = JSON.parse(localStorage.getItem('admins')) || [];
        const admin = admins.find(a => a.email === email && a.password === password);
        
        if (admin) {
            localStorage.setItem('adminLoggedIn', 'true');
            authModal.style.display = 'none';
            mainContent.style.display = 'block';
        } else {
            alert('Invalid email or password');
        }
    });
    
    // Signup
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        const admins = JSON.parse(localStorage.getItem('admins')) || [];
        
        if (admins.some(a => a.email === email)) {
            alert('Email already registered');
            return;
        }
        
        admins.push({ name, email, password });
        localStorage.setItem('admins', JSON.stringify(admins));
        
        alert('Registration successful! Please login.');
        document.querySelector('.tab-btn[data-tab="login"]').click();
        signupForm.reset();
    });
    
    // Logout
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('adminLoggedIn');
        authModal.style.display = 'flex';
        mainContent.style.display = 'none';
    });
    
    // Rest of your existing code...
    // [Keep all your existing student management code here]
});
// Student Management System
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navLinks = document.querySelectorAll('nav a');
    const contentSections = document.querySelectorAll('.content-section');
    const studentForm = document.getElementById('studentForm');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resetSearchBtn = document.getElementById('resetSearchBtn');
    const studentsTableBody = document.getElementById('studentsTableBody');
    const searchResultsBody = document.getElementById('searchResultsBody');

    
    // Stats elements
    const totalStudentsEl = document.getElementById('totalStudents');
    const firstYearEl = document.getElementById('firstYear');
    const secondYearEl = document.getElementById('secondYear');
    const thirdYearEl = document.getElementById('thirdYear');
    const fourthYearEl = document.getElementById('fourthYear');
    
    // Initialize students array from localStorage or empty array
    let students = JSON.parse(localStorage.getItem('students')) || [];
    // ===== SIDEBAR TOGGLE FUNCTIONALITY =====
    // Add this right before the end of the DOMContentLoaded function
   // Add this to your existing DOMContentLoaded event
   
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const contentWrapper = document.querySelector('.content-wrapper');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
         });

        // Check for saved sidebar state
         if (localStorage.getItem('sidebarCollapsed') === 'true') {
        sidebar.classList.add('collapsed');
        }
    }
    // ===== END SIDEBAR TOGGLE =====
    
    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const target = this.getAttribute('href');
            document.querySelector(target).classList.add('active');
            
            // If going to dashboard, update stats
            if (target === '#dashboard') {
                updateStats();
            }
            
            // If going to students, render table
            if (target === '#students') {
                renderStudentsTable();
            }
        });
    });
    

    // Update dashboard statistics
    function updateStats() {
        totalStudentsEl.textContent = students.length;
        
        const yearCounts = {
            1: 0,
            2: 0,
            3: 0,
            4: 0
        };
        
        students.forEach(student => {
            yearCounts[student.year]++;
        });
        
        firstYearEl.textContent = yearCounts[1];
        secondYearEl.textContent = yearCounts[2];
        thirdYearEl.textContent = yearCounts[3];
        fourthYearEl.textContent = yearCounts[4];
    }
    
    // Render students table
    function renderStudentsTable(studentsToRender = students) {
        studentsTableBody.innerHTML = '';
        
        if (studentsToRender.length === 0) {
            studentsTableBody.innerHTML = '<tr><td colspan="7" class="no-data">No student records found</td></tr>';
            return;
        }
        
        studentsToRender.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>Year ${student.year}</td>
                <td class="action-btns">
                    <button class="btn btn-danger" onclick="deleteStudent('${student.id}')">
                        <i class="fas fa-trash-alt"></i> Delete
                    </button>
                </td>
            `;
            studentsTableBody.appendChild(row);
        });
    }
    
    // Render search results
    function renderSearchResults(studentsToRender) {
        searchResultsBody.innerHTML = '';
        
        if (studentsToRender.length === 0) {
            searchResultsBody.innerHTML = '<tr><td colspan="5" class="no-data">No matching students found</td></tr>';
            return;
        }
        
        studentsToRender.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.firstName} ${student.lastName}</td>
                <td>${student.course}</td>
                <td>Year ${student.year}</td>
                <td class="action-btns">
                    <button class="btn btn-danger" onclick="deleteStudent('${student.id}')">
                        <i class="fas fa-trash-alt"></i> Delete
                    </button>
                </td>
            `;
            searchResultsBody.appendChild(row);
        });
    }
    
    // Add new student
    studentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const student = {
            id: document.getElementById('studentId').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            course: document.getElementById('course').value,
            year: document.getElementById('year').value
        };
        
        // Check if student ID already exists
        if (students.some(s => s.id === student.id)) {
            alert('Student ID already exists!');
            return;
        }
        
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        
        // Reset form
        studentForm.reset();
        
        // Update UI
        updateStats();
        renderStudentsTable();
        
        // Show success message
        alert('Student added successfully!');
    });
    
    // Search students
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (!searchTerm) {
            alert('Please enter a search term');
            return;
        }
        
        const filteredStudents = students.filter(student => 
            student.id.toLowerCase().includes(searchTerm) ||
            student.firstName.toLowerCase().includes(searchTerm) ||
            student.lastName.toLowerCase().includes(searchTerm) ||
            student.course.toLowerCase().includes(searchTerm) ||
            student.year.includes(searchTerm)
        );
        
        renderSearchResults(filteredStudents);
    });
    
    // Reset search
    resetSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        searchResultsBody.innerHTML = '<tr><td colspan="5" class="no-data">Enter a search term to find students</td></tr>';
    });
    
    // Initial setup
    updateStats();
    renderStudentsTable();
    searchResultsBody.innerHTML = '<tr><td colspan="5" class="no-data">Enter a search term to find students</td></tr>';
});

// Delete student (global function to work with inline onclick)
function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students = students.filter(student => student.id !== studentId);
        localStorage.setItem('students', JSON.stringify(students));
        
        // Refresh all views
        document.querySelectorAll('#studentsTableBody, #searchResultsBody').forEach(el => {
            el.innerHTML = '';
        });
        
        // Re-render everything
        if (document.querySelector('#dashboard.active')) {
            document.querySelector('#totalStudents').textContent = students.length;
        }
        
        if (document.querySelector('#students.active')) {
            renderStudentsTable(students);
        }
        
        if (document.querySelector('#search.active')) {
            const searchTerm = document.getElementById('searchInput').value;
            if (searchTerm) {
                const filteredStudents = students.filter(student => 
                    student.id.toLowerCase().includes(searchTerm) ||
                    student.firstName.toLowerCase().includes(searchTerm) ||
                    student.lastName.toLowerCase().includes(searchTerm) ||
                    student.course.toLowerCase().includes(searchTerm) ||
                    student.year.includes(searchTerm)
                );
                renderSearchResults(filteredStudents);
            }
        }
    }
}

// Helper functions for re-rendering
function renderStudentsTable(studentsToRender) {
    const studentsTableBody = document.getElementById('studentsTableBody');
    studentsTableBody.innerHTML = '';
    
    if (studentsToRender.length === 0) {
        studentsTableBody.innerHTML = '<tr><td colspan="7" class="no-data">No student records found</td></tr>';
        return;
    }
    
    studentsToRender.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>Year ${student.year}</td>
            <td class="action-btns">
                <button class="btn btn-danger" onclick="deleteStudent('${student.id}')">
                    <i class="fas fa-trash-alt"></i> Delete
                </button>
            </td>
        `;
        studentsTableBody.appendChild(row);
    });
}

function renderSearchResults(studentsToRender) {
    const searchResultsBody = document.getElementById('searchResultsBody');
    searchResultsBody.innerHTML = '';
    
    if (studentsToRender.length === 0) {
        searchResultsBody.innerHTML = '<tr><td colspan="5" class="no-data">No matching students found</td></tr>';
        return;
    }
    
    studentsToRender.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.firstName} ${student.lastName}</td>
            <td>${student.course}</td>
            <td>Year ${student.year}</td>
            <td class="action-btns">
                <button class="btn btn-danger" onclick="deleteStudent('${student.id}')">
                    <i class="fas fa-trash-alt"></i> Delete
                </button>
            </td>
        `;
        searchResultsBody.appendChild(row);
    });
}