/*
TODO:
- quick test for when button is clicked

SEE ALSO:
- other range intersection tests handled by next-button
*/

import { CalendarWrapper } from '../lib/wrappers/CalendarWrapper'

describe('today button', function() {
  pushOptions({
    initialView: 'dayGridMonth',
    now: '2017-06-30'
  })

  describe('when now is in current month', function() {
    pushOptions({
      initialDate: '2017-06-01'
    })
    it('is disabled', function() {
      expectEnabled(initCalendar(), false)
    })
  })

  describe('when now is not current month, but still visible', function() {
    pushOptions({
      initialDate: '2017-07-01'
    })
    it('is enabled', function() {
      expectEnabled(initCalendar(), true)
    })
  })

  describe('when now is out of view', function() {
    pushOptions({
      initialDate: '2017-08-01'
    })

    describe('when no specified validRange', function() {
      it('is enabled', function() {
        expectEnabled(initCalendar(), true)
      })
    })

    describe('when now\'s month is entirely before validRange', function() {
      pushOptions({
        validRange: { start: '2017-07-02' } // previous day is visible in the June
      })
      it('is disabled', function() {
        expectEnabled(initCalendar(), false)
      })
    })
  })

  function expectEnabled(calendar, bool) {
    let toolbarWrapper = new CalendarWrapper(calendar).toolbar
    expect(toolbarWrapper.getButtonEnabled('today')).toBe(bool)
  }

})
