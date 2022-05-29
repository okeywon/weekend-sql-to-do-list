CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (40) NOT NULL,
	"description" VARCHAR (200) NOT NULL,
	"due" DATE,
    "isComplete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "todo" 
	("task", "description", "due") 
VALUES
    ('Walk the Dog', 'Go on a walk with Spot around the neighborhood', '06-01-2022'),
    ('Paint the house', 'Sky blue siding with white trim and red door', '05-31-2022'),
    ('Get Groceries', 'Check the fridge and get the grocery list before leaving', '05-29-2022'),
    ('Make Coffee', 'Put in a filter and water, add ground coffee and hit start', '05-29-2022'),