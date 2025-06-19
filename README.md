# Olly

A simple way to get a jump start on your day.

## TODO

**High Priority**

- [ ] Change location and stations to use user prefs from table
- [ ] Add page for users to manage their preferences (location, stations, etc.)

  - [ ] Clean up train line selection

- [ ] Update messages widget to pull from table

**Lower Priority**

- [ ] Implement more secure device auth
  - Figure out the flow for issuing new devices in general
- [ ] Refactor dashboard to not be editable- only via connected user account on website
- [ ] Make time update exactly at the minute
- [ ] Add testing with Jest
- [ ] Add server side caching to avoid rate limiting on weather and train APIs (can wait, only one customer at the moment)
- [ ] Add ci/cd with GitHub actions (can wait, only prod and local deployments at the moment)

  - currently only prod and local deployments to save on aws costs
  - Makefile based way to bring up / down a remote QA environment could be useful

- [ ] Add loading placeholders/ api error placeholders for train times and weather
- [ ] Fix all snow/ rain animations
- [ ] Make background dynamic based on real weather data
- [ ] Add full description of what this app is and how to use it to README.md
