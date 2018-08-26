use clamazon;

drop table if exists products;

create table products (
	item_id int(6) not null auto_increment,
    product_name varchar(70),
    department_name varchar(20),
    price decimal(9,2),
    stock_quantity int(6),
    primary key (item_id)
);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values	(0, '64GB Sandisk MicroSD Card', 'Electronics', 18.99, 400),
		(1, 'Timberland Pro Work Boots', 'Clothing', 105.99, 25),
        (2, 'Harry Potter and the Half Blood Prince', 'Books', 23.95, 11),
        (3, '1994 Honda CRX Del Sol', 'Automotive', 3450.00, 1),
        (4, 'HP Envy Core i7', 'Electronics', 1199.95, 14),
        (5, 'No Country for Old Men', 'Movies', 12.99, 10),
        (6, 'Pirates of the Carribean 2: Curse of the Black Pearl', 'Movies', 11.99, 30),
        (7, 'Web Development for Dummies', 'Books', 5.99, 28),
        (8, 'Fallout 4: Game of the Year Edition', 'Video Games', 44.99, 5),
        (9, 'Zoombinis: Mountain Rescue', 'Video Games', 4.99, 2);