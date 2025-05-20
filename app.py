def generate_html():
    html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Management System</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Login/Signup Modal -->
    <div id="authModal" class="modal">
        <div class="modal-content">
            <div class="auth-tabs">
                <button class="tab-btn active" data-tab="login">Login</button>
                <button class="tab-btn" data-tab="signup">Sign Up</button>
            </div>
            
            <div id="login" class="auth-form active">
                <h2>Admin Login</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="loginEmail"><i class="fas fa-envelope"></i> Email:</label>
                        <input type="email" id="loginEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="loginPassword"><i class="fas fa-lock"></i> Password:</label>
                        <input type="password" id="loginPassword" required>
                    </div>
                    <button type="submit" class="btn"><i class="fas fa-sign-in-alt"></i> Login</button>
                </form>
            </div>
            
            <div id="signup" class="auth-form">
                <h2>Admin Sign Up</h2>
                <form id="signupForm">
                    <div class="form-group">
                        <label for="signupName"><i class="fas fa-user"></i> Full Name:</label>
                        <input type="text" id="signupName" required>
                    </div>
                    <div class="form-group">
                        <label for="signupEmail"><i class="fas fa-envelope"></i> Email:</label>
                        <input type="email" id="signupEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="signupPassword"><i class="fas fa-lock"></i> Password:</label>
                        <input type="password" id="signupPassword" required>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword"><i class="fas fa-lock"></i> Confirm Password:</label>
                        <input type="password" id="confirmPassword" required>
                    </div>
                    <button type="submit" class="btn"><i class="fas fa-user-plus"></i> Sign Up</button>
                </form>
            </div>
        </div>
    </div>

    <div id="mainContent" style="display: none;">
        <header>
            <div class="container">
                <h1><i class="fas fa-user-graduate"></i> Calbayog City National High School</h1>
                <nav>
                    <ul>
                        <li><a href="#dashboard" class="active"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                        <li><a href="#students"><i class="fas fa-users"></i> Students</a></li>
                        <li><a href="#add-student"><i class="fas fa-user-plus"></i> Add Student</a></li>
                        <li><a href="#search"><i class="fas fa-search"></i> Search</a></li>
                        <li><a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                    </ul>
                </nav>
            </div>
        </header>

        <main class="container">
            <section id="dashboard" class="content-section active">
                <h2><i class="fas fa-tachometer-alt"></i> Dashboard</h2>
                <div class="stats-container">
                    <div class="stat-card">
                        <h3>Total Students</h3>
                        <p id="totalStudents">0</p>
                    </div>
                    <div class="stat-card">
                        <h3>1st Year</h3>
                        <p id="firstYear">0</p>
                    </div>
                    <div class="stat-card">
                        <h3>2nd Year</h3>
                        <p id="secondYear">0</p>
                    </div>
                    <div class="stat-card">
                        <h3>3rd Year</h3>
                        <p id="thirdYear">0</p>
                    </div>
                    <div class="stat-card">
                        <h3>4th Year</h3>
                        <p id="fourthYear">0</p>
                    </div>
                </div>
            </section>

            <section id="students" class="content-section">
                <h2><i class="fas fa-users"></i> Student Records</h2>
                <div class="table-responsive">
                    <table id="studentsTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="studentsTableBody">
                            <!-- Student data will be inserted here by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="add-student" class="content-section">
                <h2><i class="fas fa-user-plus"></i> Add New Student</h2>
                <div class="form-container">
                    <form id="studentForm">
                        <div class="form-group">
                            <label for="studentId"><i class="fas fa-id-card"></i> Student ID:</label>
                            <input type="text" id="studentId" required>
                        </div>
                        <div class="form-group">
                            <label for="firstName"><i class="fas fa-user"></i> First Name:</label>
                            <input type="text" id="firstName" required>
                        </div>
                        <div class="form-group">
                            <label for="lastName"><i class="fas fa-user"></i> Last Name:</label>
                            <input type="text" id="lastName" required>
                        </div>
                        <div class="form-group">
                            <label for="email"><i class="fas fa-envelope"></i> Email:</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="course"><i class="fas fa-book"></i> Course:</label>
                            <input type="text" id="course" required>
                        </div>
                        <div class="form-group">
                            <label for="year"><i class="fas fa-calendar-alt"></i> Year:</label>
                            <select id="year" required>
                                <option value="">Select Year</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                        </div>
                        <button type="submit" class="btn"><i class="fas fa-plus-circle"></i> Add Student</button>
                    </form>
                </div>
            </section>

            <section id="search" class="content-section">
                <h2><i class="fas fa-search"></i> Search Students</h2>
                <div class="search-container">
                    <div class="search-box">
                        <input type="text" id="searchInput" placeholder="Search by name, ID, or course...">
                        <button id="searchBtn" class="btn"><i class="fas fa-search"></i> Search</button>
                        <button id="resetSearchBtn" class="btn btn-secondary"><i class="fas fa-undo"></i> Reset</button>
                    </div>
                    <div class="search-results">
                        <table id="searchResultsTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Year</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="searchResultsBody">
                                <!-- Search results will appear here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>

        <footer>
            <div class="container">
                <p>&copy; 2023 Student Management System | Developed with <i class="fas fa-heart"></i></p>
                <div class="social-links">
                    <a href="#"><i class="fab fa-github"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>"""
    
    with open('index.html', 'w') as f:
        f.write(html)

if __name__ == '__main__':
    generate_html()
    print("HTML file generated successfully!")