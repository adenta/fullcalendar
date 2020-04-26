import { Calendar } from '@fullcalendar/preact'
import timeGridPlugin from '@fullcalendar/timegrid'
import { TimeGridViewWrapper } from '../lib/wrappers/TimeGridViewWrapper'
import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper'

function buildOptions() {
  return {
    plugins: [ timeGridPlugin ],
    initialView: 'timeGridWeek',
    initialDate: '2019-04-01',
    scrollTime: '00:00',
    allDaySlot: true,
    events: [
      { start: '2019-04-01T00:00:00' },
      { start: '2019-04-01T02:00:00' }
    ]
  }
}

describe('mutateOptions', function() {
  let $calendarEl
  let calendar

  beforeEach(function() {
    $calendarEl = $('<div>').appendTo('body')
  })

  afterEach(function() {
    if (calendar) { calendar.destroy() }
    $calendarEl.remove()
  })

  it('will react to a single option and keep scroll', function() {
    calendar = new Calendar($calendarEl[0], buildOptions())
    calendar.render()

    let viewWrapper = new TimeGridViewWrapper(calendar)
    let scrollEl = viewWrapper.getScrollerEl()

    scrollEl.scrollTop = 100
    let scrollTop = scrollEl.scrollTop
    expect(scrollTop).toBeGreaterThan(0)

    calendar.mutateOptions({ allDaySlot: false })

    expect(calendar.getOption('allDaySlot')).toBe(false)
    expect(viewWrapper.dayGrid).toBeFalsy()
    expect(scrollEl.scrollTop).toBe(scrollTop)
  })

  it('rerenders events without rerendering view', function() {
    calendar = new Calendar($calendarEl[0], buildOptions())
    calendar.render()

    let calendarWrapper = new CalendarWrapper(calendar)
    let dateEl = calendarWrapper.getFirstDateEl()

    calendar.mutateOptions({
      events: [
        { start: '2019-04-01T00:00:00' }
      ]
    })

    expect(calendarWrapper.getEventEls().length).toBe(1)
    expect(calendarWrapper.getFirstDateEl()).toBe(dateEl)
  })

  it('doesn\'t rerender anything for a initialView change', function() {
    calendar = new Calendar($calendarEl[0], buildOptions())
    calendar.render()

    let calendarWrapper = new CalendarWrapper(calendar)
    let dateEl = calendarWrapper.getFirstDateEl()

    calendar.mutateOptions({
      initialView: 'timeGridDay'
    })

    expect(calendar.view.type).toBe('timeGridWeek')
    expect(calendarWrapper.getFirstDateEl()).toBe(dateEl)
  })

})
