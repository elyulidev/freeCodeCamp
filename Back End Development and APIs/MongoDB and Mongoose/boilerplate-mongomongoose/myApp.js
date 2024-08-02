require("dotenv").config();
const mongoose = require("mongoose");

try {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log("Successfully connected to MongoDB");
} catch (error) {
	console.log("Error connecting to MongoDB: ", error);
}

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	favoriteFoods: {
		type: [String],
		required: true,
	},
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
	const person = new Person({
		name: "John",
		age: 30,
		favoriteFoods: ["pizza", "burger", "tacos"],
	});

	person.save((err, person) => {
		if (err) {
			done(err);
		}
		done(null, person);
	});
};

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (err, people) => {
		if (err) {
			done(err);
		}
		done(null, people);
	});
};

const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, (err, people) => {
		if (err) {
			done(err);
		}
		done(null, people);
	});
};

const findOneByFood = (food, done) => {
	Person.findOne({ favoriteFoods: food }, (err, person) => {
		if (err) {
			done(err);
		}
		done(null, person);
	});
};

const findPersonById = (personId, done) => {
	Person.findById(personId, (err, person) => {
		if (err) {
			done(err);
		}
		done(null, person);
	});
};

const findEditThenSave = async (personId, done) => {
	const foodToAdd = "hamburger";

	Person.findById(personId, (err, person) => {
		if (err) return console.log(err);

		// Array.push() method to add "hamburger" to the list of the person's favoriteFoods
		person.favoriteFoods.push(foodToAdd);

		// and inside the find callback - save() the updated Person.
		person.save((err, person) => {
			if (err) {
				done(err);
			}
			done(null, person);
		});
	});
};

const findAndUpdate = (personName, done) => {
	const ageToSet = 20;

	Person.findOneAndUpdate(
		{ name: personName },
		{ age: ageToSet },
		{ new: true },
		(err, person) => {
			if (err) {
				done(err);
			}
			done(null, person);
		}
	);
};

const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, (err, person) => {
		if (err) {
			done(err);
		}
		done(null, person);
	});
};

const removeManyPeople = (done) => {
	const nameToRemove = "Mary";

	Person.deleteMany({ name: nameToRemove }, (err, people) => {
		if (err) {
			done(err);
		}
		done(null, people);
	});
};

const queryChain = (done) => {
	const foodToSearch = "burrito";

	Person.find({ favoriteFoods: foodToSearch })
		.sort({ name: 1 })
		.limit(2)
		.select({ name: true, favoriteFoods: true })
		.exec((err, people) => {
			if (err) {
				done(err);
			}
			done(null, people);
		});
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
