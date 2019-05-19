import moment from "moment-timezone";

export function calculateMinPrice(event) {
  let minPrice;
  let maxPrice;
  let rangeTxt = "";
  let currency = "";
  if (
    event.tickets &&
    event.tickets[0] &&
    event.tickets[0].currency &&
    event.tickets[0].currency.code
  ) {
    currency = event.tickets[0].currency.code;
  }
  console.log(event);
  if (event.tickets && event.tickets.length > 0) {
    event.tickets.map(ticket => {
      if (ticket && ticket.pricing && ticket.pricing.start >= 0) {
        if (minPrice === undefined) {
          minPrice = ticket.pricing.start;
        } else if (ticket.pricing.start < minPrice) {
          minPrice = ticket.pricing.start;
        }
      }
      if (ticket && ticket.pricing && ticket.pricing.end >= 0) {
        if (maxPrice === undefined) {
          maxPrice = ticket.pricing.end;
        } else if (ticket.pricing.end > maxPrice) {
          maxPrice = ticket.pricing.end;
        }
      }
    });
  }
  if (minPrice === 0 && maxPrice === 0) {
    rangeTxt = "Free";
  } else if (minPrice >= 0) {
    rangeTxt = `From ${currency}${minPrice}`;
  } else if (maxPrice > 0) {
    rangeTxt = `to ${currency}${maxPrice}`;
  } else {
    rangeTxt = "Undefined";
  }

  return { minPrice, maxPrice, rangeTxt };
}

export function filterTicketsByVenue(event) {
  let venues = [];
  if (event.tickets && event.tickets.length > 0) {
    event.tickets.map(item => {
      let tickets = [];
      let found = false;
      if (venues && venues.length > 0) {
        venues.map((venue, index) => {
          if (venue.venue_id === item.venue_id) {
            found = true;
            let oldTickets = venue.tickets;
            oldTickets.push(item);
            venue.tickets = oldTickets;
          }
        });
      }
      if (!found) {
        tickets.push(item);
        venues.push({ venue_id: item.venue_id, venue: item.venue, tickets });
      }
    });
  }
  return venues;
}

export function calculateTimeTable(event) {
  let timeTable = [];
  let viewTime = [];
  if (event.tickets && event.tickets.length > 0) {
    event.tickets.map(item => {
      if (item.duration) {
        let duplicate = false;
        timeTable.map(tableItem => {
          if (
            tableItem.start === item.duration.start &&
            tableItem.end === item.duration.end
          ) {
            duplicate = true;
          }
        });
        if (!duplicate) {
          timeTable.push({
            start: item.duration.start,
            end: item.duration.end,
            timezone: item.venue.city.timezone
          });
        }
      }
    });
  }
  timeTable.map(item => {
    if (
      moment(item.start)
        .tz(item.timezone)
        .format("MMM") ===
        moment(item.end)
          .tz(item.timezone)
          .format("MMM") &&
      moment(item.start)
        .tz(item.timezone)
        .format("D") ===
        moment(item.end)
          .tz(item.timezone)
          .format("D")
    ) {
      viewTime.push({
        top: `${moment(item.start)
          .tz(item.timezone)
          .format("ddd")},${moment(item.start)
          .tz(item.timezone)
          .format("MMM")} ${moment(item.start)
          .tz(item.timezone)
          .format("DD")}`,
        bottom: `${moment(item.start)
          .tz(item.timezone)
          .format("hh:mm A")} - ${moment(item.end)
          .tz(item.timezone)
          .format("hh:mm A")}`
      });
    } else {
      viewTime.push({
        top: `${moment(item.start)
          .tz(item.timezone)
          .format("ddd")},${moment(item.start)
          .tz(item.timezone)
          .format("MMM")} ${moment(item.start)
          .tz(item.timezone)
          .format("DD")}, ${moment(item.start)
          .tz(item.timezone)
          .format("hh:mm A")} -  ${moment(item.end)
          .tz(item.timezone)
          .format("ddd")},${moment(item.end)
          .tz(item.timezone)
          .format("MMM")} ${moment(item.end)
          .tz(item.timezone)
          .format("DD")}, ${moment(item.end)
          .tz(item.timezone)
          .format("hh:mm A")}`
      });
    }
  });
  return { timeTable, viewTime };
}

export function getCities(venues) {
  let cities = [];
  if (venues && venues.length > 0) {
    venues.map(venue => {
      if (venue.venue && venue.venue.city && venue.venue.city.name) {
        if (cities.indexOf(venue.venue.city.name) < 0) {
          cities.push(venue.venue.city.name);
        }
      }
    });
  }
  return cities;
}

export function calCulateRange(timeTable) {
  let start = {
    date: null,
    timezone: null
  };
  let end = {
    date: null,
    timezone: null
  };
  let diff = null;
  let expired = false;
  if (timeTable && timeTable.length > 0) {
    timeTable.map((item, key) => {
      if (key === 0) {
        start.date = item.start;
        start.timezone = item.timezone;
        end.date = item.end;
        end.timezone = item.timezone;
      } else {
        if (item.start) {
          if (!moment(start).isBefore(item.start)) {
            start.date = item.start;
            start.timezone = item.timezone;
          }
        }
        if (item.end) {
          if (!moment(end).isAfter(item.end)) {
            end.date = item.end;
            end.timezone = item.timezone;
          }
        }
      }
    });
  }
  if (
    start &&
    end &&
    moment(start.date)
      .tz(start.timezone)
      .format("MMM") ===
      moment(end.date)
        .tz(end.timezone)
        .format("MMM")
  ) {
    if (
      moment(start.date)
        .tz(start.timezone)
        .format("D") ===
      moment(end.date)
        .tz(end.timezone)
        .format("D")
    ) {
      diff =
        moment(end.date)
          .tz(end.timezone)
          .format("D") +
        " " +
        moment(start.date)
          .tz(start.timezone)
          .format("MMM");
    } else {
      diff =
        moment(start.date)
          .tz(start.timezone)
          .format("D") +
        " - " +
        moment(end.date)
          .tz(end.timezone)
          .format("D") +
        " " +
        moment(start.date)
          .tz(start.timezone)
          .format("MMM");
    }
  } else {
    if (start) {
      diff =
        moment(start.date)
          .tz(start.timezone)
          .format("D") +
        " " +
        moment(start.date)
          .tz(start.timezone)
          .format("MMM");
    }
  }
  if (moment(end.date).isBefore(moment())) {
    expired = true;
  }
  return { start, end, diff, expired };
}

export function sellButtonTxt(min, max, ticket) {
  let text = "free";
  if (min > 0) {
    text = `from ${
      ticket.currency && ticket.currency.code ? ticket.currency.code : ""
    }${min}${
      ticket.seller && ticket.seller.name ? " on " + ticket.seller.name : ""
    }`;
  } else if (min === 0 && max === 0) {
    text = "Free";
  } else if (min === 0 && max > 0) {
    text = `${
      ticket.currency && ticket.currency.code ? ticket.currency.code : ""
    }${min} - ${max}${
      ticket.seller && ticket.seller.name ? " on " + ticket.seller.name : ""
    }`;
  }
  return text;
}
