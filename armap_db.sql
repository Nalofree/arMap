CREATE DATABASE armap_db;

/*example*/
/*
CREATE TABLE Orders
(
	O_Id int(11) NOT NULL,
	OrderNo int(11) NOT NULL,
	P_Id int(11),
	PRIMARY KEY (O_Id),PRIMARY KEY (),
	CONSTRAINT fk_PerOrders FOREIGN KEY (P_Id)
	REFERENCES Persons(P_Id)
)
*/

CREATE TABLE roles (
	role_id int(11) NOT NULL AUTO_INCREMENT,
	role_name varchar(30),
	PRIMARY KEY (role_id)
);

CREATE TABLE users (
	user_id int(11) NOT NULL AUTO_INCREMENT,
	user_name varchar(30),
	user_pass varchar(60),
	user_role int(11), 
	FOREIGN KEY (user_role) REFERENCES roles (role_id),
	PRIMARY KEY (user_id)
);

CREATE TABLE objects (
	object_id int(11) NOT NULL AUTO_INCREMENT,
	object_name varchar(255),
	object_coordinates varchar(30),
	object_addres varchar(255),
	object_show int(2),
	object_image varchar(255),
	PRIMARY KEY (object_id)
);

CREATE TABLE owners (
	owner_id int(11) NOT NULL AUTO_INCREMENT,
	owner_name varchar(255),
	owner_contact varchar(255),
	PRIMARY KEY (owner_id)
);

CREATE TABLE offices (
	office_id int(11) NOT NULL AUTO_INCREMENT,
	office_description varchar(255),
	office_area int(11),
	office_subprice int(11),
	office_totalprice int(11),
	office_owner int(11), 
	FOREIGN KEY (office_owner) REFERENCES owners (owner_id),
	office_object int(11), 
	FOREIGN KEY (office_object) REFERENCES objects (object_id),
	office_status int(2),
	PRIMARY KEY (office_id)
);

CREATE TABLE included_services (
	includes_id int(11) NOT NULL AUTO_INCREMENT,
	includes_name varchar(255),
	PRIMARY KEY (includes_id)
);

CREATE TABLE extended_services (
	extendes_id int(11) NOT NULL AUTO_INCREMENT,
	extendes_name varchar(255),
	PRIMARY KEY (extendes_id)
);

CREATE TABLE providers (
	provider_id int(11) NOT NULL AUTO_INCREMENT,
	provider_name varchar(255),
	PRIMARY KEY (provider_id)
);

CREATE TABLE meanings (
	meaning_id int(11) NOT NULL AUTO_INCREMENT,
	meaning_name varchar(255),
	PRIMARY KEY (meaning_id)
);

CREATE TABLE images (
	image_id int(11) NOT NULL AUTO_INCREMENT,
	image_name varchar(255),
	image_cover int(2),
	PRIMARY KEY (image_id)
);

CREATE TABLE included_services_office (
	included_services_office_id int(11) NOT NULL AUTO_INCREMENT,
	included_services_office_service int(11), 
	FOREIGN KEY (included_services_office_service) REFERENCES included_services (includes_id),
	included_services_office_office int(11), 
	FOREIGN KEY (included_services_office_office) REFERENCES offices (office_id),
	PRIMARY KEY (included_services_office_id)
);

CREATE TABLE extended_services_office (
	extended_services_office_id int(11) NOT NULL AUTO_INCREMENT,
	extended_services_office_service int(11), 
	FOREIGN KEY (extended_services_office_service) REFERENCES extended_services (extendes_id),
	extended_services_office_office int(11), 
	FOREIGN KEY (extended_services_office_office) REFERENCES offices (office_id),
	PRIMARY KEY (extended_services_office_id)
);

CREATE TABLE providers_office (
	providers_office_id int(11) NOT NULL AUTO_INCREMENT,
	providers_office_provider int(11), 
	FOREIGN KEY (providers_office_provider) REFERENCES providers (provider_id),
	providers_office_office int(11), 
	FOREIGN KEY (providers_office_office) REFERENCES offices (office_id),
	PRIMARY KEY (providers_office_id)
);

CREATE TABLE meanings_office (
	meanings_office_id int(11) NOT NULL AUTO_INCREMENT,
	meanings_office_meaning int(11), 
	FOREIGN KEY (meanings_office_meaning) REFERENCES meanings (meaning_id),
	meanings_office_office int(11), 
	FOREIGN KEY (meanings_office_office) REFERENCES offices (office_id),
	PRIMARY KEY (meanings_office_id)
);

CREATE TABLE images_office (
	images_office_id int(11) NOT NULL AUTO_INCREMENT,
	images_office_image int(11), 
	FOREIGN KEY (images_office_image) REFERENCES images (image_id),
	images_office_office int(11), 
	FOREIGN KEY (images_office_office) REFERENCES offices (office_id),
	PRIMARY KEY (images_office_id)
);

CREATE TABLE images_object (
	images_object_id int(11) NOT NULL AUTO_INCREMENT,
	images_object_image int(11), 
	FOREIGN KEY (images_object_image) REFERENCES images (image_id),
	images_object_object int(11), 
	FOREIGN KEY (images_object_object) REFERENCES objects (object_id),
	PRIMARY KEY (images_object_id)
);