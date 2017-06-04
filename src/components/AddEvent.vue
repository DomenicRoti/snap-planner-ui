<template>
  <div>
    <form @submit.prevent="addEvent" class="form-inline">
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" v-model="description" id="description">
      </div>
      <div class="form-group">
        <label for="date">Date</label>
        <input type="text" class="form-control" id="date" v-model="date">
      </div>
      <button type="submit" class="btn btn-default">Add Event</button>
    </form>
  </div>
</template>

<script>
import EventsService from '@/services/events'
import Pikaday from 'pikaday'
import 'pikaday/css/pikaday.css'

export default {
  name: 'AddEvent',
  data () {
    return {
      description: '',
      date: new Date()
    }
  },
  methods: {
    addEvent () {
      let event = {
        description: this.description,
        date: this.date
      }
      EventsService.addEvent(event).then((event) => {
        this.$store.dispatch('addEvent', event)
      })
    }
  },
  mounted () {
    let dateEl = this.$el.querySelector('#date')
    /* eslint-disable no-new */
    new Pikaday({
      field: dateEl,
      onSelect: (date) => {
        this.date = date
      }
    }).setDate(this.date)
  }
}
</script>

<style scoped>
</style>
