CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(35) NOT NULL,
    last_name VARCHAR(35) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(50) NOT NULL,
    phone_number VARCHAR(25) NOT NULL,
    profile_picture VARCHAR(255),
    role ENUM('admin', 'user') NOT NULL
);

CREATE TABLE IF NOT EXISTS accommodations (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    host_id INTEGER NOT NULL,
    accommodation_type ENUM('house', 'shared room', 'room', 'apartment') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    max_guests TINYINT(2) NOT NULL,
    pictures VARCHAR(255) NOT NULL,
    amenities json not null,
    FOREIGN KEY (host_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    accommodation_id INTEGER NOT NULL,
    guest_id INTEGER NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    reservation_date DATE NOT NULL,
    FOREIGN KEY (accommodation_id) REFERENCES accommodations(id),
    FOREIGN KEY (guest_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    rating ENUM('1','2','3','4','5') NOT NULL,
    review_text TEXT,
    reviewer_id INTEGER NOT NULL,
    accommodation_id INTEGER NOT NULL,
    FOREIGN KEY (reviewer_id) REFERENCES users(id),
    FOREIGN KEY (accommodation_id) REFERENCES accommodations(id)
);

CREATE TABLE IF NOT EXISTS reports(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    report_reason ENUM('inaccurate', 'fake', 'scam', 'offensive', 'unresponsive') NOT NULL,
    report_text TEXT,
    reporting_user INTEGER NOT NULL,
    reported_accommodation INTEGER NOT NULL,
    reported_user INTEGER NOT NULL,
    FOREIGN KEY (reporting_user) REFERENCES users(id),
    FOREIGN KEY (reported_accommodation) REFERENCES accommodations(id),
    FOREIGN KEY (reported_user) REFERENCES users(id)
);


