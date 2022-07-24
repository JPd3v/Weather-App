/** ********
 *
 * pubsub.subscribe() on() add() listen()
 * pubsub.unsubscribe() off() remove() unlisten()
 * pubsub.publish() emit() announce()
 *
 * */

const pubSub = {
  events: {},
  subscribe(evName, fn) {
    // add an event with a name as new or to existing list
    this.events[evName] = this.events[evName] || [];
    this.events[evName].push(fn);
  },
  unsubscribe(evName, fn) {
    // remove an event function by name
    if (this.events[evName]) {
      this.events[evName] = this.events[evName].filter((f) => f !== fn);
    }
  },
  publish(evName, data) {
    // emit|publish|announce the event to anyone who is subscribed
    if (this.events[evName]) {
      this.events[evName].forEach((f) => {
        f(data);
      });
    }
  },
};

export default pubSub;
