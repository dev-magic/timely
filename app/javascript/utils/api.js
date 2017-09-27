import axios from 'axios'

export const addTimeslot = (eventId, startTime, authToken) => {
  axios.defaults.headers.common['X-CSRF-Token'] = authToken
  return axios.post(`/events/${eventId}/timeslots`, {
    start_time: startTime
  })
}

export const deleteTimeslot = (eventId, timeslotId, authToken) => {
  axios.defaults.headers.common['X-CSRF-Token'] = authToken
  return axios.delete(`/events/${eventId}/timeslots/${timeslotId}`)
}

export const getEvent = (eventId, authToken) => {
  axios.defaults.headers.common['X-CSRF-Token'] = authToken
  return axios.get(`/events/${eventId}.json`)
}

export const updatePreference = (preferenceId, preferenceType, authToken) => {
  axios.defaults.headers.common['X-CSRF-Token'] = authToken
  return axios.patch(`/preferences/${preferenceId}.json`, {
    preference_type: preferenceType
  })
}
