package ii_conventions

import org.junit.Assert
import org.junit.Test as test

val MyDate.s: String get() = "($year-$month-$dayOfMonth)"

class _12_For_Loop {
    test fun testIterateOverDateRange() {
        val actualDateRange = arrayListOf<MyDate>()
        iterateOverDateRange(MyDate(2014, 5, 1), MyDate(2014, 5, 5), {
            date-> actualDateRange.add(date)
        })
        val expectedDateRange = arrayListOf(
                MyDate(2014, 5, 1), MyDate(2014, 5, 2), MyDate(2014, 5, 3), MyDate(2014, 5, 4), MyDate(2014, 5, 5))
        Assert.assertEquals("Incorrect iteration over five nice spring dates",
                expectedDateRange, actualDateRange)
    }

    test fun testIterateOverEmptyRange() {
        var invoked = false
        iterateOverDateRange(MyDate(2014, 1, 1), MyDate(2013, 1, 1), { invoked = true })
        Assert.assertFalse("Handler was invoked on an empty range", invoked)
    }
}