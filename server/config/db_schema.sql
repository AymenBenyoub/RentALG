CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(35) not null,
    last_name VARCHAR(35) not null,
    email VARCHAR(255) not null,
    password VARCHAR(50) not null,
    phone_number VARCHAR(25) not null,
    profile_picture VARCHAR(255) ,
    role ENUM('admin' , 'user') not null
);

CREATE TABLE IF NOT EXISTS accommodations (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT,
    host_id INTEGER NOT NULL references users.id,
    accommodation_type ENUM('house','shared room','room','apartment') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price_per_night DECIMAL(10,2) not NULL,
    max_guests tinyint(2) NOT NULL,
    pictures VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER primary key auto_increment,
    accomodation_id INTEGER not null references accomodations.id ,
    guest_id INTEGER not null references users.id,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    reservation_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTO_increment,
    rating decimal(3,2) NOT NULL,
    reviewer_id INTEGER NOT NULL references users.id,
    accomodation_id INTEGER NOT NULL references accomodation.id
);
CREATE TABLE IF NOT EXISTS reports(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    report_reason ENUM('inaccurate','fake','scam','offensive','unresponsive') NOT NULL,
    report_text TEXT ,
    reporting_user INTEGER NOT NULL references users.id,
    reported_accomodation INTEGER  references accomodations.id,
    reported_user INTEGER NOT NULL references users.id
)

CREATE TABLE if NOT EXISTS amenities (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);
CREATE IF NOT EXISTS TABLE accommodation_amenities (
    accomodation_id INTEGER,
    amenitie_id INTEGER,
    PRIMARY KEY (accomodation_id,amenitie_id) 
);
INSERT into amenities(name) VALUES('Wifi');
INSERT into amenities (name) VALUES('Kitchen');
INSERT into amenities (name) VALUES('Gym');
INSERT into amenities(name)  VALUES('Bath tub');
INSERT into amenities(name)  VALUES('TV');
INSERT into amenities(name)  VALUES('Sauna');
INSERT into amenities(name)  VALUES('Pool');
INSERT into amenities(name)  VALUES('Beach view');
INSERT into amenities(name)  VALUES('BBQ grill');



