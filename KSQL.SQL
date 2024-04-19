CREATE STREAM FOOD_2_GO_REQUESTS_STREAM (
	name varchar,
	gender varchar,
	agerange varchar,
	city varchar,
	zipcode varchar,
	itemname varchar,
	itemquantity integer,
	itemprice double
)
WITH(kafka_topic='food_2_go_requests', value_format='json', key_format='json');

CREATE STREAM FOOD_2_GO_ORDER_STREAM AS
SELECT name, gender, agerange, city, zipcode, itemname as product, itemquantity as quantity, itemprice as price, (itemquantity * itemprice) as total
FROM  FOOD_2_GO_REQUESTS_STREAM
EMIT CHANGES;

CREATE TABLE ordercountbyproduct AS 
SELECT product AS NAME, sum(quantity) as COUNT, SUM(total) AS TOTAL
FROM FOOD_2_GO_ORDER_STREAM 
GROUP BY product
EMIT CHANGES;

CREATE TABLE ordertotalbycity AS 
SELECT CITY AS NAME, SUM(quantity) as COUNT, SUM(total) AS TOTAL
FROM FOOD_2_GO_ORDER_STREAM 
GROUP BY city
EMIT CHANGES;

CREATE TABLE ordertotalbycustomer AS 
SELECT NAME, SUM(quantity) as COUNT, SUM(total) AS TOTAL
FROM FOOD_2_GO_ORDER_STREAM 
GROUP BY NAME
EMIT CHANGES;