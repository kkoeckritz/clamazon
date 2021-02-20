use clamazon;

drop table if exists products;

create table products (
	item_id int not null auto_increment,
    product_name varchar(70),
    department_name varchar(20),
    price decimal(9,2),
    stock_quantity int,
    primary key (item_id)
);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values	(1, '64GB Sandisk MicroSD Card', 'Electronics', 18.99, 400),
		(2, 'Timberland Pro Work Boots', 'Clothing', 105.99, 25),
        (3, 'Harry Potter and the Half Blood Prince', 'Books', 23.95, 11),
        (4, '1994 Honda CRX Del Sol', 'Automotive', 3450.00, 1),
        (5, 'HP Envy Core i7', 'Electronics', 1199.95, 14),
        (6, 'No Country for Old Men', 'Movies', 12.99, 10),
        (7, 'Pirates of the Carribean 2: Curse of the Black Pearl', 'Movies', 11.99, 30),
        (8, 'Web Development for Dummies', 'Books', 5.99, 28),
        (9, 'Fallout 4: Game of the Year Edition', 'Video Games', 44.99, 5),
        (10, 'Zoombinis: Mountain Rescue', 'Video Games', 4.99, 2);