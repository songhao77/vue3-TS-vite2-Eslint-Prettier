import request from '../utils/request'

export function getWhetherByCity(query?: number) {
  return request.get('/app/weather/listWeather', { params: { cityIds: query } })
}

export function getAuth() {
  return request.get('')
}
