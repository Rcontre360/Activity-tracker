
CREATE TABLE intervals(
	ID INT NOT NULL AUTO_INCREMENT,
	taskID INT NOT NULL,
	dataStart VARCHAR(35),
	dataEnd VARCHAR(35),
	PRIMARY KEY(ID),
	FOREIGN KEY(taskID) REFERENCES
	tasks(ID) ON DELETE CASCADE
);