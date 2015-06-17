var Tracker = require('../tracker');
'use strict';

describe('Tracker', function() {
	var tracker;

	beforeEach(function() {
		tracker = new Tracker();
	});

	it('should be able to find next server number', function() {
		expect(tracker.next_server_number([1, 2, 2, 5])).toBe(3);
		expect(tracker.next_server_number([1, 2, 5])).toBe(3);
		expect(tracker.next_server_number([1, 2])).toBe(3);
		expect(tracker.next_server_number([])).toBe(1);
	})

	it('should be able to allocate the initial server per type', function() {
		expect(tracker.allocate('apibox')).toBe('apibox1');
		expect(tracker.allocate('serverbox')).toBe('serverbox1');
	});

	it('should be able to allocate multiple servers per type', function() {
		tracker.allocate('apibox');
		tracker.allocate('serverbox');

		expect(tracker.allocate('apibox')).toBe('apibox2');
		expect(tracker.allocate('serverbox')).toBe('serverbox2');
	});

	it('should be able to deallocate a server', function() {
		tracker.allocate('apibox');
		tracker.allocate('apibox');
		tracker.allocate('serverbox');
		tracker.allocate('serverbox');

		expect(tracker.next_server_number(tracker.servers['apibox'])).toBe(3);
		expect(tracker.next_server_number(tracker.servers['serverbox'])).toBe(3);

		expect(tracker.deallocate('apibox1')).toBe(true);
		expect(tracker.next_server_number(tracker.servers['apibox'])).toBe(1);

		expect(tracker.deallocate('serverbox1'))
	});
});