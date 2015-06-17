var _ = require('lodash');

/**
 * @class
 * @description allocates and deallocates servers
 */
function Tracker() {
	this.servers = {};
}

/**
 * Allocate a new server per type
 * @param  {String} type type of server to allocate
 * @return {String}      name of the newly allocated server
 */
Tracker.prototype.allocate = function(type) {
	if(!this.servers[type]) {
		this.servers[type] = [1];
		return type+1;
	}

	var nextNumber = this.next_server_number(this.servers[type]);
	this.servers[type].push(nextNumber);

	return type + nextNumber;
};

/**
 * Deallocate the specified server
 * @param  {String} name name of server to deallocate
 * @return {Boolean}      true if able to deallocate false if not
 */
Tracker.prototype.deallocate = function(name) {
	if(!name.length) {
		return false;
	}

	// find the type of server and number of the server
	var type = name.match(/[a-z]*/g)[0],
		number = parseInt(name.match(/[0-9]+/g)[0], 10),
		index;

	// if there is nothing in the array then we cannot deallocate anything
	if(!this.servers[type] || !this.servers[type].length) {
		return false;
	}

	// find the index for the item we are trying to find
	index = this.servers[type].indexOf(number);

	// delete the item we are deallocating
	// return true if able to delete, false if not
	return !!this.servers[type].splice(index, 1).length;
};

/**
 * Find the next server number available
 * @param  {Int[]} list array of server numbers
 * @return {Int}      next available server number
 */
Tracker.prototype.next_server_number = function(list) {
	list.sort();

	list = _.uniq(list, true);

	for(var i=0, len=list.length; i < len; i++) {
		// if i+1 does not == number in array return i+1
		if( list[i] !== (i+1) ) {
			return i+1;
		}
	}

	return i+1;
};

module.exports = Tracker;