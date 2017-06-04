<template>
  <div>
    <h3>Events Page</h3>
    <button type="button" class="btn btn-default" @click="togglePastEvents">{{pastEventsDisplayText}} Past Events</button> <br>
    <ul v-if="events.length">
      <li v-for="event in displayEvents" class="row"  v-bind:class="getDisplayClass(event.date)">
        <div class="col-xs-5">{{event.description}}</div>
        <div class="col-xs-5">{{event.date | formatDate}}</div>
        <div class="col-xs-2">
        <button v-on:click="removeEvent(event)" type="button" class="btn btn-danger" aria-label="Delete Event">
            <span class="glyphicon glyphicon glyphicon-remove" aria-hidden="true"></span>
          </button>
        </div>
      </li>
    </ul>
    <add-event></add-event>
  </div>
</template>

<script>
import AddEvent from './AddEvent'
import EventsService from '@/services/events'
import AccountService from '@/services/account'
import { mapGetters } from 'vuex'

export default {
  name: 'events',
  components: {
    AddEvent
  },
  data () {
    return {
      year: new Date().getFullYear(),
      pastEvents: [],
      futureEvents: [],
      displayEvents: [],
      showPastEvents: false,
      pastEventsDisplayText: 'Show'
    }
  },
  filters: {
    formatDate: function (value) {
      if (!value) return ''
      let date = new Date(value)
      return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    }
  },
  methods: {
    togglePastEvents () {
      this.showPastEvents = !this.showPastEvents
    },
    toggleEventDisplayText () {
      if (this.showPastEvents) {
        this.pastEventsDisplayText = 'Hide'
      } else {
        this.pastEventsDisplayText = 'Show'
      }
    },
    createDisplayEvents () {
      let displayEvents = []
      if (this.showPastEvents) {
        displayEvents = this.futureEvents.concat(this.pastEvents)
      } else {
        displayEvents = this.futureEvents
      }
      this.displayEvents = displayEvents.sort(this.sortDates)
    },
    sortDates (a, b) {
      if (a.date < b.date) {
        return -1
      }
      if (a.date > b.date) {
        return 1
      }
      return 0
    },
    removeEvent (event) {
      EventsService.removeEvent(event).then(() => {
        this.$store.dispatch('removeEvent', event)
      })
    },
    getDisplayClass (date) {
      if (new Date(date).getFullYear() > this.year) {
        return 'next-year'
      }
    }
  },
  watch: {
    events () {
      let today = new Date()
      let pastEvents = []
      let futureEvents = []
      this.events.forEach(function (event) {
        if (new Date(event.date) < new Date(today)) {
          pastEvents.push(event)
        } else {
          futureEvents.push(event)
        }
      })
      this.pastEvents = pastEvents
      this.futureEvents = futureEvents
      this.createDisplayEvents()
    },
    showPastEvents () {
      this.createDisplayEvents()
      this.toggleEventDisplayText()
    },
    auth (auth) {
      if (auth) {
        AccountService.getUserInfo().then(() => {
          EventsService.getEvents()
        })
      }
    }
  },
  computed: mapGetters([
    'events'
  ])
}
</script>

<style scoped>
  ul li {
    list-style: none;
    margin-bottom: 5px;
    color: #000333;
  }
  li.next-year {
    color: #000999;
  }
</style>
